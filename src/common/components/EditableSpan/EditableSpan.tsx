import React, {KeyboardEvent, ChangeEvent, FocusEvent, useState, memo} from 'react';
import s from './EditableSpan.module.css'

type EditableSpanType = {
    name: string
    onEditSpanKeyPress:(name:string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = memo(({
                                                                  name,
                                                                  onEditSpanKeyPress
                                                              }) => {
    const [newSpanName, setNewSpanName] = useState('')
    const [editSpan, setEditSpan] = useState(false)
    const [error, setError] = useState(false)

    const onEditSpanHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const newName = e.currentTarget.value
        setNewSpanName(newName)
        setError(false)
    }

    const onEditSpanKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newSpanName !== '') {
            setEditSpan(false)
            onEditSpanKeyPress(newSpanName)
            setNewSpanName('')
        } else {
            setError(true)
        }
    }

    const onEditSpanBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (newSpanName !== '') {
            setEditSpan(false)
            onEditSpanKeyPress(newSpanName)
            setNewSpanName('')
        } else {
            setError(true)
        }
    }


    const onDoubleClickEditSpanHandler = () => {
        setNewSpanName(name)
        setEditSpan(true)
    }

    const editInputClassName = error ? s.input__span_error : s.input__span

    return editSpan === false
        ?
        <span onDoubleClick={onDoubleClickEditSpanHandler}>{name}</span>
        :
        <input
            className={editInputClassName}
            value={newSpanName}
            type="text"
            onChange={onEditSpanHandler}
            onKeyDown={onEditSpanKeyPressHandler}
            onBlur={onEditSpanBlurHandler}
            autoFocus
        />
})

