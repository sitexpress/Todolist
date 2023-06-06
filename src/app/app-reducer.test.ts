import {appReducer, RequestStatusType, setErrorAC} from "./app-reducer"

let startState: StartStateType
type StartStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}
beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    expect(startState.error).toBe(null)
    const endState = appReducer(startState, setErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error')
})


