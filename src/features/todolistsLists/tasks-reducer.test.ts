import {ExtendedGetTodolistsType, removeTodolistAC} from './todolists-reducer'
import {v1} from 'uuid'
import {updateTaskAC, removeTasksAC, tasksReducer, tasksThunks} from "./tasks-reducer";
import {ItemsType, TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";

let todolistId1: string
let todolistId2: string
let taskId1: string
let state: ItemsType
let state2: ItemsType
let emptyState: ItemsType
let todolists: ExtendedGetTodolistsType[]


beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    taskId1 = v1()

    state = {
        [todolistId1]: [
            {
                description: '',
                title: 'Eat',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '123',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Sleep',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Rave',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }
        ],
        [todolistId2]: [
            {
                description: '',
                title: 'Eat',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Sleep',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Rave',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }
        ]
    }
    state2 = {
        [todolistId1]: [
            {
                description: '',
                title: 'Sleep',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '123',
                todoListId: todolistId1,
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Rave',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            }
        ]
    }
    emptyState = {}
    todolists = [
        {
            id: todolistId1,
            title: 'What',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: "2019-07-30T12:24:15.063",
            order: 0
        },
        {
            id: todolistId2,
            title: 'What',
            filter: 'all',
            entityStatus: 'idle',
            addedDate: "2019-07-30T12:24:15.063",
            order: 0
        }
    ]

})

test('correct task should be removed', () => {
    const taskId = state[todolistId1][0].id

    const action = removeTasksAC({todolistId: todolistId1, taskId: taskId})
    const result = tasksReducer(state, action)

    expect(result[todolistId1].length).toBe(2)
    expect(result[todolistId1][0].title).toBe('Sleep')
})

test('correct task should be added correctly', () => {

    expect(state2[todolistId1][0].title).toBe('Sleep')
    expect(state2[todolistId1].length).toBe(2)

    const action = tasksThunks.addTask.fulfilled({task: state[todolistId1][0]}, 'requestId', {title:'Eat',todolistId:todolistId1})
    const result = tasksReducer(state2, action)

    expect(result[todolistId1][0].title).toBe('Eat')
    expect(result[todolistId1].length).toBe(3)
})


test('certain task status should be changed correctly', () => {
    const todolistId = todolistId1
    const taskId = state[todolistId1][0].id
    const status = TaskStatuses.Completed

    const action = updateTaskAC({todolistId: todolistId, taskId: taskId, model: {status}})
    const result = tasksReducer(state, action)

    expect(result[todolistId][0].status).toBe(2)
})

test('remove tasks in removed todolist', () => {
    const todolistId = todolistId1
    // delete startState[todolistId]
    expect(state[todolistId][0].title).toBe('Eat')

    const action = removeTodolistAC({todolistId: todolistId})
    const result = tasksReducer(state, action)

    expect(result[todolistId]).toBe(undefined)
})

test('empty arrays should be added when we set todolists', () => {
    const size = Object.keys(emptyState).length

    expect(size).toEqual(0)
    const result = tasksReducer(emptyState, {type: 'SET-TODOLISTS', todolists: todolists})

    const resultSize = Object.keys(result).length
    expect(resultSize).toEqual(2)

})
test('should set task correctly', () => {

    const size = Object.keys(emptyState).length
    expect(size).toEqual(0)

    const action = tasksThunks.fetchTasks.fulfilled({todolistId: todolistId1, tasks: state[todolistId1]}, 'requestId', todolistId1)
    const result = tasksReducer(emptyState, action)

    const resultSize = Object.keys(result).length
    expect(resultSize).toEqual(1)
    expect(result[todolistId1][0].title).toBe("Eat")
})