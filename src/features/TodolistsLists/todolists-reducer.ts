import {GetTodolistsType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterType = 'all' | 'active' | 'done'
export type ExtendedGetTodolistsType = GetTodolistsType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: "todolists",
    initialState:[] as ExtendedGetTodolistsType[],
    reducers: {
        removeTodolistAC(state, action:PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)

            if(index > -1) {
                state.splice(index, 1)
            }
        },
        addNewTodolistAC(state, action:PayloadAction<{ todolistId: string, title: string }>){
                state.unshift({
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    filter: "all",
                    entityStatus: 'idle',
                    addedDate: '',
                    order: 0
                })
        },
        onEditHeadingAC(state, action:PayloadAction<{ todolistId: string, title: string }>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        onFilterAC(state, action:PayloadAction<{todolistId: string, filter: FilterType}>){
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        onSetTodolistsAC(state, action:PayloadAction<{todolists: GetTodolistsType[]}>){
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistsEntityStatusAC(state, action:PayloadAction<{id: string, status: RequestStatusType}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.status
        },
    }
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addNewTodolistAC,
    onEditHeadingAC,
    onFilterAC,
    onSetTodolistsAC,
    changeTodolistsEntityStatusAC
} = slice.actions




export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
type OnEditHeadingACType = ReturnType<typeof onEditHeadingAC>
type OnFilterACType = ReturnType<typeof onFilterAC>
export type onSetTodolistsACType = ReturnType<typeof onSetTodolistsAC>
export type ChangeTodolistsEntityStatusACType = ReturnType<typeof changeTodolistsEntityStatusAC>

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status:'loading'}))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(onSetTodolistsAC({todolists:res.data}))
            dispatch(setStatusAC({status:'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status:'loading'}))
    dispatch(changeTodolistsEntityStatusAC({id:todolistId, status:'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC({todolistId:todolistId}))
                dispatch(setStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addNewTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status:'loading'}))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addNewTodolistAC({todolistId:res.data.data.item.id, title:title}))
                dispatch(setStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(onEditHeadingAC({todolistId:todolistId, title:title}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


// Redux-thunk--------------------------------------

// export const todolistsReducer = (state: ExtendedGetTodolistsType[] = initialState, action: ActionTodoType): ExtendedGetTodolistsType[] => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(todo => todo.id !== action.todolistId)
//         case 'ADD-NEW-TODOLIST':
//             return [{
//                 id: action.todolistId,
//                 title: action.title,
//                 filter: "all",
//                 entityStatus: 'idle',
//                 addedDate: '',
//                 order: 0
//             }, ...state]
//         case 'CHANGE-TODOLIST-HEADING':
//             return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
//         case 'CHANGE-TODOLIST-ENTITY-STATUS':
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//         case 'FILTER-TODOLISTS':
//             return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
//         case 'SET-TODOLISTS':
//             return action.todolists.map(tl => {
//                 return {
//                     ...tl,
//                     filter: 'all',
//                     entityStatus: 'idle'
//                 }
//             })
//
//         default:
//             return state
//     }
// }
// actions

// export const removeTodolistAC = (todolistId: string) => {
//     return {type: 'REMOVE-TODOLIST', todolistId} as const
// }

// export const addNewTodolistAC = (todolistId: string, title: string) => {
//     return {type: 'ADD-NEW-TODOLIST', todolistId, title} as const
// }

// export const onEditHeadingAC = (todolistId: string, title: string) => {
//     return {type: 'CHANGE-TODOLIST-HEADING', todolistId, title} as const
// }

// export const onFilterAC = (todolistId: string, filter: FilterType) => {
//     return {type: 'FILTER-TODOLISTS', todolistId, filter} as const
// }

// export const onSetTodolistsAC = (todolists: GetTodolistsType[]) => {
//     return {type: 'SET-TODOLISTS', todolists} as const
// }

// export const changeTodolistsEntityStatusAC = (id: string, status: RequestStatusType) => {
//     return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const
// }


// types
// export type ActionTodoType = RemoveTodolistACType
//     | AddNewTodolistACType
//     | OnEditHeadingACType
//     | OnFilterACType
//     | onSetTodolistsACType
//     | ChangeTodolistsEntityStatusACType