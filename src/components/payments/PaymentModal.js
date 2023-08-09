import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'


import Timer from '@/components/payments/Timer'


import PayPal from '@/components/payments/PayPal';


const handleClick =  (e) => {
    e.preventDefault();
    
}



export default function PaymentModal({ numCells, cellPrice, handleBuyCells = () => {}, show = false, onClose = null }){

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [isExpired, setExpired] = useState(false)

    function onExpire() {
      setExpired(true)
    }

    //returns to board page. 
    function failedCheckout(){
      closeModal()
      setExpired(false)
    }

    //
    const [paymentRecieved, setPaymentRecieved] = useState(false)
    function onPaymentRecieved(){
      setPaymentRecieved(true)
    }
    //runs whenever paymentRecieved value is changed. 
    //if ==false do nothing
    useEffect(() => {
      if(paymentRecieved){
        successfulCheckout()
        setPaymentRecieved(false)
        handleBuyCells();
      }
    },[paymentRecieved])

    function successfulCheckout(){
      //close modal, update client & server cells, sent to socket
      closeModal()
      console.log("woowee successful checkout")
    }


    return(
    <>
      {/* <div className=""> */}
        <button
            type="button"
            onClick={ openModal }
            className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline'//"ml-4 px-4 py-1 rounded-md bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-700 focus:ring-opacity-50 text-white transition"
        >
          Checkout
        </button>
      {/* </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={failedCheckout}>
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
                    Please Pay Now
                  </Dialog.Title>
                  <div className="w-full max-w-xs mx-auto">
                    <div className="text-center mt-1">
                      <Timer onExpire={onExpire} />
                    </div>
                    <div className="text-center mt-4">
                      {isExpired ? 
                      <>
                        <p>TIMER HAS EXPIRED</p>
                        <button onClick={failedCheckout} className='m-2 p-1 rounded outline outline-1 outline-black hover:bg-gray-300' type='button' >Return to the page</button>
                      </>
                      :
                      <PayPal onPaymentRecieved={onPaymentRecieved} cellPrice={cellPrice} numCells={numCells} />
                      }    
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