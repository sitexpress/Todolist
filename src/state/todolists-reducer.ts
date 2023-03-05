import {GetTodolistsType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterType = 'all' | 'active' | 'done'

export type ExtendedGetTodolistsType = GetTodolistsType & {
    filter: FilterType
}

const initialState:ExtendedGetTodolistsType[] = []

export const todolistsReducer = (state: ExtendedGetTodolistsType[] = initialState, action: ActionTodoType):  ExtendedGetTodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todolistId)
        case 'ADD-NEW-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: '',
                order:0
            }, ...state]
        case 'CHANGE-TODOLIST-HEADING':
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        case 'FILTER-TODOLISTS':
            return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => {
                    return {
                        ...tl,
                        filter:'all'
                    }
                })

        default:
            return state
    }
}
export type ActionTodoType = RemoveTodolistACType
    | AddNewTodolistACType
    | OnEditHeadingACType
    | OnFilterACType
    | onSetTodolistsACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (todolistId:string, title: string) => {
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



//Thunk--------------------------------------------------------------------
export const fetchTodolistsTC = () => (dispatch:Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(onSetTodolistsAC(res.data))
        })
}

export const removeTodolistsTC = (todolistId:string) => (dispatch:Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const changeTodolistTitleTC = (todolistId:string, title:string) => (dispatch:Dispatch) => {
    todolistAPI.updateTodolist(todolistId,title)
        .then((res) => {
            dispatch(onEditHeadingAC(todolistId,title))
        })
}