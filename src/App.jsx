import { Outlet } from 'react-router-dom'
import { Alert, Footer, Header,InfoAlert } from '../src/components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout, startLoading, stopLoading } from './store/authSlice';
import { showAlert } from './store/alertSlice';

function App() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  authService.dispatch = dispatch ;
  const show = useSelector((state) => state.alert.show);
  const infoShow = useSelector((state) => state.infoAlert.show);

  // try to login
  useEffect(() => {
    dispatch(startLoading());
    async function getUser() {
      await authService.getCurrentUser().then((user) => {
        if (user) {
          dispatch(login({userData:user}));
          dispatch(showAlert({
            message: "You are logged in ! Welcome Back",
            type:'success'
          }));
        } else {
          dispatch(logout());
          dispatch(showAlert({
            message: "You are logged out !",
            type: "warning"
          }));
        };
        dispatch(stopLoading());
      });
    }

    getUser();

  }, [])

  return (
    <div className='relative h-[100dvh] text-white min-h-[100dvh] flex flex-col bg-blue-500'>
      <InfoAlert show={infoShow} />
      <Alert show={show} />
      {!loading ?
        // <div className='flex flex-col h-full content-between bg-red text-white'>
            <div className='h-full bg-yellow-500 flex flex-col'>
            <Header />
            <main className='w-full mt-14 flex flex-1 bg-purple-900'>
              <Outlet />
              </main>
            </div>
          
        // </div>
        :
        <div className="w-screen h-full flex justify-center items-center">
          <img
            src="/vite.svg"
            className="w-20 h-20 ease-in-out infinite animate-bounce"
            alt="loading"
          />
        </div>}
    </div>

  )

}

export default App
