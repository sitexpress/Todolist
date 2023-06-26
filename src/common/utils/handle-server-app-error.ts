import {Dispatch} from "redux";
import {ActionTaskType} from "../../features/todolistsLists/tasks-reducer";
import {setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../../app/app-reducer";
import {PostTasksType, PostTodolistsType} from "../../features/todolistsLists/todolists-api";

export const handleServerAppError = <D>(data: PostTasksType | PostTodolistsType<D>, dispatch: Dispatch<ActionTaskType | SetErrorACType | SetStatusACType>) => {
    if(data.messages.length) {
        dispatch(setErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:'some error occurred'}))
    }
    dispatch(setStatusAC({status:'failed'}))
}