import {setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../app/app-reducer";
import {PostTasksType, PostTodolistsType, TaskType} from "../api/todolist-api";
import {ActionTaskType} from "../features/TodolistsLists/tasks-reducer";
import { Dispatch } from "redux";

export const handleServerAppError = <D>(data: PostTasksType | PostTodolistsType<D>, dispatch: Dispatch<ActionTaskType | SetErrorACType | SetStatusACType>) => {
    if(data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message:string }, dispatch: Dispatch<ActionTaskType | SetErrorACType | SetStatusACType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'some error occurred'))
    dispatch(setStatusAC('failed'))
}

