import { useAuthStore } from '@/states/AuthState';
import React, { useEffect, useState, type JSX } from 'react'
import { Navigate } from 'react-router-dom';

export function PrivateRouter({children}: {children: JSX.Element}) {

    // const [isAuth, setAuth] = useState(false);
    const checkLogin = useAuthStore((state) => state.checkAuth);

    // useEffect(() => {
        
    // }, [])

    // function setAuthentication(value: boolean): void {
    //     setAuth(value)
    // }

    return checkLogin()? children : <Navigate to="/" />
}
