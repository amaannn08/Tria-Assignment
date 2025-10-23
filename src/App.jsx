import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Maincontent from './components/layout/Maincontent'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateContact from './components/contacts/CreateContact';
import EditContact from './components/contacts/EditContact';

function App() {
  return (
    <BrowserRouter>
      <div className='w-full bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300'>
        <Header/>
        <div className='pt-20 md:pt-24 p-1 md:p-5'>
          <Routes>
            <Route path='/' element={<Maincontent/>} />
            <Route path='/create' element={<CreateContact/>} />
            <Route path='/edit/:name' element={<EditContact/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
