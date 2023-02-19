import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {AddNewTodo} from "../components/AddNewTodo/AddNewTodo";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Forms/AddNewTodo',
    component: AddNewTodo,
    argTypes: {
        addNewTodo: {
            description: 'Button clicked'
        },
        onInputTextKeyDown:{
            description: 'On enter key down'
        }
    },
} as ComponentMeta<typeof AddNewTodo>;


const Template: ComponentStory<typeof AddNewTodo> = (args) => <AddNewTodo {...args} />

// 1. Todolist has been added
export const newTodoWasAdded = Template.bind({})
newTodoWasAdded.args = {
    addNewTodo: action('A new todolist has just been added'),
    onInputTextKeyDown: action('A new todolist has just been added by Enter keydown event')
};



