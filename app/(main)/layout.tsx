import StreamProvider from "@/providers/StreamProvider"
import { SignUp } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import React from "react"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}
) => {

    const user = await currentUser()
    if(!user)  return(
            <main className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
            <section className="flex flex-col justify-center items-center md:items-start mt-6 mb-12 flex-1 px-8 md:px-16 text-white text-center md:text-left">
                <div className="flex items-center gap-2">
                <h1 className="text-4xl md:text-5xl font-bold">HuddleX</h1>
                <Image src="/assets/zoom.png" width={60} height={60} alt="Logo" className="self-center" />
                </div>

                <h1 className="text-2xl md:text-5xl font-bold mt-4">
                Seamless Meetings, <br />
                <span className="text-yellow-300">Effortless Connections.</span>
                </h1>
                <p className="text-md mt-3 text-gray-200">
                Sign up and start collaborating instantly.
                </p>
            </section>


            <div className="flex justify-center items-center flex-1 px-8 md:px-16 mb-15 md:mb-0">
                <SignUp />
            </div>
            </main>
        )

    return (
        <main className="animate-fade-in">
            <StreamProvider>
                {children}
            </StreamProvider>
        </main>
    )

}

export default MainLayout