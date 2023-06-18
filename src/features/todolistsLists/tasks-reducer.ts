import {
    RemoveTodolistACType,
    AddNewTodolistACType,
    onSetTodolistsACType,
    onSetTodolistsAC,
    addNewTodolistAC, removeTodolistsTC, removeTodolistAC
} from "./todolists-reducer";
import {AddTaskArgType, ItemsType, TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";

type AsyncThunkConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}

// newThunk
const fetchTasks = createAppAsyncThunk<{
    todolistId: string,
    tasks: TaskType[]
}, string>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC({status: 'loading'}))

        const res = await todolistAPI.getTasks(todolistId)
        const tasks = res.data.items
        dispatch(setStatusAC({status: 'succeeded'}))
        // dispatch(onSetTaskAC({todolistId:todolistId, tasks}))
        return {todolistId, tasks}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }

})

export const addTask = createAppAsyncThunk<{
    task: TaskType
}, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const res = await todolistAPI.createTask(arg)

        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setStatusAC({status: 'succeeded'}))
            return {task}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }

})


const slice = createSlice({
    name: 'tasks',
    initialState: {} as ItemsType,
    reducers: {
        removeTasksAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        // addTasksAC(state, action: PayloadAction<{ task: TaskType }>) {
        //     state[action.payload.task.todoListId].unshift(action.payload.task)
        // },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        onEditTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, name: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], title: action.payload.name}
            }
        },
        // onSetTaskAC(state, action:PayloadAction<{todolistId: string, tasks: TaskType[]}>){
        //     state[action.payload.todolistId] = action.payload.tasks
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })

            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(onSetTodolistsAC, (state, action) => {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            })
    }

})

export const tasksReducer = slice.reducer
export const {removeTasksAC, updateTaskAC, onEditTaskAC} = slice.actions
export const tasksThunks = {fetchTasks, addTask}

type RemoveTasksACType = ReturnType<typeof removeTasksAC>
// type AddTasksACType = ReturnType<typeof addTasksAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type OnEditTaskACType = ReturnType<typeof onEditTaskAC>

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTasksAC({todolistId: todolistId, taskId: taskId}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

// export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
//     dispatch(setStatusAC({status: 'loading'}))
//     todolistAPI.createTask(todolistId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(addTasksAC({task: res.data.data.item}))
//                 dispatch(setStatusAC({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
        console.warn("task not found in the state")
        return
    }
    const apiModel: TaskType = {
        ...task,
        ...domainModel
    }
    todolistAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = updateTaskAC({todolistId: todolistId, taskId: taskId, model: domainModel})
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
    // | AddTasksACType
    | updateTaskACType
    | OnEditTaskACType
    | RemoveTodolistACType
    | AddNewTodolistACType
    | onSetTodolistsACType

