import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { signIn } from "next-auth/react"



const handleLogin =  (e) => {
    e.preventDefault();
    const res = signIn("credentials", {
        username: document.getElementById("input-username-for-credentials-provider").value,
        password: document.getElementById("input-password-for-credentials-provider").value,
        redirect: false,
      });

    //display err msg if incorrect creds
}



export default function AuthModal({ show = false, onClose = null }){
    let [isOpen, setIsOpen] = useState(false)

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
          Login
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
                    Please Sign In
                  </Dialog.Title>

                  <div className="w-full max-w-xs mx-auto">
                    <form onSubmit={handleLogin} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                        <input type="hidden" name="csrfToken" value="84ca61d69de42e77a34d66b08cec0063d519130b8258bc867d8e2a228fbb5c47" />
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input-username-for-credentials-provider">Username </label>
                            <input className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" id="input-username-for-credentials-provider" type="text" placeholder="Elon@Tesla.com" label="Username" required/>
                        </div>
                        <div className='mb-4'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input-password-for-credentials-provider">Password </label>
                            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="input-password-for-credentials-provider" type="password" placeholder="********" label="Password" required/>
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign in with Email</button>
                            <a className="text-center inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                            
                        </div> 
                    </form>
                    <div className="text-center">
                        <p className="">New User?</p>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Create an Account</a>
                    </div>
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