import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { signIn } from "next-auth/react"



const handleSubmit = async () => {
    
    
    const credentials = {
        'first_name': document.getElementById('input-firstname-for-credentials-provider').value,
        'last_name': document.getElementById('input-lastname-for-credentials-provider').value,
        'username': document.getElementById('input-username-for-credentials-provider').value,
        'password': document.getElementById('input-password-for-credentials-provider').value,
    }

    const res = await fetch("http://localhost:3000/api/signupHelper", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
        });

    const success = await res.json();

    //if response = success. redirect to login
    if(success.data){
        alert("account creation is successful. please login now");
    }else{//account already exists
        alert("account already exists. please try logging in");
    }
    
}



export default function RegModal({ show = false, onClose = null }){
    const test = (e) => {
        e.preventDefault();
        handleSubmit();
        closeModal();
    }
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return(
    <>
      <div className="">
        <button
            type="button"
            onClick={ openModal }
            className="ml-4 px-4 py-1 rounded-md bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-700 focus:ring-opacity-50 text-white transition"
        >
          Register
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-xl font-medium leading-6 text-gray-900"
                  >
                    Please Create Your Account
                  </Dialog.Title>

                  <div className="w-full max-w-xs mx-auto">
                    <form onSubmit={test} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                        <input type="hidden" name="csrfToken" value="84ca61d69de42e77a34d66b08cec0063d519130b8258bc867d8e2a228fbb5c47" />
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="input-firstname-for-credentials-provider">First Name </label>
                            <input className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="firstname" id="input-firstname-for-credentials-provider" type="text" placeholder="Elon" label="First Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="input-lastname-for-credentials-provider">Last Name </label>
                            <input className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lastname" id="input-lastname-for-credentials-provider" type="text" placeholder="Musk" label="Last Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="input-username-for-credentials-provider">Username </label>
                            <input className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" id="input-username-for-credentials-provider" type="text" placeholder="Elon@Tesla.com" label="Username" required/>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="input-password-for-credentials-provider">Password </label>
                            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="input-password-for-credentials-provider" type="password" placeholder="********" label="Password" required/>
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register your Account</button>
                        </div> 
                    </form>
                    
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
    );
}