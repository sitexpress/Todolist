import {ExtendedGetTodolistsType} from "./todolists-reducer";
import {AxiosResponse} from "axios";
import {instance} from "../../common/api/common-api";
import {TaskPriorities, TaskStatuses} from "../../common/enums/common-enums";
import {UpdateTaskType} from "./tasks-reducer";

export const todolistAPI = {
    getTodolists() {
        return instance.get<ExtendedGetTodolistsType[]>(`todo-lists`)
    },
    createTodolist(title:string) {
        return instance.post<PostTodolistsType<{item:ExtendedGetTodolistsType}>>(
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
    createTask(arg:AddTaskArgType) {
        return instance.post<PostTasksType>(
            `todo-lists/${arg.todolistId}/tasks`,
            {title:arg.title}
        )
    },
    updateTask(todolistId: string, taskId: string, model:TaskType) {
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

// TodolistsTypes
export type GetTodolistsType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type PostTodolistsType<D> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

// TasksTypes

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

type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type ItemsType = {
    [key: string]: TaskType[]
}

export type PostTasksType = {
    data: {
        item: TaskType
    }
    fieldsError: []
    messages: string[]
    resultCode: number
}

export type AddTaskArgType = {
    todolistId: string
    title: string
}

export type UpdateTaskArgType = {
    todolistId: string
    domainModel: UpdateTaskType
    taskId: string
}