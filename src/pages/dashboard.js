import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


import SecureLayout from '@/components/SecureLayout';
import TopPanel from '@/components/TopPanel';





export default function dashboard() {

    return(
        <>
        <SecureLayout>
            <div className=" min-h-[800px] h-full container mx-auto bg-green-200 ">
                <TopPanel />
            </div>
        </SecureLayout>
        </>
        
    )
}