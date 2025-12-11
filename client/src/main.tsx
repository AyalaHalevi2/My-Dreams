import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router'
import Home from './view/pages/home/Home.tsx'
import Login from './view/pages/auth/Login.tsx'
import Register from './view/pages/auth/Register.tsx'
import Favorites from './view/pages/favorites/Favorites.tsx'
//import { ThemeProvider } from './model/theme/ThemeProvider.tsx'
//import { LoginProvider } from './model/isLoggedin/LoginProvider.tsx'
//import { AddDreamFormProvider } from './model/openAddDreamForm/OpenAddDreamForm.tsx'
import { Provider, useDispatch } from 'react-redux'
import { store } from './redux/store.ts'
import { authMe } from './functions/FetchFuncitons'
import { changeLoginState } from './redux/slices/AuthSlice'

function AppRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ok = await authMe();
        if (!mounted) return;
        dispatch(changeLoginState(ok));
        //change the local storage too
        try {
          localStorage.setItem('isLoggedIn', ok ? 'true' : 'false');
        } catch (e) {
          console.warn('Could not write isLoggedIn to localStorage', e);
        }
        if (!ok && location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login');
        }
      } catch (e) {
        if (!mounted) return;
        dispatch(changeLoginState(false));
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login');
        }
      }
    })();
    return () => { mounted = false };
  }, [dispatch, navigate, location.pathname]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
