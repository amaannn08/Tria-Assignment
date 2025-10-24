
const SearchedContacts = ({searchContacts, onContactClick}) => {
    return (
        <div>
            {searchContacts.length===0?null:(<Element searchContacts={searchContacts} onContactClick={onContactClick}/>)}
        </div>
    )
}
function Element({searchContacts, onContactClick}){
    return(
        <div className="absolute w-full top-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl shadow-lg z-50 transition-colors duration-300">
            {searchContacts.map((item)=>(
                <div 
                    key={item.name}
                    onClick={() => onContactClick(item)}
                    className='flex flex-row items-center m-1 gap-3 p-3 h-16 bg-blue-50 dark:bg-gray-700 rounded-xl hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer transition-colors'>
                    <div className="flex items-center justify-center">
                        <div
                            className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-lg`}
                        >
                            {item.name.charAt(0)}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-gray-900 dark:text-gray-100 text-base font-medium truncate">{item.name}</h1>
                        <div className="text-gray-600 dark:text-gray-400 text-sm truncate">
                            {(item.emails && item.emails.length > 0) ? (
                                item.emails[0]
                            ) : (
                                item.email || 'No email'
                            )}
                        </div>
                        <div className="text-gray-500 dark:text-gray-500 text-sm truncate">
                            {(item.phoneNumbers && item.phoneNumbers.length > 0) ? (
                                item.phoneNumbers[0]
                            ) : (
                                item.phoneNumber || 'No phone'
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default SearchedContacts