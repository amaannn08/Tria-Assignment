import { UserPen } from 'lucide-react';
import { useRef } from 'react';
const CreateContactButton = () => {
    return(
        <div className='flex flex-row items-center border-white bg-gray-200 justify-center w-full h-9 border gap-2 mt-4 cursor-pointer rounded-full md:w-12 md:h-12 md:mt-0 md:ml-2 hover:bg-gray-300 transition-all duration-500'>
            <UserPen className=' text-gray-900 w-4 h-4 md:w-6 md:h-6' />
            <h1 className='text-gray-900 text-sm md:hidden'>Create contact</h1>
        </div>
    )
}

export default CreateContactButton