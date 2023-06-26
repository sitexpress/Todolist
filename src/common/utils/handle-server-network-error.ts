import {appActions, setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../../app/app-reducer";
import { Dispatch } from "redux";
import axios, {AxiosError} from "axios";



export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setErrorAC({error}))
    } else {
        dispatch(appActions.setErrorAC({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setStatusAC({status: 'failed'}))
}

