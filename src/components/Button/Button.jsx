import React from "react";
import "../../css/Button.css";

export default function Button(props) {
    var button = <div></div>;
    switch (props.hotkey) {
        case "up":
            button = (
                <div className='answer'>
                    <div id={props.id} className='flat-button up'></div>
                </div>
            );
            break;
        case "down":
            button = (
                <div className='answer'>
                    <div id={props.id} className='flat-button down'></div>
                </div>
            );
            break;
        case "right":
            button = (
                <div className='answer'>
                    <div id={props.id} className='flat-button right'></div>
                </div>
            );
            break;
        case "left":
            button = (
                <div className='answer'>
                    <div id={props.id} className='flat-button left'></div>
                </div>
            );
            break;
        default:
            button = (
                <div id={props.id} className='flat-button'>
                    NaN
                </div>
            );
            break;
    }
    return button;
}
