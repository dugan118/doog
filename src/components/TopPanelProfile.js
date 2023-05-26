import { useState } from 'react'
import { Tab } from '@headlessui/react'
import ProfileSettings from './ProfileSettings'
import AccountSettings from './AccountSettings'
import PaymentSettings from './PaymentSetting'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/* 
    
*/
export default function Example() {
  let [categories] = useState({
    "My Pools": [
      {
        //comp: <MyPools />,
      },
    ],
    "Find a Pool": [
      {
        //comp: <FindPools />,
      },
    ],
    "Create a Pool": [
        {
          //comp: <CreatePool />,
        },
      ],
    "Pool History": [
      {
        //comp: <PoolHistory />,
      },
    ],
  })

  return (
    <div className="w-full h-full px-4 py-4 sm:px-0 mx-auto ">
      <Tab.Group >
        <Tab.List className="w-3/6 mx-auto flex space-x-1 rounded-xl bg-green-900/20 p-1">
            <Tab
              key={"My Pools"}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-green-800',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              My Profile
            </Tab>

            <Tab
              key={"Find a Pool"}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-green-800',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Payments
            </Tab>

            <Tab
              key={"Create a Pool"}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-green-800',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-green focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Settings
            </Tab>

        </Tab.List>
        <Tab.Panels className="mt-2 w-5/6 mx-auto ">
            <Tab.Panel
              key={1}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2'
              )}
            >
              <ProfileSettings />
            </Tab.Panel>

            <Tab.Panel
              key={2}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2'
              )}
            >
              <PaymentSettings />
            </Tab.Panel>

            <Tab.Panel
              key={3}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2'
              )}
            >
              <AccountSettings />
            </Tab.Panel>
          
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
