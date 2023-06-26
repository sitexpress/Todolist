import {setStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../common/utils/handle-server-network-error";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {handleServerAppError} from "../../common/utils/handle-server-app-error";
import {LoginParamsType} from "../../common/types/common-types";
import {authAPI} from "./auth-api";


export type AuthInitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }

})

export const authReducer = slice.reducer
export const authActions = slice.actions


// thunks
export const loginTC = (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = ():AppThunk => (dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
