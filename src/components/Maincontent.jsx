import React from 'react'
import Favourite from './Favourite'
import { useContacts } from "./ContactsContext";
import ShowContacts from './ShowContacts'

const Maincontent = () => {
  return (
    <div>
        <div>
            <Element/>
            <Favourite/>
            <ShowContacts/>
        </div>
    </div>
  )
}
function Element (){
  const { contacts, setContacts } = useContacts();
  return (
    <>
      <div className='mt-16 hidden md:flex flex-row items-center gap-2'>
        <h1 className='text-gray-800 font-sans text-3xl font-semibold'>Contacts </h1>
        <h1 className='text-gray-700 font-sans text-xl font-semibold'>({contacts.length})</h1>
      </div>
      <div className='mt-2 md:grid md:grid-cols-[2fr_2fr_1fr_1fr] hidden'>
        <h1 className='text-gray-700 font-sans text-xl font-semibold'>Name</h1>
        <h1 className='text-gray-700 font-sans text-xl font-semibold'>Email</h1>
        <h1 className='text-gray-700 font-sans text-xl font-semibold'>Phone Number</h1>
      </div>
      <hr className='hidden md:block my-2 border-t border-gray-400'/>
    </>
  )
}
export default Maincontent