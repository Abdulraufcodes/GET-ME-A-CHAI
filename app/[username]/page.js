//Role: The Entry Point. This file captures the username from the URL (e.g., /codewithharry) and passes it to the PaymentPage.

import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

export default async function Username({ params }) {
    const { username } = await params
    const checkUser = async () => {
        await connectDb()
        let u = await User.findOne({ username: username })
        if (!u) {
            return notFound()
        }
    }

    await checkUser()


    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export async function generateMetadata({params}) {
    const {username} = await params
    return {
        title:`Support ${username} - Get me a Chai`
    }
}
