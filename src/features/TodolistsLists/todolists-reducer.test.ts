import {ExtendedGetTodolistsType, onSetTodolistsAC, todolistsReducer} from './todolists-reducer'
import {v1} from 'uuid'
// import {TodolistsType} from '../App'

let todolistId1:string
let todolistId2:string
let todolistId3:string
let items:ExtendedGetTodolistsType[]
let newItems:ExtendedGetTodolistsType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    todolistId3 = v1()

    items = [
                    {
                        id: todolistId1, 
                        title: 'What to learn', 
                        filter: 'all',
                        addedDate: "2019-07-30T12:24:15.063",
                        order: 0
                    },
                    {
                        id: todolistId2, 
                        title: 'What to buy', 
                        filter: 'all',
                        addedDate: "2019-07-30T12:24:15.063",
                        order: 0
                    }
                ]

    newItems = [
        {
            id: todolistId1,
            title: 'What',
            filter: 'all',
            addedDate: "2019-07-30T12:24:15.063",
            order: 0
        },
        {
            id: todolistId2,
            title: 'What',
            filter: 'all',
            addedDate: "2019-07-30T12:24:15.063",
            order: 0
        },
        {
            id: todolistId2,
            title: 'What',
            filter: 'all',
            addedDate: "2019-07-30T12:24:15.063",
            order: 0
        }
    ]
})

test('correct todolist should be removed', () => {

    const result = todolistsReducer(items, {type: 'REMOVE-TODOLIST', todolistId: todolistId1})

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let todolistId0 = v1()
    let title = 'title0'

    const result = todolistsReducer(items, {type: 'ADD-NEW-TODOLIST', todolistId:todolistId0, title:title})

    expect(result.length).toBe(3)
    expect(result[0].title).toBe('title0')
    expect(result[0].id).toBe(todolistId0)
})

test('correct todolists heading is being changed', () => {

    let title = 'newTitle'

    const result = todolistsReducer(items, {type: 'CHANGE-TODOLIST-HEADING', todolistId: todolistId1, title})

    expect(result[0].title).toBe('newTitle')
})

test('correct todolist should be filtered', () => {

    const filter = 'active'

    const result = todolistsReducer(items, {type: 'FILTER-TODOLISTS', todolistId: todolistId1, filter})

    expect(result[0].filter).toBe('active')
})

test('TodolistsLists should be set to the state', () => {

    expect(items[0].title).toBe('What to learn')
    expect(items.length).toBe(2)

    const action = onSetTodolistsAC(newItems)
    const result = todolistsReducer(items, action)

    expect(result[0].title).toBe('What')
    expect(result.length).toBe(3)

})
