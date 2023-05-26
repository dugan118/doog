import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';





const SecureLayout = ({ children = null }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log("status:");
        console.log(status);
        if (status === "unauthenticated") {
            router.push("http://localhost:3000/");
        }
    },[status]);

    if (status === "loading") {
        return <p>Loading...</p>
    }
    
    if (status === "authenticated") {
    return (
        <>
            <Head>
                <title>Doog - Do Good</title>
                <meta></meta>
                <link href= "/favicon1.ico" rel="icon"/>
            </Head>
            <div>
                <Header />
                <main>
                    <div className= "bg-gray-100  w-full h-min-fit ">
                        {typeof children === 'function' ? children(openModal) : children}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )}
    return <></>;
}

export default SecureLayout;