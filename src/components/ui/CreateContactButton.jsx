import { UserPen } from 'lucide-react';

const CreateContactButton = ({ onCreateContact }) => {
    return(
        <button onClick={onCreateContact}>
            <div className='flex flex-row items-center border-white dark:border-gray-600 bg-gray-200 dark:bg-gray-700 justify-center w-full h-9 border gap-2 mt-4 cursor-pointer rounded-full md:w-12 md:h-12 md:mt-0 md:ml-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300'>
                <UserPen className='text-gray-900 dark:text-gray-100 w-4 h-4 md:w-6 md:h-6' />
                <h1 className='text-gray-900 dark:text-gray-100 text-sm md:hidden'>Create contact</h1>
            </div>
        </button>
    )
}

export default CreateContactButton