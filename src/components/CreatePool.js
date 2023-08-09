import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import EventSelector from '@/components/EventSelector';
/* 
    form info:
        Name of Organization
            Confirmation Checkbox to show it is for a charitable cause
        Price per Block
        Payout Model (default for now)
        Set Availability (open, invite only, join with link, password)
            Set Approval process (auto accepts/admin approves applicant)
*/


// Need to add some kind of event/timeline fields for the end of pool
export default function CreatePool(){
    const { data: session, status } = useSession(); 
    const [selectedGame, setSelectedGame] = useState('No Game Selected')

    const handleSubmit = async (e) => {
        if(selectedGame === 'No Game Selected'){
            e.preventDefault()
            console.log(selectedGame)
            return
        }
        //e.preventDefault();
        const data = {
            'orgName': document.getElementById('grid-org-name').value,
            //'isCharity': document.getElementById('grid-availability').value,
            'pricePerBlock': document.getElementById('grid-price-per-block').value,
            'payoutModel': document.getElementById('grid-payout-model').value,
            'availability': document.getElementById('grid-availability').value,
            'ownerID' : document.getElementById('ownerID').value,
            'name' : document.getElementById('grid-pool-name').value,
            'espn_id' : selectedGame,
        }
        //api call to create pool
        const res = await fetch("http://localhost:3000/api/pools/createPool", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
    
        const success = await res.json();// return poolID in data
    }

    return(
    <>
        <p className= "text-lg font-medium text-center m-4">Create a Pool</p>
        <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
        <input type="hidden" id="ownerID" name="ownerID" value={session?.user.id} />
            <div className="flex flex-wrap -mx-3 mb-6">{/* Row 1 */}
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-pool-name">
                        Name of Pool
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-pool-name" type="text" placeholder="PAWS Fundraiser" required/>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">{/* Row 2 */}
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-org-name">
                        Name of Organization
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-org-name" type="text" placeholder="Philadelphia Animal Welfare Society" required/>
                    <div className="flex items-center mb-4">
                        <input required id="charity-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="charity-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm this is for the benefit of a Charity</label>
                        <a className="pl-3 text-center inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Terms & Conditions 
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">{/* Row 3 */}
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">{/* Col 1 */}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-price-per-block">
                        Price Per Block
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price-per-block">
                            <option value="5">$5</option>
                            <option value="10">$10</option>
                            <option value="20">$20</option>
                            <option value="50">$50</option>
                            <option value="100">$100</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">{/* Col 2 */}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-payout-model">
                        Payout Model
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payout-model">
                            <option value="54">54%</option>
                            <option value="80">80%</option>
                            <option value="custom">Custom Payout</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">{/* Col 3 */}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-availability">
                        Availability
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-availability">
                            <option value="open">Open</option> 
                            <option value="password">Join with Password</option>
                            <option value="invite">Invite Only</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">{/* Row 4 */} 
                <EventSelector setSelectedGame={setSelectedGame} />
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">{/* Row 5 */} 
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mx-auto text-center">{/* Col 1 */}
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Create Pool
                </button>
            </div>
            </div>
            </form>
    </>
    )
}