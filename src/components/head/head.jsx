import './head.css'
import { LeftIcon, RightIcon } from '../icon/icon';
import { useState } from 'react';
export default function Head(props) {
    const [state, setState] = useState(true);
    const { open } = props;
    function changeState() {
        open() // 通知父组件
        setState(!state);
    }
    return (
        <div className="head-main">
            <div onClick={() => changeState()} className="icon">
                {state ? <LeftIcon /> : <RightIcon />}
            </div>
        </div>
    )
}