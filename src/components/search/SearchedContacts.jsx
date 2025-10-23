
const SearchedContacts = ({searchContacts}) => {
    return (
        <div>
            {searchContacts.length===0?null:(<Element searchContacts={searchContacts}/>)}
        </div>
    )
}
function Element({searchContacts}){
    return(
        <div className="absolute w-full top-full bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 p-2 mt-2 rounded-xl shadow-lg z-50 transition-colors duration-300">
            {searchContacts.map((item)=>(
                <div className='flex flex-row md:grid md:grid-cols-[2fr_2fr_1fr] items-center justify-between gap-4 my-2 md:m-2 md:p-2 h-10 md:h-14 bg-blue-50 dark:bg-gray-700 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer transition-colors'>
                    <div className="flex flex-row items-center gap-1 md:gap-2">
                        <div className="w-10 md:w-15 h-6 md:h-10 flex items-center justify-center">
                        <div
                            className={`w-6 md:w-10 h-6 md:h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold "md:group-hover:hidden"}`}
                                >
                             {item.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-gray-900 dark:text-gray-100 text-sm md:text">{item.name}</h1>
                    </div>
                    </div>
                    <div>
                        <h1 className="text-gray-900 dark:text-gray-100 text-sm md:text hidden md:block">{item.email}</h1>
                    </div>
                    <div>
                        <h1 className="text-gray-900 dark:text-gray-100 text-sm md:text pr-4 md:pr-0">{item.phoneNumber}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default SearchedContacts