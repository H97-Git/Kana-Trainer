import React from "react";

import "../../css/TitleBar.css";

const IpcRenderer = window.require("electron").ipcRenderer;
const { remote } = window.require("electron");
const currentWindow = remote.getCurrentWindow();

export default function TitleBar() {
    //const [isMaximized, setIsMaximized] = useState(currentWindow.isMaximized())

    function handleMinimize() {
        currentWindow.minimize();
    }

    // function handleMaximize() {
    //     if (!isMaximized) {
    //         currentWindow.maximize()
    //         setIsMaximized(true)
    //     } else {
    //         currentWindow.unmaximize()
    //         setIsMaximized(false)
    //     }
    // }

    function handleClose() {
        IpcRenderer.send("quit");
    }

    return (
        <div id='title-bar' className='title-bar'>
            {/* Logo */}
            <div className='fa-container logo'></div>
            {/* Title */}
            <span className='title'>Kana Trainer</span>
            {/* Window Controls Buttons */}
            <div className='window-controls'>
                {/* Minimize */}
                <button
                    className='window-control window-minimize'
                    onClick={() => handleMinimize()}>
                    <svg
                        aria-hidden='true'
                        version='1.1'
                        width='10'
                        height='10'>
                        <path d='M 0,5 10,5 10,6 0,6 Z'></path>
                    </svg>
                </button>
                {/* Maximize */}
                {/* <button
                    className="window-control window-maximize"
                    onClick={() => handleMaximize()}>
                    <svg aria-hidden="true" version="1.1" width="10" height="10">
                        <path d="M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"></path>
                    </svg>
                </button> */}
                {/* Close */}
                <button
                    className='window-control window-close'
                    onClick={() => handleClose()}>
                    <svg
                        aria-hidden='true'
                        version='1.1'
                        width='10'
                        height='10'>
                        <path d='M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z'></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
