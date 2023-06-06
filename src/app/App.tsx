import React, {useCallback, useEffect} from 'react';
import {ButtonAppBar} from "components/AppBar/AppBar";
import LinearProgress from '@mui/material/LinearProgress';

import s from './App.module.css'
import Container from '@mui/material/Container';
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store";
import {TodolistsLists} from "features/TodolistsLists/TodolistsLists";
import {CustomizedSnackbars} from "components/ErrorSnackbar/ErrorSnackbar";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from "features/Login/Login";
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from "features/Login/auth-reducer";


type PropsType = {
    demo?: boolean
}
const App: React.FC<PropsType> = ({demo = false}) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!initialized) {
        return <CircularProgress className={s.circular__progress}/>
    }

    return <>
        <BrowserRouter>
            <ButtonAppBar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler}/>
            <div className={s.app__linearprogress_wrapper}>
                {status === 'loading' && <LinearProgress className={s.app__linearprogress}/>}
            </div>
            <CustomizedSnackbars/>
            <div className={s.app__wrapper}>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistsLists demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    </>
}

export default App;
