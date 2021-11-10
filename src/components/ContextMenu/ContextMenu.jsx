import React from "react";
import { ContextMenu, ContextMenuItem } from "rctx-contextmenu";

import "../../css/ContextMenu.css";
import settingsIcon from "../../img/svg/settings.svg";
import quitIcon from "../../img/svg/quit.svg";

const IpcRenderer = window.require("electron").ipcRenderer;

export default function CM() {
    function showModal() {
        document.getElementById("settings").style.display = "block";
    }
    function quit() {
        IpcRenderer.send("context-menu-quit");
    }
    return (
        <ContextMenu
            id='context-menu'
            appendTo='.main'
            animation='pop'
            hideOnLeave={false}
            preventHideOnScroll={true}
            preventHideOnResize={true}
            className='context-menu'>
            <ContextMenuItem onClick={showModal}>
                <img src={settingsIcon} alt='ico' />
                Settings
            </ContextMenuItem>
            <ContextMenuItem onClick={quit}>
                <img src={quitIcon} alt='ico' />
                Quit
            </ContextMenuItem>
            {/* <Submenu>
          <ContextMenuItem>Menu Item 4</ContextMenuItem>
        </Submenu> */}
        </ContextMenu>
    );
}
