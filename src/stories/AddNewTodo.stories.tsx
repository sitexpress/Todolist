import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {AddNewTodo} from "../components/AddNewTodo/AddNewTodo";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddNewTodo',
    component: AddNewTodo,
    argTypes: {
        addNewTodo: {
            description: 'Todolist has been added on button clicked'
        },
        onInputTextKeyDown:{
            description: 'Todolist has been added on enter key down'
        }
    },
} as ComponentMeta<typeof AddNewTodo>;

const addNewTodoCallback = action('A new todolist has just been added')
const onInputTextCallback = action('A new todolist has just been added by Enter keydown event')

const baseArgs = {
    addNewTodo: addNewTodoCallback,
    onInputTextKeyDown: onInputTextCallback
}

const Template: ComponentStory<typeof AddNewTodo> = (args) => <AddNewTodo {...args} />;

export const newTodoWasAdded = Template.bind({});
newTodoWasAdded.args = {
    ...baseArgs,

    addNewTodo:(title:string) => {},
    onInputTextKeyDown: (newTitle: string) => {}
};
