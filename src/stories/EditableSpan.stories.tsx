import React, {ChangeEvent, FocusEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {EditableSpan} from "../common/components/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";
import s from "../common/components/EditableSpan/EditableSpan.module.css";

export default {
    title: "Span component/EditableSpan",
    component: EditableSpan,
    argsType: {
        name: {
            description: "an old name of our task in span element",
        },
        onEditSpanKeyPress: {
            description: "task name has been changed"
        }
    } as ComponentMeta<typeof EditableSpan>
}


// 1.Editable span with state changing:
const Template:ComponentStory<typeof EditableSpan> = (args) => {
    const [newSpanName, setNewSpanName] = useState(args.name)
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
            setNewSpanName(newSpanName)
            // setNewSpanName('')
        } else {
            setError(true)
        }
    }

    const onEditSpanBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (newSpanName !== '') {
            setEditSpan(false)
            setNewSpanName(newSpanName)
            // setNewSpanName('')
        } else {
            setError(true)
        }
    }


    const onDoubleClickEditSpanHandler = () => {
        // setNewSpanName(newSpanName)
        setEditSpan(true)
    }

    const editInputClassName = error ? s.input__span_error : s.input__span

    return editSpan === false
        ?
        <span onDoubleClick={onDoubleClickEditSpanHandler}>{newSpanName}</span>
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

}

export const EditableSpanWithStateChanging = Template.bind({})
EditableSpanWithStateChanging.args = {
    name: "Work",
    onEditSpanKeyPress: action("task name has been changed by on enter key down or onBlur event")
}
