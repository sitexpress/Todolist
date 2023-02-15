import {removeTodolistAC, todolistsReducer} from './todolists-reducer'
import {v1} from 'uuid'
import {TasksType, TodolistsType} from '../App'
import {addTasksAC, changeTaskStatusAC, removeTasksAC, tasksReducer} from "./tasks-reducer";

let todolistId1:string
let todolistId2:string
let startState:TasksType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: {
            data: [
                {id: v1(), name: 'Eat', isDone: false},
                {id: v1(), name: 'Sleep', isDone: false},
                {id: v1(), name: 'Rave', isDone: true},
            ]
        },
        [todolistId2]: {
            data: [
                {id: v1(), name: 'Eat', isDone: false},
                {id: v1(), name: 'Sleep', isDone: true},
                {id: v1(), name: 'Rave', isDone: false},
            ]
        }
    }
})

test('correct task should be removed', () => {
    const taskId = startState[todolistId1].data[0].id

    const action = removeTasksAC(todolistId1, taskId)
    const result = tasksReducer(startState, action)

    expect(result[todolistId1].data.length).toBe(2)
    expect(result[todolistId1].data[0].name).toBe('Sleep')
})

test('task should be added correctly', () => {
    const name = 'Drive'

    const action = addTasksAC(todolistId1, name)
    const result = tasksReducer(startState, action)

    expect(result[todolistId1].data[0].name).toBe('Drive')
    expect(result[todolistId1].data.length).toBe(4)
})


test('certain task status should be changed correctly', () => {
    const todolistId = todolistId1
    const taskId = startState[todolistId1].data[0].id
    const isDone = true

    const action = changeTaskStatusAC(todolistId, taskId, isDone)
    const result = tasksReducer(startState, action)

    expect(result[todolistId].data[0].isDone).toBe(true)
})

test('remove tasks in removed todolist', () => {
    const todolistId = todolistId1
    // delete startState[todolistId]
    expect(startState[todolistId].data[0].name).toBe('Eat')

    const action = removeTodolistAC(todolistId)
    const result = tasksReducer(startState, action)

    expect(result[todolistId]).toBe(undefined)


})