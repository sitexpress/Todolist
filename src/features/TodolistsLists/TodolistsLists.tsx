import {useAppDispatch, useAppSelector} from "../../app/store";
import {
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


export const TodolistsLists = () => {
    const todolists = useAppSelector<ExtendedGetTodolistsType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    },[])

    const onCheckboxHandler = useCallback(
        (todolistId: string, taskId: string, e: ChangeEvent<HTMLInputElement>) => {
            const isDone = e.currentTarget.checked
            const status = isDone === true ? TaskStatuses.Completed : TaskStatuses.New
            // const action = changeTaskStatusAC(todolistId, taskId, status)
            // dispatch(action)
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
        // const action = onEditTaskAC(todolistId, taskId, name)
        // dispatch(action)
        const thunk = updateTaskTC(todolistId, taskId, {title})
        dispatch(thunk)
    },[])

    const onEditHeadingKeyPressHandler = useCallback((title: string, todolistId: string) => {
        // const action = onEditHeadingAC(todolistId,title)
        // dispatch(action)
        const thunk = changeTodolistTitleTC(todolistId,title)
        dispatch(thunk)
    },[])

    const onFilterHandler = useCallback((todolistId: string, filter: FilterType) => {
        const action = onFilterAC(todolistId, filter)
        dispatch(action)
    },[])



    const onRemoveTodolist = (todolistId:string) => {
        dispatch(removeTodolistsTC(todolistId))
        // const action = removeTodolistAC(todolistId)
        // dispatch(action)
    }
    return <>
        <Grid container spacing={2} style={{padding:"5px"}}>
            <div className={s.app__container}>

                {todolists.map(td => {
                    return <div key={td.id}>
                        <Paper elevation={2} style={{padding:"5px", margin:"5px"}}>
                            <Mbutton
                                callBack={() => onRemoveTodolist(td.id)}
                                name={'remove-todo'}
                                variant={"contained"}
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
                            />
                        </Paper>
                    </div>
                })}
            </div>
        </Grid>
    </>

}