import {appActions, setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../app/app-reducer";
import {PostTasksType, PostTodolistsType, TaskType} from "../api/todolist-api";
import {ActionTaskType} from "../features/todolistsLists/tasks-reducer";
import { Dispatch } from "redux";
import axios, {AxiosError} from "axios";

export const handleServerAppError = <D>(data: PostTasksType | PostTodolistsType<D>, dispatch: Dispatch<ActionTaskType | SetErrorACType | SetStatusACType>) => {
    if(data.messages.length) {
        dispatch(setErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:'some error occurred'}))
    }
    dispatch(setStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setErrorAC({error}))
    } else {
        dispatch(appActions.setErrorAC({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setStatusAC({status: 'failed'}))
}

