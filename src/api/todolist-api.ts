import axios, {AxiosResponse} from "axios";
import {ExtendedGetTodolistsType} from "../state/todolists-reducer";

// TodolistsTypes ----------------------------------

export type GetTodolistsType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type PostTodolistsType<D> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

// TasksTypes ---------------------------------------------

// export type TaskType = {
//     description: string
//     title: string
//     completed: boolean
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: Date
//     deadline: Date
//     id: string
//     todoListId: string
//     order: number
//     addedDate: Date
// }

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

// const model:TaskType = {
//     description: '',
//     title: '',
//     completed: false,
//     status: TaskStatuses.New,
//     priority: TaskPriorities.Low,
//     startDate: '',
//     deadline: '',
//     id: '',
//     todoListId: '',
//     order: 0,
//     addedDate: ''
// }

type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type ItemsType = {
    [key: string]: TaskType[]
}

type PostTasksType = {
    data: {
        item: TaskType
    }
    fieldsError: []
    messages: string[]
    resultCode: number
}

// Instance --------------------------------------------------
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '63052fc1-39d2-496e-872a-b5f91fbb5674'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<ExtendedGetTodolistsType[]>(`todo-lists`)
    },
    createTodolist(title:string) {
        return instance.post<PostTodolistsType<{item:ExtendedGetTodolistsType[]}>>(
            `todo-lists`,
            {title}
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<PostTodolistsType<{}>>(
            `todo-lists/${todolistId}`
        )
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<PostTodolistsType<{}>>(
            `todo-lists/${todolistId}`,
            {title}
        )
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<PostTasksType>(
            `todo-lists/${todolistId}/tasks`,
            {title}
        )
    },
    updateTask(todolistId: string, taskId: string, model:TaskType) {
        console.log('update,', model)

        return instance.put<PostTasksType, AxiosResponse<PostTasksType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<PostTasksType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
}