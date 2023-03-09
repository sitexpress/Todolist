export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}


export type SetStatusACType = ReturnType<typeof setStatusAC>
export const setStatusAC = (status:RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)

export type SetErrorACType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error:string | null) => ({type:'APP/SET-ERROR', error} as const)

type ActionsType = SetErrorACType | SetStatusACType


