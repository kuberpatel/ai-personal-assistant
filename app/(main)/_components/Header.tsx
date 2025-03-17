"use client"

import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'

function Header() {
  const {user} = useContext(AuthContext);
  
  useEffect(() => {
    console.log('Header user state:', user);
  }, [user]);

  return user&&(
    <div className='p-3 shadow-sm flex justify-between items-center px-14'>
        <Image src={"/logo.svg"} alt='logo'
        width={40}
        height={40}
        />

        {user?.picture&&<Image src={user?.picture} alt='logo'
        width={40}
        height={40}
        className='rounded-full'
        />}
    </div>
  )
}

export default Header