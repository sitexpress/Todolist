import {
    RemoveTodolistACType,
    AddNewTodolistACType,
    onSetTodolistsACType,
    onSetTodolistsAC,
    addNewTodolistAC, removeTodolistsTC, removeTodolistAC
} from "./todolists-reducer";
import {ItemsType, TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name:'tasks',
    initialState: {} as ItemsType,
    reducers: {
        removeTasksAC(state, action:PayloadAction<{ todolistId: string, taskId: string }>){
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if(index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTasksAC(state, action:PayloadAction<{task: TaskType}>){
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action:PayloadAction<{todolistId: string, taskId: string, model: UpdateTaskType}>){
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        onEditTaskAC(state, action:PayloadAction<{todolistId: string, taskId:string, name: string}>){
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if(index > -1) {
                tasks[index] = {...tasks[index], title:action.payload.name}
            }
        },
        onSetTaskAC(state, action:PayloadAction<{todolistId: string, tasks: TaskType[]}>){
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers:(builder) => {
        builder.addCase(addNewTodolistAC, (state,action) => {
            state[action.payload.todolistId] = []
        })
        builder.addCase(removeTodolistAC, (state,action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(onSetTodolistsAC, (state,action) => {
            action.payload.todolists.forEach((tl:any) => {
                state[tl.id] = []
            })
        })
    }

})

export const tasksReducer = slice.reducer
export const {removeTasksAC, addTasksAC, updateTaskAC, onEditTaskAC, onSetTaskAC} = slice.actions


type RemoveTasksACType = ReturnType<typeof removeTasksAC>
type AddTasksACType = ReturnType<typeof addTasksAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type OnEditTaskACType = ReturnType<typeof onEditTaskAC>
type onSetTaskACType = ReturnType<typeof onSetTaskAC>


// export const tasksReducer = (state: ItemsType = initialState, action: any):ItemsType => {
//     switch (action.type) {
//         case 'REMOVE-TASK':
//             return {
//                 ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
//             }
//         case 'ADD-TASK':
//             const task: TaskType = action.task
//             return {...state, [task.todoListId]: [task,...state[task.todoListId]]}
//         case 'UPDATE-TASK':
//             return {
//                 ...state, [action.todolistId]:
//                     state[action.todolistId].map(t => t.id === action.taskId ? {
//                         ...t,
//                         ...action.model
//                     } : t)
//             }
//         case 'EDIT-TASK-NAME':
//             return {
//                 ...state, [action.todolistId]:
//                     state[action.todolistId].map(t => t.id === action.taskId ? {
//                         ...t,
//                         name: action.name} : t)
//             }
//         case removeTodolistAC.type:
//             const newState = {...state}
//             delete newState[action.payload.todolistId]
//             return {...newState}
//         case addNewTodolistAC.type:
//             return {
//                 ...state,[action.payload.todolistId]: []
//             }
//         case onSetTodolistsAC.type:
//             const copyState = {...state}
//             action.payload.todolists.forEach((tl:any) => {
//                 copyState[tl.id] = []
//             })
//             return copyState
//         case 'SET-TASKS': {
//             const copyState = {...state}
//             copyState[action.todolistId] = action.tasks
//
//             return copyState
//         }
//         default:
//             return state
//     }
// }

// actions

// export const removeTasksAC = (todolistId: string, taskId: string) => {
//     return {type: 'REMOVE-TASK', todolistId, taskId} as const
// }


// export const addTasksAC = (task: TaskType) => {
//     return {type: 'ADD-TASK', task} as const
// }


// export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskType) => {
//     return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
// }


// export const onEditTaskAC = (todolistId: string, taskId:string, name: string) => {
//     return {type: 'EDIT-TASK-NAME', todolistId, taskId, name} as const
// }


// export const onSetTaskAC = (todolistId: string, tasks: TaskType[]) => {
//     return {type: 'SET-TASKS', todolistId, tasks} as const
// }

// thunks
export const fetchTasksTC = (todolistId:string) => (dispatch:Dispatch) => {
    dispatch(setStatusAC({status:'loading'}))
    todolistAPI.getTasks(todolistId)
        .then(res => {
            dispatch(onSetTaskAC({todolistId:todolistId, tasks:res.data.items}))
            dispatch(setStatusAC({status:'succeeded'}))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch:Dispatch) => {
    dispatch(setStatusAC({status:'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(removeTasksAC({todolistId: todolistId, taskId:taskId}))
                dispatch(setStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTasksTC = (todolistId:string, title:string) => (dispatch:Dispatch) => {
    dispatch(setStatusAC({status:'loading'}))
    todolistAPI.createTask(todolistId,title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(addTasksAC({task:res.data.data.item}))
                dispatch(setStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
                // if(res.data.messages.length) {
                //     dispatch(setErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setErrorAC('some error occurred'))
                // }
                // dispatch(setStatusAC('failed'))
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            // dispatch(setErrorAC(error.message))
            // dispatch(setStatusAC('failed'))
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskType) => (dispatch:Dispatch, getState: () => AppRootStateType) => {
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
            if(res.data.resultCode === 0) {
                const action = updateTaskAC({todolistId:todolistId, taskId:taskId, model:domainModel})
                dispatch(action)
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
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

