//Role: The "Security Guard." It runs silently in the background after a payment to verify it wasn't faked.

import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import Username from "@/app/[username]/page";

export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()  // Get the hidden data Razorpay sent us
    body = Object.fromEntries(body)  // Convert it to a readable JavaScript object

    //1.check if razorpayOrderId is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({success:false, message: "order id not found"})
    }

    //fetch the secret of the user who is getting the payment
    let user = await User.findOne({username:p.to_user})
    const secret = user.razorpaysecret

    // 2. VERIFY THE SIGNATURE (The Security Check)
    // We combine the Order ID + Payment ID + Our Secret to check if it matches the signature
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

    if (xx) {
        // 3. If verified, update the payment status in the DB
        // We find the payment by Order ID and set 'Done' to true
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { Done: true }, { new: true })

        // 4. Redirect the user back to the website with a success flag
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else {
        // Verification failed (Hacking attempt or error)
        return NextResponse.error("Payment Verfication Failed")
    }
}

