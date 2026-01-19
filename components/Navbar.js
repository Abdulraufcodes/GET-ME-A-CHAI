'use client'
import React from 'react'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [isopen, setisopen] = useState(false)
    const { data: session, status } = useSession()
    const [showdropdown, setshowdropdown] = useState(false) //for dropdown
    const pathname = usePathname()
    const showDashboard = status === 'authenticated' && pathname !== '/dashboard'

    // if (session) {
    //     return (
    //         <>
    //             Signed in as {session.user.email} <br />
    //             <button onClick={() => signOut()}>Sign out</button>
    //         </>
    //     )
    // }
    return (
        <nav className='text-white relative'>
            <div className='bg-blue-950 text-white flex justify-between h-16 items-center'>
                <div>
                    <Link className='flex justify-center items-center' href={'/'}>
                        <div><img src="/tea.gif" width={44} alt="" /></div>
                        <div className="logo font-bold pl-3 text-md md:text-lg">Get me a chai!</div>
                    </Link>
                </div>
                {/* <ul className='hidden lg:flex gap-4 mr-3'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Sign up</li>
                    <li className='cursor-pointer'>Login</li>
                </ul> */}
                <div className='flex gap-3 mx-2'>
                    {session && (
                        <>
                            <div className='relative'>
                                <button
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setshowdropdown(false)
                                        }, 300);
                                    }}
                                    id="dropdownDefaultButton"
                                    onClick={() => setshowdropdown(!showdropdown)}
                                    className="rounded-lg inline-flex items-center justify-center box-border  font-medium leading-5 rounded-base text-sm px-4 py-2.5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                                    type="button"
                                >
                                    {session.user.email}
                                    <svg className="w-4 h-4 ms-1.5 -me-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>

                                <div
                                    id="dropdown"
                                    className={`z-10 ${showdropdown ? "block" : "hidden"} bg-blue-950 border border-white/10 absolute top-14 right-0 rounded-lg shadow-lg w-44 `}
                                >
                                    <ul className="p-2 text-sm text-body font-medium">
                                        <li>
                                            <Link href="/" className="inline-flex items-center w-full p-2 hover:bg-white/25 rounded">
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-white/25 rounded">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2 hover:bg-white/25 rounded">
                                                Your page
                                            </Link>
                                        </li>
                                        <li>
                                            <Link onClick={() => { signOut() }} href="#" className="inline-flex items-center w-full p-2 hover:bg-white/25 rounded">
                                                Sign out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}

                    {/* {showDashboard && <Link href={'/dashboard'}><button className='rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5'>Dashboard</button></Link>} */}
                    {/* {session && <button onClick={() => { signOut() }} className='rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5'>Logout</button>} */}
                    {!session &&
                        <Link href={"/login"}>
                            <button className='rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5'>Login</button>
                        </Link>
                    }
                </div>

                {/* <button className='lg:hidden mx-2' onClick={() => setisopen(!isopen)}>☰</button> */}

                {/* {isopen && (
                    <ul className='lg:hidden absolute top-16 right-0 flex flex-col gap-4 bg-blue-950 w-[6rem] py-2 text-center ' >
                        <li className='cursor-pointer border-t border-gray-500'>Home</li>
                        <li className='cursor-pointer border-t border-gray-500'>About</li>
                        <li className='cursor-pointer border-t border-gray-500'>Sign up</li>
                        <li className='cursor-pointer border-t border-gray-500'>Login</li>
                    </ul>
                )} */}
            </div>
        </nav>
    )
}

export default Navbar
