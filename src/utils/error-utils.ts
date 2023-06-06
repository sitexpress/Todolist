import {setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../app/app-reducer";
import {PostTasksType, PostTodolistsType, TaskType} from "../api/todolist-api";
import {ActionTaskType} from "../features/todolistsLists/tasks-reducer";
import { Dispatch } from "redux";

export const handleServerAppError = <D>(data: PostTasksType | PostTodolistsType<D>, dispatch: Dispatch<ActionTaskType | SetErrorACType | SetStatusACType>) => {
    if(data.messages.length) {
        dispatch(setErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:'some error occurred'}))
    }
    dispatch(setStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error: { message:string }, dispatch: Dispatch<ActionTaskType | SetErrorACType | SetStatusACType>) => {
    dispatch(setErrorAC({error:error.message ? error.message : 'some error occurred'}))
    dispatch(setStatusAC({status:'failed'}))
}

