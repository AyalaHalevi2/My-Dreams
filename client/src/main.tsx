import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './view/pages/home/Home.tsx'
import Login from './view/pages/auth/Login.tsx'
import Register from './view/pages/auth/Register.tsx'
import Favorites from './view/pages/favorites/Favorites.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/favorites' element={<Favorites />} />

    </Routes>
    </BrowserRouter>
  </StrictMode>
)
