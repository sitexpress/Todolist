import {Provider} from "react-redux"
import {AppRootStateType, store} from "../../app/store"
import {combineReducers} from "redux";
import {tasksReducer} from "../../features/TodolistsLists/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsLists/todolists-reducer";
import { legacy_createStore as createStore} from 'redux'
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}


export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}