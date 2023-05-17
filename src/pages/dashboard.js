import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


import Layout from '@/components/Layout';
import TopPanel from '@/components/TopPanel';





export default function dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter(); 
    if(!session){
        //router.push('/');
    }

    
    return(
        <>
        <Layout>
            <div className="h-[800px] container mx-auto bg-green-200 ">
                <TopPanel />
            </div>
        </Layout>
        </>
        
    )
}