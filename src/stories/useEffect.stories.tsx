import React, {useEffect, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {UseEffectComponent} from "./UseEffectComponent";

export default {
    title: "useEffect",
    component: UseEffectComponent,
    argsType: {} as ComponentMeta<typeof UseEffectComponent>
}


// 1. useEffect: simpleExample ------------------------------------------------
const Template: ComponentStory<typeof UseEffectComponent> = () => {
    console.log('Start')
    const [num, setNum] = useState(0)

    useEffect(() => {
        console.log('1.This useEffect is for an every render')
    })


    useEffect(() => {
        console.log('2.[]This useEffect is only for the first render')
        localStorage.setItem('key', JSON.stringify(num))
        console.log('Num has been set in LC while the first render')
    },[])

    useEffect(() => {
        console.log('3.[num]This useEffect is for rendering when num was changed')
        document.title = num.toString()
        localStorage.setItem('key', JSON.stringify(num))
        console.log('Num is setting only when num changed')

        const numFromLc =  localStorage.getItem('key')
        numFromLc && console.log('From LocalStorage:',JSON.parse(numFromLc))
    },[num])

    return <div style={{display: "flex", flexDirection: "row", gap:"5px"}}>
        <span>{num}</span>
        <button onClick={() => setNum(num + 1)}>+</button>
    </div>
};

export const SimpleExample = Template.bind({})
SimpleExample.args = {}


// 2. setInterval example (clock) -------------------------------------------------------
const Template1: ComponentStory<typeof UseEffectComponent> = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const clockId = setInterval(() => {
            console.log('setInterval')
            setDate(new Date())
        },1000)

        return () => {
            clearInterval(clockId)
        }
    }, [])

    const getTwoDigitsNumber = (num:number) => num < 10 ? "0" + num  : num

    return <div style={{display: "flex", flexDirection: "row", gap:"1px"}}>
        <span>{getTwoDigitsNumber(date.getHours())}:</span>
        <span>{getTwoDigitsNumber(date.getMinutes())}:</span>
        <span>{getTwoDigitsNumber(date.getSeconds())}</span>
    </div>
};

export const SetTimeoutExample = Template1.bind({})
SetTimeoutExample.args = {}

// 3. Simple text example --------------------------------------------------------------
const Template2: ComponentStory<typeof UseEffectComponent> = () => {
    const [text, setText] = useState('')

    console.log('Start')

    useEffect(() => {
        console.log('useEffect')

        const handler = (e:KeyboardEvent) => {
            console.log(e.key)
            setText(text + e.key)
        }

        window.addEventListener('keypress', handler)

        return () => {
            window.removeEventListener('keypress', handler)
        }
    }, [text])


    return <span>{text}</span>
};

export const KeyDownExample = Template2.bind({})
KeyDownExample.args = {}

// 4. Simple local storage example with saving effect ---------------------------------------------
const Template3: ComponentStory<typeof UseEffectComponent> = () => {
    const [data, setData] = useState(0)

    useEffect(() => {
        const dataFromLC = localStorage.getItem('key')
        if (dataFromLC) {
            setData(JSON.parse(dataFromLC))
        }
    },[])

    useEffect(() => {
        localStorage.setItem('key', JSON.stringify(data))
    }, [data])

    const handler = () => {
        setData(data + 1)
    }
    return <>
        <span>{data}</span>
        <button onClick={handler}>+</button>
    </>
};

export const LocalStorageComponent = Template3.bind({})
