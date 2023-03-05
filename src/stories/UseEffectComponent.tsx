import React, {useState} from 'react';

export const UseEffectComponent = () => {
    const[num, setNum] = useState(0)

    return  <div style={{display: "flex", flexDirection:"row"}}>
                <span>num</span>
                <button>+</button>
            </div>
};

