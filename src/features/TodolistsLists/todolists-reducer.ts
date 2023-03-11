import {GetTodolistsType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, SetStatusACType} from "../../app/app-reducer";
import {v1} from "uuid";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type FilterType = 'all' | 'active' | 'done'
export type ExtendedGetTodolistsType = GetTodolistsType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
const initialState: ExtendedGetTodolistsType[] = []

export const todolistsReducer = (state: ExtendedGetTodolistsType[] = initialState, action: ActionTodoType): ExtendedGetTodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todolistId)
        case 'ADD-NEW-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                entityStatus: 'idle',
                addedDate: '',
                order: 0
            }, ...state]
        case 'CHANGE-TODOLIST-HEADING':
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'FILTER-TODOLISTS':
            return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all',
                    entityStatus: 'idle'
                }
            })

        default:
            return state
    }
}

// actions
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (todolistId: string, title: string) => {
    return {type: 'ADD-NEW-TODOLIST', todolistId, title} as const
}

type OnEditHeadingACType = ReturnType<typeof onEditHeadingAC>
export const onEditHeadingAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-HEADING', todolistId, title} as const
}

type OnFilterACType = ReturnType<typeof onFilterAC>
export const onFilterAC = (todolistId: string, filter: FilterType) => {
    return {type: 'FILTER-TODOLISTS', todolistId, filter} as const
}

export type onSetTodolistsACType = ReturnType<typeof onSetTodolistsAC>
export const onSetTodolistsAC = (todolists: GetTodolistsType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export type ChangeTodolistsEntityStatusACType = ReturnType<typeof changeTodolistsEntityStatusAC>
export const changeTodolistsEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const
}

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionTodoType | SetStatusACType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(onSetTodolistsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
}

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<ActionTodoType | SetStatusACType | ChangeTodolistsEntityStatusACType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTodolistsEntityStatusAC(todolistId,'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addNewTodolistTC = (title: string) => (dispatch: Dispatch<ActionTodoType | SetStatusACType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addNewTodolistAC(v1(), title))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionTodoType>) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(onEditHeadingAC(todolistId, title))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type ActionTodoType = RemoveTodolistACType
    | AddNewTodolistACType
    | OnEditHeadingACType
    | OnFilterACType
    | onSetTodolistsACType
    | ChangeTodolistsEntityStatusACType