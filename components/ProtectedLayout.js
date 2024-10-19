import React, { useEffect } from 'react'
import { useRouter, useSegments } from "expo-router";
import { useSelector } from 'react-redux';

const ProtectedLayout = ({children}) => {
    const router = useRouter();
    const segments = useSegments();
    const isAuthenticated = useSelector((state)=>state.auth.authenticated);

    useEffect(()=>{
        const inAuthGroup = segments[0] === '(auth)';
        if(!isAuthenticated && !inAuthGroup){
            router.replace('login');
        }else if(isAuthenticated && inAuthGroup){
            router.replace('/');
        }
    }, [isAuthenticated, segments])

    return children
}

export default ProtectedLayout