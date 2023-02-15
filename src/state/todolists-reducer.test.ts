import {todolistsReducer} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistsType} from '../App'

let todolistId1:string
let todolistId2:string
let startState:TodolistsType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const result = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', todolistId: todolistId1})

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let todolistId0 = v1()
    let title = 'title0'

    const result = todolistsReducer(startState, {type: 'ADD-NEW-TODOLIST', todolistId:todolistId0, title:title})

    expect(result.length).toBe(3)
    expect(result[0].title).toBe('title0')
    expect(result[0].id).toBe(todolistId0)
})

test('correct todolists heading is being changed', () => {

    let title = 'newTitle'

    const result = todolistsReducer(startState, {type: 'CHANGE-TODOLIST-HEADING', todolistId: todolistId1, title})

    expect(result[0].title).toBe('newTitle')
})

test('correct todolist should be filtered', () => {

    const filter = 'active'

    const result = todolistsReducer(startState, {type: 'FILTER-TODOLISTS', todolistId: todolistId1, filter})

    expect(result[0].filter).toBe('active')
})
