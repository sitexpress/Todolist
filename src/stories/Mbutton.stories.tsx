import {Mbutton} from '../common/components/Button/Button'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: "Buttons/Mbutton",
    component: Mbutton,
    argTypes: {
        callBack: {
            description: "Todolist has been added on button clicked"
        },
        name:{
            description: ["Add a new todolist", "x", "remove-todo", "all", "active", "done"]
        },
        variant: {
            description: "Variant of the buttons",
            options: ["text", "outlined", "contained"]
        }
    } as ComponentMeta<typeof Mbutton>
}

const Template:ComponentStory<typeof Mbutton> = (args) => <Mbutton {...args}/>

// 1.Add todolist mui Button into universal button component:
export const AddNewTodolistButton = Template.bind({})
AddNewTodolistButton.args = {
    callBack: action("todo has just been added"),
    name:"Add a new todolist",
    variant: "outlined",
}

// 2.Remove todolist mui Button into universal button component:
export const RemoveTodolistButton = Template.bind({})
RemoveTodolistButton.args = {
    callBack: action("todo has just been removed"),
    name:"remove-todo",
    variant: "text",
}

// 3.Filter "all" mui Button into universal button component:
export const FilterAllButton = Template.bind({})
FilterAllButton.args = {
    callBack: action("title of todo has just been added"),
    name: "all",
    variant: "outlined",
}

// 4.Filter "active" mui Button into universal button component:
export const FilterActiveButton = Template.bind({})
FilterActiveButton.args = {
    callBack: action("title of todo has just been added"),
    name: "active",
    variant: "outlined",
}

// 5.Filter "done" mui Button into universal button component:
export const FilterDoneButton = Template.bind({})
FilterDoneButton.args = {
    callBack: action("title of todo has just been added"),
    name: "done",
    variant: "outlined",
}


