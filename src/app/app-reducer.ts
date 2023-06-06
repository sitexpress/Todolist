import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
// import {setIsLoggedIn} from "../features/auth/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authActions} from "features/auth/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false as boolean
    },
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    }

})

export const appReducer = slice.reducer
export const {setStatusAC, setAppIsInitializedAC, setErrorAC} = slice.actions


// export const appReducer = (state: InitialStateType = initialState, action: ActionsType):InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-IS-INITIALIZED':
//             return {...state, isInitialized: action.value}
//         default:
//             return {...state}
//     }
// }

// actions
export type SetStatusACType = ReturnType<typeof setStatusAC>
// export const setStatusAC = (status:RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)
//
export type setAppIsInitializedACType = ReturnType<typeof setAppIsInitializedAC>
// export const setAppIsInitializedAC = (value:boolean) => ({type:'APP/SET-IS-INITIALIZED', value} as const)
//
export type SetErrorACType = ReturnType<typeof setErrorAC>
// export const setErrorAC = (error:string | null) => ({type:'APP/SET-ERROR', error} as const)


// thunk

export const initializeAppTC = () => (dispatch:Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}))

        } else {

        }
        dispatch(setAppIsInitializedAC({isInitialized:true}))
    })
}

// type ActionsType = SetErrorACType | SetStatusACType | setAppIsInitializedACType


