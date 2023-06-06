import {AppRootStateType, useAppDispatch, useAppSelector} from "../../app/store";
import {
    addNewTodolistTC,
    changeTodolistTitleTC,
    ExtendedGetTodolistsType,
    fetchTodolistsTC,
    FilterType,
    onFilterAC, removeTodolistsTC
} from "./todolists-reducer";
import React, {ChangeEvent, useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolist-api";
import {addTasksTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import Grid from "@mui/material/Grid";
import s from "../../app/App.module.css";
import Paper from "@mui/material/Paper";
import {Mbutton} from "../../components/Button/Button";
import {Todolist} from "./Todolist/Todolist";
import {RequestStatusType} from "../../app/app-reducer";
import {AddNewTodo} from "../../components/AddNewTodo/AddNewTodo";
import { Navigate } from "react-router-dom";

type PropsType = {
    demo?:boolean

}
export const TodolistsLists:React.FC<PropsType> = ({demo= false}) => {
    const todolists = useAppSelector<ExtendedGetTodolistsType[]>(state => state.todolists)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    },[])

    const onCheckboxHandler = useCallback(
        (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
            const isDone = e.currentTarget.checked
            const status = isDone === true ? TaskStatuses.Completed : TaskStatuses.New
            const thunk = updateTaskTC(todolistId, taskId, {status})
            dispatch(thunk)
        },[dispatch])

    const onInputTextKeyDownHandler = useCallback((todolistId: string, name: string) => {
        onAddTaskHandler(todolistId, name)
    },[])

    const onRemoveTaskHandler = useCallback((todolistId: string, taskId: string) => {
        const thunk = removeTaskTC(todolistId, taskId)
        dispatch(thunk)
    },[])

    const onAddTaskHandler = useCallback((todolistId: string, name: string) => {
        const thunk = addTasksTC(todolistId, name)
        dispatch(thunk)
    },[])

    const onEditTaskSpanKeyPressHandler = useCallback((todolistId: string, taskId: string, title: string) => {
        const thunk = updateTaskTC(todolistId, taskId, {title})
        dispatch(thunk)
    },[])

    const onEditHeadingKeyPressHandler = useCallback((title: string, todolistId: string) => {
        const thunk = changeTodolistTitleTC(todolistId,title)
        dispatch(thunk)
    },[])

    const onFilterHandler = useCallback((todolistId: string, filter: FilterType) => {
        const action = onFilterAC({todolistId:todolistId, filter:filter})
        dispatch(action)
    },[])

    const onRemoveTodolist = (todolistId:string) => {
        dispatch(removeTodolistsTC(todolistId))
    }


    const onAddTodoHandler = useCallback(
        (title:string) => {
            if(demo) {
                return
            }
            dispatch(addNewTodolistTC(title))
        }, [])

    const onInputTextKeyDownNewTodo = useCallback((newTitle: string) => {
        onAddTodoHandler(newTitle)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid container spacing={0} style={{padding:"30px 30px 30px 0px", margin:" 0px 0px 0px -5px"}}>
            <AddNewTodo
                status={status}
                addNewTodo={onAddTodoHandler}
                onInputTextKeyDown={onInputTextKeyDownNewTodo}
            />
        </Grid>
        <Grid container spacing={2} style={{padding:"5px"}}>
            <div className={s.app__container}>

                {todolists.map(td => {
                    return <div key={td.id}>
                        <Paper elevation={2} style={{padding:"5px", margin:"5px"}}>
                            <Mbutton
                                callBack={() => onRemoveTodolist(td.id)}
                                name={'remove-todo'}
                                variant={"contained"}
                                entityStatus={td.entityStatus}
                            />
                            <Todolist
                                todolists={td}
                                onInputTextKeyDown={(todolistId: string, name: string) => onInputTextKeyDownHandler(todolistId, name)}
                                onAddTask={(todolistId: string, name: string) => onAddTaskHandler(todolistId, name)}
                                onCheckbox={onCheckboxHandler}
                                onRemove={onRemoveTaskHandler}
                                onFilter={onFilterHandler}
                                onEditTaskSpanKeyPress={onEditTaskSpanKeyPressHandler}
                                onEditHeadingKeyPress={onEditHeadingKeyPressHandler}
                                demo={demo}
                            />
                        </Paper>
                    </div>
                })}
            </div>
        </Grid>
    </>

}