//Role: This is the "Waiter." It takes the order from the customer (browser) and sends it to the kitchen (Razorpay/Database).

'use server'

import Razorpay from 'razorpay'
import Payment from '@/models/Payment'
import User from '@/models/User'
import connectDb from '@/db/connectDb'

// This function is called when the user clicks "Pay" on the frontend
export const initiate = async (amount, to_username, paymentform) => {
    await connectDb(); // Ensure database connection is active

    //fetch the secret of the user who is getting the payment
    let user = await User.findOne({username: to_username})
    let secret = user.razorpaysecret

    // 1. Setup Razorpay using your keys (acts like logging in to Razorpay)
    // Note: If you want payments to go to the specific user, you'd fetch their secret here first
    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    // 2. Configure the order options
    let options = {
        amount : Number.parseInt(amount),
        currency : "INR"
    }

    // 3. Create the order on Razorpay's servers
    let x = await instance.orders.create(options)

    // 4. Create a "Pending" payment record in your MongoDB
    // We save the 'oid' (Order ID) so we can find this transaction later
    await Payment.create({oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message})

    return x; // Return the order details to the frontend so the payment popup can open
}


export const fetchuser = async(username) => {
    await connectDb()
    let u = await User.findOne({username: username})
    // let user = u.toObject({flattenObjectIds:true})
    return JSON.parse(JSON.stringify(u))
}

export const fetchpayments = async (username) => {
    await connectDb()
    //find all payments sorted by decreasing order of amount and flatten objects
    let p = await Payment.find({to_user: username, Done:true}).sort({amount:-1}).limit(7).lean()
    return JSON.parse(JSON.stringify(p)) //convert mongoDb data that react can read(fletten objects)
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    //if the username is being updated, check if username is available
    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username})
        if(u){
            return {error:"username already exists"}
        }
    }
    await User.updateOne({email: ndata.email},ndata)  //email same as we do not want to change email
}