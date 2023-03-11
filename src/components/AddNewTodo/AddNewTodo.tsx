import React, {ChangeEvent, FocusEvent, KeyboardEvent, memo, useState} from 'react';
import {Input} from "../Input/Input";
import {Mbutton} from "../Button/Button";
import {RequestStatusType} from "../../app/app-reducer";
import {AppComponent} from "../../stories/App.stories";

type AddNewTodoType = {
    status:RequestStatusType
    addNewTodo:(title:string) => void
    onInputTextKeyDown: (newTitle: string) => void
}
export const AddNewTodo: React.FC<AddNewTodoType> = memo(
    ({
         status,
         addNewTodo,
         onInputTextKeyDown,
     }) => {
        const [newTitle, setNewTitle] = useState('')
        const [error, setError] = useState(false)

        const onChangeCallBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitle(e.currentTarget.value)
            setError(false)
        }

        const onKeyDownCallBackHandler = (newTitle: string, e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && newTitle !== '') {
                onInputTextKeyDown(newTitle)
                setNewTitle('')
            }
            if (newTitle === '') {
                setError(true)
            }
        }

        const addNewTodoHandler = (title:string) => {
            if (title.trim() !== '') {
                addNewTodo(newTitle)
                setNewTitle('')
            } else {
                setError(true)
            }
        }

        const onBlurCallBackHandler = (e:FocusEvent<HTMLInputElement>) => {
            if (e.currentTarget) {
                setError(false)
            }
        }

        return <>
            <Input
                value={newTitle}
                entityStatus={status}
                onChangeCallBack={onChangeCallBackHandler}
                onKeyDownCallBack={(e: KeyboardEvent<HTMLInputElement>) => onKeyDownCallBackHandler(newTitle, e)}
                onBlurCallBack={(e:FocusEvent<HTMLInputElement>) => onBlurCallBackHandler(e)}
                error={error}
            />
            <Mbutton
                callBack={()=>addNewTodoHandler(newTitle)}
                name={'Add a new todolist'}
                variant={"outlined"}
                entityStatus={status}
            />
        </>
    }
)


