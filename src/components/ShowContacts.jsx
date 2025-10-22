import {React,useState} from 'react'
import { contacts } from '../contacts';
import { Pencil, Square, SquareCheck, Star } from 'lucide-react';
const ShowContacts = () => {
  const [selected, setSelected] = useState([]);
    const [favourite, setFavourite] = useState(
      contacts.reduce((acc, c) => {
        acc[c.name] = c.favourite === "Yes";
        return acc;
      }, {})
    );
  
    function favChange(name) {
      setFavourite(prev => {
        const newValue = !prev[name];
        const index = contacts.findIndex(c => c.name === name);
        if (index !== -1) {
          contacts[index] = {
            ...contacts[index],
            favourite: newValue ? "Yes" : "No"
          };
        }
  
        return { ...prev, [name]: newValue };
      });
    }
  
    function onSelectHandler(name) {
      if (selected.includes(name)) {
        setSelected(prev => prev.filter(n => n !== name));
      } else {
        setSelected(prev => [...prev, name]);
      }
    }
    
  return (
    <div className="w-full mt-3">
      {contacts.sort((a,b)=>(a.name.charAt(0).localeCompare(b.name.charAt(0)))).map(item =>
          <div
            key={item.name}
            className="group flex flex-row items-center md:grid md:grid-cols-[2fr_2fr_1fr_1fr] bg-[#38393e] w-full h-12 md:h-20 p-4 rounded-t-2xl rounded-b-md mb-1 md:hover:bg-blue-400 transition-all duration-700"
          >
            <div className="flex flex-row items-center gap-4 transition-all duration-700">
              {/* Profile Circle */}
              <div className="w-10 md:w-15 h-10 md:h-15 flex items-center justify-center">
                <div
                  className={`w-8 md:w-10 h-8 md:h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold md:group-hover:hidden`}
                >
                  {item.name.charAt(0)}
                </div>

                {/* Checkbox */}
                <div
                  className="hidden md:flex md:items-center"
                  onClick={() => onSelectHandler(item.name)}
                >
                  {selected.includes(item.name) ? (
                    <SquareCheck className="md:w-10 md:h-8 text-white font-bold hidden group-hover:block" />
                  ) : (
                    <Square className="md:w-10 md:h-8 text-white font-bold hidden group-hover:block" />
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-white">{item.name}</h1>
              </div>
            </div>

            <div>
              <h1 className="text-white hidden md:block">{item.email}</h1>
            </div>
            <div>
              <h1 className="text-white hidden md:block pl-3">{item.phoneNumber}</h1>
            </div>

            <div className="hidden md:group-hover:flex md:items-center md:justify-end mr-3 gap-4">
              <div
                onClick={() => favChange(item.name)}
                className="hidden md:flex h-10 w-10 md:hover:bg-gray-400 md:hover:rounded-full items-center justify-center cursor-pointer">
                  {favourite[item.name] ? (
                  <Star className="text-white fill-white" />
                  ) : (
                  <Star className="text-white" />
                  )}
              </div>
              <div className="hidden md:h-10 md:w-10 md:hover:bg-gray-400 md:hover:rounded-full md:flex md:items-center md:justify-center md:cursor-pointer">
                <Pencil className="text-white hidden md:block" />
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

export default ShowContacts