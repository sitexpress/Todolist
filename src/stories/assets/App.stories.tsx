import React from "react"
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator"
import App from "../../app/App";


export default {
    title: "Todolist/App",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App/>


export const AppComponent = Template.bind({})