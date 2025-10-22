import React from 'react'
import { contacts } from '../contacts'
const FavouriteList = () => {
  return (
    <div className='w-full mt-3'>
        {contacts.map((item)=>(

            item.favourite === "Yes" ?(
                <div className="flex flex-row items-center md:grid md:grid-cols-[2fr_2fr_1fr_1fr] bg-[#38393e] w-full h-12 md:h-20 p-4 rounded-t-2xl rounded-b-md mb-1">
                    <div className='flex flex-row items-center gap-4'> 
                        <div className={`w-8 md:w-10 h-8 md:h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold`}>
                        {item.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className='text-white'>{item.name}</h1>
                    </div>
                    </div>
                    <div>
                        <h1 className='text-white hidden md:block'>{item.email}</h1>
                    </div>
                    <div>
                        <h1 className='text-white hidden md:block pl-3'>{item.phoneNumber}</h1>
                    </div>
                </div>
                ):null 
            ))}
    </div>
  )
}

export default FavouriteList