import { UserPen } from 'lucide-react';
import { useRef } from 'react';
const CreateContact = () => {
    return(
        <div className='flex flex-row items-center justify-center w-full h-9 bg-[#3f4659] gap-2 mt-4 cursor-pointer rounded-full md:w-12 md:h-12 md:mt-0 md:ml-2'>
            <UserPen className=' text-gray-200 w-4 h-4 md:w-6 md:h-6' />
            <h1 className='text-gray-200 text-sm md:hidden'>Create contact</h1>
        </div>
    )
}

export default CreateContact