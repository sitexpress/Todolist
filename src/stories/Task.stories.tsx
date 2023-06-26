import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../common/components/Task/Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/Tasks',
    component: Task,
    argTypes: {
        todolistId: {
            description: "todolistId"
        },
        taskId: {
            description: "taskId"
        },
        taskName: {
            description: "taskName"
        },
        onCheckbox: {
            description: "change task status"
        },
        checked: {
            description: "checked"
        },
        onEditTaskSpanKeyPress: {
            description: "change task name"
        },
        onRemove:{
            description: "remove task"
        },
    } as ComponentMeta<typeof Task>
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

// 1. Task is active or is done
export const TaskActive = Template.bind({})
TaskActive.args = {
    todolistId: "todolistId",
    onRemove: action('Task has been removed'),
    onCheckbox:action('Status of task has been changed'),
    taskId: "1",
    taskName:"Jogging",
    checked: false,
    onEditTaskSpanKeyPress:action('Status of task has been changed by enter key down event'),
}


