import {Provider} from "react-redux"
import {AppRootStateType, store} from "../../app/store"
import {applyMiddleware, combineReducers} from "redux";
import {tasksReducer} from "../../features/TodolistsLists/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsLists/todolists-reducer";
import { legacy_createStore as createStore} from 'redux'
import {v1} from "uuid";
import thunk from "redux-thunk";
import {appReducer} from "../../app/app-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState:AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order:0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order:0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                description: '',
                id: v1(),
                title: 'HTML&CSS',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: ''
            },
            {
                description: '',
                id: v1(),
                title: 'JS&TS',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: ''
            },
        ],
        ['todolistId2']: [
            {
                description: '',
                id: v1(),
                title: 'WORK&HARD',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: ''
            },
            {
                description: '',
                id: v1(),
                title: 'BUY&MORE',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: ''
            },
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
}


export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}