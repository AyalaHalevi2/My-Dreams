import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './view/pages/home/Home.tsx'
import Login from './view/pages/auth/Login.tsx'
import Register from './view/pages/auth/Register.tsx'
import Favorites from './view/pages/favorites/Favorites.tsx'
//import { ThemeProvider } from './model/theme/ThemeProvider.tsx'
//import { LoginProvider } from './model/isLoggedin/LoginProvider.tsx'
//import { AddDreamFormProvider } from './model/openAddDreamForm/OpenAddDreamForm.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
