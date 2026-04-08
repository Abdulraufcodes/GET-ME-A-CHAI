"use client"

import React from 'react'
import { useSession } from 'next-auth/react'

const Adminpage = () => {
    const { data: session, status } = useSession()

    if (session === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!session || session.user.role !== "admin") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1>Access Denied</h1>
            </div>
        );
    }

    return(
        <div>
            <h1>Admin panel</h1>
        </div>
    )
}

export default Adminpage
