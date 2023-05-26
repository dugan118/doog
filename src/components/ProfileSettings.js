import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/outline';
import { Switch } from '@headlessui/react'


// profile pic colors


export default function ProfileSettings(){
    const { data: session, status } = useSession();
    const [editMode, setEditMode] = useState(false);
    const [names, setNames] = useState(['','']);
    const [color, setColor] = useState({});
    const [isOpen, setOpen] = useState(false);

    const allColors = {
        gray: {bg : 'bg-gray-200',text: 'text-gray-400'},
        green:{bg : 'bg-green-500',text: 'text-green-800'},
        blue: {bg : 'bg-blue-200',text: 'text-blue-400'},
        red: {bg : 'bg-red-200',text: 'text-red-400'},
        yellow: {bg : 'bg-yellow-200',text: 'text-yellow-400'},
        black: {bg : 'bg-gray-600',text: 'text-black'},
        purple: {bg : 'bg-purple-200',text: 'text-purple-400'},
        orange: {bg : 'bg-orange-200',text: 'text-orange-400'},
    };


    useEffect(() =>{
        setColor( session? allColors[session?.user.img]: {bg : 'bg-green-200',text: 'text-red-400'});
    },[]);

    const saveProfileSettings = (e) => {
        e.preventDefault();
        //collect data to send to server
        let newColor;
        const keys = Object.keys(allColors);
        for (let i=0;i<keys.length;i++){
            if (allColors[keys[i]].bg==color.bg && allColors[keys[i]].text==color.text){
                newColor = keys[i];
            }
        }
        const data = {
            user_id: session?.user.id,
            first_name: document.getElementById("profile-first-name-edit").value,
            last_name: document.getElementById("profile-last-name-edit").value,
            img: newColor,
        }

        //make API calls to update user table
        const result = fetch("http://localhost:3000/api/updateUserData", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        //update client
        if(session){
            session.user.img = newColor;
            session.user.fName = data.first_name;
            session.user.lName = data.last_name;
            session.user.name = data.first_name.concat(' ', data.last_name);
        }
        

        

    }
    
    const changeEditMode = (e) => {
        e.preventDefault();
        setEditMode(!editMode);
    }

    const changeIsOpen = (e) => {
        e.preventDefault();
        setOpen(!isOpen);

    }
    const changeColor = (e, color) => {
        e.preventDefault();
        //update database
        //setColor
        setColor(allColors[color]);
    }

    const renderColors = (e) => {
        let ret=[];
        Object.entries(allColors).map( (color1) => {
            let colorName = color1[0];
            let color = color1[1];
            ret.push(
                <div className='px-2'>
                    <button onClick={(e) => changeColor(e, colorName)} className='h-full w-full'>
                        <div className={"outline-1 outline-gray-700 outline shrink-0 flex items-center justify-center rounded-full overflow-hidden relative w-9 h-9 " + color.bg}>
                            <UserIcon className={" w-6 h-6 " + color.text} />
                        </div>
                    </button>
                    
                </div>
            )
        });
        return ret;
    }


    if(!editMode){
        return(
            <>
            <div className='w-full mx-auto '>
            <form  className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex mx-8 mb-4 '>
                    <div className={"outline-1 outline-gray-700 outline mx-auto shrink-0 flex items-center justify-center rounded-full overflow-hidden relative w-12 h-12 " + color.bg}>
                        <UserIcon className={" w-8 h-8 " + color.text} />
                    </div>
                </div>
                <div className="flex mx-8 mb-4 ">{/* Row 1 */}
                    <div className="w-[250px] px-3 mb-4 md:mb-0 ml-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-first-name">
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-first-name" type="text" value={session?.user.firstName} disabled/>
                    </div>
                    <div className="w-[250px] px-3 mb-4 md:mb-0 mr-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-last-name">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-last-name" type="text" value={session?.user.lastName} disabled/>
                    </div>
                </div>
    
                <div className="flex flex-wrap mx-8 mb-6 ">{/* Row 2 */}
                    <div className="w-[250px] px-3 mb-4 md:mb-0 ml-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-email" type="text" value={session?.user.email} disabled/>
                    </div>
                    <div className="w-[250px] px-3 mb-4 md:mb-0 mr-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-password" type="password" value="password1234" disabled/>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6 ">{/* Row 3 */}
                    <div className='w-full mb-4'>
                        {/*<button onClick={changeEditMode} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Edit Profile
                            </button>*/}
                        <div className="">
                            <p className='m-1 text-center font-bold uppercase text-gray-700 '>Edit Profile</p>
                            <Switch
                                checked={editMode}
                                onChange={setEditMode}
                                className={`${editMode ? 'bg-teal-900' : 'bg-teal-700'}
                                relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                aria-hidden="true"
                                className={`${editMode ? 'translate-x-9' : 'translate-x-0'}
                                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
                </form>
            </div>
            </>
        )
    }else{
        return(//edit mode
        <>
            <div className='w-full mx-auto '>
            <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex mx-8 mb-4 '>
                    <div className={"outline-1 outline-gray-700 outline mx-auto shrink-0 flex items-center justify-center rounded-full overflow-hidden relative w-12 h-12 " + color.bg}>
                        <UserIcon className={" w-8 h-8 " + color.text} />
                    </div>
                </div>
                <div className="flex mx-8 mb-4 ">{/* Row 1 */}
                    <div className="w-[250px] px-3 mb-4 md:mb-0 ml-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-first-name">
                            First Name
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-first-name-edit" type="text" placeholder={session?.user.firstName} required/>
                    </div>
                    <div className="w-[250px] px-3 mb-4 md:mb-0 mr-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-last-name">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-last-name-edit" type="text" placeholder={session?.user.lastName} required/>
                    </div>
                </div>
    
                <div className="flex flex-wrap mx-8 mb-6 ">{/* Row 2 */}
                    <div className="w-[250px] px-3 mb-4 md:mb-0 ml-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-email" type="text" placeholder={session?.user.email} disabled/>
                    </div>
                    <div className="w-[250px] px-3 mb-4 md:mb-0 mr-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profile-password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profile-password" type="password" placeholder="password1234" disabled/>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6 ">{/* Row 3 */}
                    <div className='w-full mb-4'>
                        {/*<button onClick={changeEditMode} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Edit Profile
                            </button>*/}
                        <div className="">
                            <p className='m-1 text-center font-bold uppercase text-gray-700 '>Edit Profile</p>
                            <Switch
                                checked={editMode}
                                onChange={setEditMode}
                                className={`${editMode ? 'bg-teal-900' : 'bg-teal-700'}
                                relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                aria-hidden="true"
                                className={`${editMode ? 'translate-x-9' : 'translate-x-0'}
                                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                    </div>
                    <div className='w-full mb-4'>
                        <button onClick={changeIsOpen} className="mr-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Change Profile Icon
                        </button>
                        <button onClick={saveProfileSettings} className="ml-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save Profile Settings
                        </button>
                    </div>
                    {isOpen ? (
                    <>
                        <div className='bg-gray-200 w-3/5 mx-auto h-full flex items-center px-6 py-6'>
                            <div className='flex items-center mx-auto'>
                                {renderColors()}
                            </div>
                        </div>
                    </>
                    ): 
                    <>
                    </>
                    }
                </div>
                </form>
            </div>
            </>
        )
    }
    
}