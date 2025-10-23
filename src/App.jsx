import { useEffect, useState } from 'react'
import Header from './components/Header'
import Maincontent from './components/Maincontent'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateContact from './components/CreateContact';

function App() {
  return (
    <BrowserRouter>
      <div className='w-full bg-white min-h-screen'>
        <Header/>
        <div className='pt-32 p-1 md:p-5'>
          <Routes>
            <Route path='/' element={<Maincontent/>} />
            <Route path='/create' element={<CreateContact/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
