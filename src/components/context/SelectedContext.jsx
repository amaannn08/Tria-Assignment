import {createContext,useContext,useState} from 'react'

const SelectedContext=createContext();

export default function SelectedProvider ({children}){
    const [selected, setSelected] = useState([]);
    return (
        <SelectedContext.Provider value={{ selected, setSelected }}>
        {children}
        </SelectedContext.Provider>
    )
}

export const useSelected = () => useContext(SelectedContext);