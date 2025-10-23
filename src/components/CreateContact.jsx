import { UserPen } from 'lucide-react';
import { useRef } from 'react';
const CreateContact = () => {
    return(
        <div className='flex flex-row items-center border-white justify-center w-full h-9 border-2 gap-2 mt-4 cursor-pointer rounded-full md:w-12 md:h-12 md:mt-0 md:ml-2 hover:bg-gray-100'>
            <UserPen className=' text-white w-4 h-4 md:w-6 md:h-6' />
            <h1 className='text-white text-sm md:hidden'>Create contact</h1>
        </div>
    )
}

export default CreateContact