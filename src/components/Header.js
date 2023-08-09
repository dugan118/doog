import logo from "@/img/doog.png";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut, signIn } from 'next-auth/react';

import AuthModal from "./AuthModal";
import RegModal from "./RegModal";

import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon,
  CogIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';


const menuItems = [
  /*{
    label: 'New Pool',
    icon: PlusIcon,
    href: '/dashboard',
  },*/
  {
    label: 'Dashboard',
    icon: HomeIcon,
    href: '/dashboard',
  },
  {
    label: 'My Profile',
    icon: CogIcon,
    href: '/profile',
  },
  {
    label: 'Support',
    icon: HeartIcon,
    href: '/admin',
  },
  {
    label: 'Logout',
    icon: LogoutIcon,
    onClick: signOut,
  },
];

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

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  console.log("session user: ");
  console.log(session?.user);
  const isLoadingUser = status === 'loading';

  let iconColor = allColors[session?.user.img]

  return (
  <>
      <header className="h-16 w-full shadow-md ">
          <div className="h-full container mx-auto">
            <div className="h-full px-4 flex items-center space-x-4">
              <div className="w-1/3 items-center justify-start">
                <Link href="/">
                  <div className="flex space-x-1">
                    <Image src={logo} className="h-15 w-16" alt="Logo"/>
                  </div>
                </Link>
              </div>
              <div className="text-center flex items-center space-x-4 w-1/3 justify-center">
                <p className="font-mono text-3xl font-semibold text-green-800 text-center"> Do Good </p>
              </div>
              <div className="flex  justify-end items-center space-x-4 w-1/3">
                {isLoadingUser ? (
                  <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (<>
                  <button
                  onClick={() => {
                    router.push('/dashboard');
                  }}
                  className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md"
                >
                  Dashboard
                </button>
                  <Menu as="div" className="relative z-50">
                    <Menu.Button className="flex items-center space-x-px group">
                      <div className={"outline-1 outline-gray-700 outline shrink-0 flex items-center justify-center rounded-full overflow-hidden relative w-9 h-9 " + iconColor.bg}>
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || 'Avatar'}
                            layout="fill"
                          />
                        ) : (
                          <UserIcon className={" w-6 h-6 " + iconColor.text} />
                        )}
                      </div>
                      <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                          <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                            {user?.image ? (
                              <Image
                                src={user?.image}
                                alt={user?.name || 'Avatar'}
                                layout="fill"
                              />
                            ) : (
                              <UserIcon className="text-gray-400 w-6 h-6" />
                            )}
                          </div>
                          <div className="flex flex-col truncate">
                            <span>{user?.name}</span>
                            <span className="text-sm text-gray-500">
                              {user?.email}
                            </span>
                          </div>
                        </div>

                        <div className="py-2">
                          {menuItems.map(
                            ({ label, href, onClick, icon: Icon }) => (
                              <div
                                key={label}
                                className="px-2 last:border-t last:pt-2 last:mt-2"
                              >
                                <Menu.Item>
                                  {href ? (
                                    <Link href={href}>
                                      <div className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">
                                        <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                        <span>{label}</span>
                                      </div>
                                    </Link>
                                  ) : (
                                    <button
                                      className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                      onClick={onClick}
                                    >
                                      <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                      <span>{label}</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            )
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
              </>) : ( 
                <>
                <div className="">
                  <AuthModal /> 
                </div>
                <div className="">
                  <RegModal />
                </div>
                </>
                )}
              </div>
            </div>
          </div>
        </header>
  </>
  )
}


