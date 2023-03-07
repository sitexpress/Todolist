import {RemoveTodolistACType, AddNewTodolistACType, onSetTodolistsACType, onSetTodolistsAC} from "./todolists-reducer";
import {ItemsType, TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

const initialState:ItemsType = {}

export const tasksReducer = (state: ItemsType = initialState, action: ActionTaskType):ItemsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const task: TaskType = action.task
            return {...state, [task.todoListId]: [task,...state[task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                        ...t,
                        ...action.model
                    } : t)
            }
        case 'EDIT-TASK-NAME':
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ? {...t, name: action.name} : t)
            }
        case 'REMOVE-TODOLIST':
            const newState = {...state}
            delete newState[action.todolistId]
            return {...newState}
        case 'ADD-NEW-TODOLIST':
            return {
                ...state,[action.todolistId]: []
            }
        case 'SET-TODOLISTS':
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case 'SET-TASKS': {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks

            return copyState
        }
        default:
            return state
    }
}

// actions
type RemoveTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

type AddTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}

type OnEditTaskACType = ReturnType<typeof onEditTaskAC>
export const onEditTaskAC = (todolistId: string, taskId:string, name: string) => {
    return {type: 'EDIT-TASK-NAME', todolistId, taskId, name} as const
}

type onSetTaskACType = ReturnType<typeof onSetTaskAC>
export const onSetTaskAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

// thunks
export const fetchTasksTC = (todolistId:string) => (dispatch:Dispatch<ActionTaskType>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(onSetTaskAC(todolistId, res.data.items))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch:Dispatch<ActionTaskType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTasksAC(todolistId, taskId))
        })
}

export const addTasksTC = (todolistId:string, title:string) => (dispatch:Dispatch<ActionTaskType>) => {
    todolistAPI.createTask(todolistId,title)
        .then(res => {
            dispatch(addTasksAC(res.data.data.item))
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskType) => (dispatch:Dispatch<ActionTaskType>, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if(!task){
        // throw new Error("task not found in the state")
        console.warn("task not found in the state")
        return
    }
    const apiModel:TaskType = {
     ...task,
        ...domainModel
    }
    todolistAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            const action = updateTaskAC(todolistId, taskId, domainModel)
            dispatch(action)
        })
}

//types
export type UpdateTaskType = {
    description?: string
    title?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    id?: string
    todoListId?: string
    order?: number
    addedDate?: string
}

export type ActionTaskType = RemoveTasksACType
    | AddTasksACType
    | updateTaskACType
    | OnEditTaskACType
    | RemoveTodolistACType
    | AddNewTodolistACType
    | onSetTodolistsACType
    | onSetTaskACType

