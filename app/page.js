'use client'
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white">
      <div className="flex flex-col justify-center items-center h-[40vh] gap-7 ">

        <div className="flex items-center"><div className="text-4xl font-bold">Buy me a chai</div><div><img src="/tea.gif" width={88} alt="" /></div></div>

        <p className="text-center">A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>

        <div className="flex gap-3">
          <Link href={'/login'}><button type="button" className="text-white rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Start here</button></Link>
          <Link href={'/about'}><button type="button" className="text-white rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Read more</button></Link>
        </div>

      </div>

      <div className="h-0.5 opacity-15 bg-white"></div>

      <div className="my-3">
        <h1 className="flex justify-center items-center text-2xl font-bold m-10">Your Fans can buy you a chai</h1>
        <div className="container flex md:justify-around flex-col md:flex-row justify-center items-center m-2">
          <div className="item my-3 md:m-0 flex flex-col justify-center items-center space-y-2">
            <div className="bg-blue-900 p-2 rounded-xl"><img src="/man.gif" width={88} alt="" /></div>
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col justify-center items-center space-y-2">
            <div className="bg-blue-900 p-2 rounded-xl"><img src="/coin.gif" width={88} alt="" /></div>
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col justify-center items-center space-y-2">
            <div className="bg-blue-900 p-2 rounded-xl"><img src="/group.gif" width={88} alt="" /></div>
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="h-0.5 opacity-15 bg-white"></div>

      <div className="my-3">
        <h1 className="flex justify-center items-center text-2xl font-bold m-10">Your Fans can buy you a chai</h1>
        <div className="container flex md:justify-around flex-col md:flex-row justify-center items-center m-2">
          <div className="item my-3 md:m-0 flex flex-col justify-center items-center space-y-2">
            <div className="bg-blue-900 p-2 rounded-xl"><img src="/man.gif" width={88} alt="" /></div>
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col justify-center items-center space-y-2">
            <div className="bg-blue-900 p-2 rounded-xl"><img src="/coin.gif" width={88} alt="" /></div>
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
          <div className="item flex flex-col justify-center items-center space-y-2">
            <div className="bg-blue-900 p-2 rounded-xl"><img src="/group.gif" width={88} alt="" /></div>
            <p>Fund Yourself</p>
            <p>Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

    </div>
  );
}
