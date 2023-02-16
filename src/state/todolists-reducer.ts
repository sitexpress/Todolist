import {FilterType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistsType[], action: ActionTodoType):  TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todolistId)
        case 'ADD-NEW-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-HEADING':
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        case 'FILTER-TODOLISTS':
            return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
        default:
            throw new Error('I don\'t understand this type')
    }
}
export type ActionTodoType = RemoveTodolistACType
    | AddNewTodolistACType
    | OnEditHeadingACType
    | OnFilterACType

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