import {TasksType} from "../App";
import {RemoveTodolistACType,AddNewTodolistACType} from "./todolists-reducer";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: ActionTaskType):TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId],
                    data: state[action.todolistId].data.filter(t => t.id !== action.taskId)
                }
            }
        case 'ADD-TASK':
            const task = {id: v1(), name: action.name.trim(), isDone: false}
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId], data:
                        [task, ...state[action.todolistId].data]
                }
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId],
                    data: state[action.todolistId].data.map(t => t.id === action.taskId ? {
                        ...t,
                        isDone: action.isDone
                    } : t)
                }
            }
        case 'EDIT-TASK-NAME':
            return {
                ...state,
                [action.todolistId]: {
                    ...state[action.todolistId],
                    data: state[action.todolistId].data.map(t => t.id === action.taskId ? {...t, name: action.name} : t)
                }
            }
        case 'REMOVE-TODOLIST':
            const newState = {...state}
            delete newState[action.todolistId]
            return {...newState}
        case 'ADD-NEW-TODOLIST':
            return {
                ...state,
                    [action.todolistId]: {...state[action.todolistId], data: []}
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}
export type ActionTaskType = RemoveTasksACType
    | AddTasksACType
    | ChangeTaskStatusACType
    | OnEditTaskACType
    | RemoveTodolistACType
    | AddNewTodolistACType


type RemoveTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

type AddTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (todolistId: string, name: string) => {
    return {type: 'ADD-TASK', todolistId, name} as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const
}

type OnEditTaskACType = ReturnType<typeof onEditTaskAC>
export const onEditTaskAC = (todolistId: string, taskId: string, name: string) => {
    return {type: 'EDIT-TASK-NAME', todolistId, taskId, name} as const
}



