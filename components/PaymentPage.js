//Role: The Frontend Interface. It loads the Razorpay script, captures the user's message/amount, and launches the payment popup.

'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchuser, initiate, fetchpayments } from '@/actions/useractions' // Import the "Waiter" server action
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'

const PaymentPage = ({ username }) => {

    const router = useRouter()

    // State to hold form data (name, message, amount)
    const [paymentform, setpaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    })
    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])

    //const {data:session} = useSession()  

    const isDisable = paymentform.name.length < 3 || paymentform.message.length < 4 || paymentform.amount < 1

    // This function runs when the user clicks the "Pay" button
    const pay = async (amount) => {

        if(isDisable) {
            toast("Please fill all the fields properly")
            return;
        }

        // 1. Call the Server Action to get an Order ID
        // We pass the amount, the creator's username, and the form data
        let a = await initiate(amount, username, paymentform)

        // 2. The Order ID is returned from the backend
        let orderId = a.id

        // 3. Configure Razorpay options
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        // 4. Open the Razorpay payment window
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        const dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    useEffect(() => {
        getData()
    }, [])

    const searchParams = useSearchParams()

    const notify = () => {
        if(searchParams.get("paymentdone") == "true"){
            toast("Payment successful!")
            router.push(`/${username}`)
        }
    };

    useEffect(() => {
       notify()
    }, [searchParams,router])
    

    return (
        <>
            

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='relative'>
                <div className='cover-img '><img className='md:max-h-[50vh] md:min-w-screen' src={currentUser?.coverpic || "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"} alt="cover page" /></div>
                <div className='profile-pic flex justify-center items-center overflow-hidden '><img className='h-[120] min-w-[120] w-[120] rounded-xl border border-white/35 absolute' src={currentUser?.profilepic || "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=zCPXEOtT8OgwfDmbSfDgnwQlnnNZXrZFJ-yzRTyW1eA%3D&token-time=1768694400"} alt="profile picture" width={120} /></div>
                <div className='flex flex-col gap-1 justify-center items-center mt-16'>
                    <div className='text-2xl font-bold'>@{username}</div>
                    <div className='text-gray-500'>let's help {username} get a chai !</div>
                    <div className='text-gray-500'>{Payments.length} Payments . ₹{Payments.reduce((a,b)=> a+b.amount,0)/100} raised</div>
                </div>
                <div className='w-[80%] flex md:flex-row flex-col gap-1 m-4 mx-auto'>
                    <div className='w-full md:w-1/2 bg-blue-950 p-3 pt-5 rounded-lg'>
                        <h2 className='font-bold text-2xl'>Suppoters</h2>
                        <ul className='mt-5 flex flex-col gap-1'>
                            {Payments.length == 0 && <li>No Payment yet</li>}
                            {Payments.map((p, i) => {
                                return <li key={i} className='flex items-center'><img src="/avatar.gif" alt="user avatar" width={33} /><span>{p.name} <span className='font-bold'>₹{(p.amount) / 100}</span> with a message : "{p.message}"</span></li>
                            })}

                        </ul>
                    </div>
                    <div className='w-full md:w-1/2 bg-blue-950 p-3 pt-5 rounded-lg'>
                        <h2 className='text-2xl font-bold'>Make a payment</h2>
                        <div className='flex flex-col gap-2 mt-4'>
                            <input type="text" className='w-full bg-slate-800 border border-white/35 p-2 rounded-lg' value={paymentform.name} onChange={handleChange} name='name' placeholder='Enter Name' />
                            <input type="text" className='w-full bg-slate-800 border border-white/35 p-2 rounded-lg' value={paymentform.message} onChange={handleChange} name='message' placeholder='Enter Message' />
                            <input type="text" className='w-full bg-slate-800 border border-white/35 p-2 rounded-lg' value={paymentform.amount} onChange={handleChange} name='amount' placeholder='Enter Amount' />
                            <button 
                                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} 
                                className={`w-full rounded-lg font-medium text-sm px-4 py-2.5 text-center leading-5 p-2 
                                ${isDisable
                                    ? 'bg-gray-400 cursor-not-allowed opacity-50'  // Disabled Style
                                    : 'bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl' // Active Style
                                }`}
                            >
                                Pay
                            </button>
                        </div>
                        <div className='flex m-3 gap-2'>
                            <button className='rounded-lg bg-slate-800 border border-white/30 p-1' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='rounded-lg bg-slate-800 border border-white/30 p-1' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='rounded-lg bg-slate-800 border border-white/30 p-1' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default PaymentPage
