import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {v1} from "uuid";
import {ButtonAppBar} from "../components/AppBar/AppBar";
import {AddNewTodo} from "../components/AddNewTodo/AddNewTodo";
import LinearProgress from '@mui/material/LinearProgress';

import s from './App.module.css'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Mbutton} from "../components/Button/Button";
import {
    addNewTodolistAC, addNewTodolistTC,
    changeTodolistTitleTC,
    ExtendedGetTodolistsType,
    fetchTodolistsTC,
    FilterType,
    onFilterAC,
    removeTodolistsTC,
} from "../features/TodolistsLists/todolists-reducer";
import {addTasksTC, removeTaskTC, updateTaskTC,} from "../features/TodolistsLists/tasks-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store";
import {TaskStatuses} from '../api/todolist-api';
import {TodolistsLists} from "../features/TodolistsLists/TodolistsLists";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";
import {useSelector} from "react-redux";

const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()

    const onAddTodoHandler = useCallback(
        (title:string) => {
            dispatch(addNewTodolistTC(title))
        }, [])

    const onInputTextKeyDownNewTodo = useCallback((newTitle: string) => {
        onAddTodoHandler(newTitle)
    }, [])

    return <>
        <ButtonAppBar/>
        <div className={s.app__linearprogress_wrapper}>
            {status === 'loading' && <LinearProgress className={s.app__linearprogress}/>}
        </div>
        <CustomizedSnackbars />
        <div className={s.app__wrapper}>
            <Container fixed>
                <Grid container spacing={0} style={{padding:"25px"}}>
                    <AddNewTodo
                        addNewTodo={onAddTodoHandler}
                        onInputTextKeyDown={onInputTextKeyDownNewTodo}
                    />
                </Grid>
                <TodolistsLists/>
            </Container>
        </div>
    </>
}


export default App;
