import {appReducer, InitialStateType, setErrorAC} from "./app-reducer"

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    expect(startState.error).toBe(null)
    const endState = appReducer(startState, setErrorAC({error:'some error'}))

    expect(endState.error).toBe('some error')
})


