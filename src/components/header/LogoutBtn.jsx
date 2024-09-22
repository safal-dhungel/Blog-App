import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import Button from '../Button'
import { showAlert } from '../../store/alertSlice'
import { stopLoading,startLoading } from '../../store/authSlice'

const LogoutBtn = ({classname = 'rounded-xl'}) => {
    const dispatch = useDispatch();
    authService.dispatch = dispatch ;

    const logoutHandler = () => {
        dispatch(startLoading())
        authService.logout().then(() => {
            dispatch(logout());
            dispatch(showAlert({
                message: "You are logged out !",
                type: "warning"
            }));
            dispatch(stopLoading())
        });
    }
    return (
        <Button
            classname={`hover:bg-red-600 ${classname}`}
            onClick={logoutHandler}>
            Log Out
        </Button>
    )
}

export default LogoutBtn