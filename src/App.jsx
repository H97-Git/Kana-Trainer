import React, { useEffect } from "react";
import { ContextMenuTrigger } from "rctx-contextmenu";

import TitleBar from "./components/TitleBar/TitleBar";
import Settings from "./components/Settings/Settings";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Kana from "./components/Kana/Kana";
import Button from "./components/Button/Button";

import * as Game from "./js/game";
import "./css/App.css";

const mousetrap = window.require("mousetrap");

var score = 0;
var totalQuestions = 0;
var validQuestions = 0;

export default function App() {
    useEffect(() => {
        Game.Load();

        let btnA = document.getElementById("btnA"),
            btnB = document.getElementById("btnB"),
            btnC = document.getElementById("btnC"),
            btnD = document.getElementById("btnD"),
            modal = document.getElementById("settings"),
            btnSettings = document.getElementById("btnSettings");

        btnA.addEventListener("click", (event) => updateScore(event));
        btnB.addEventListener("click", (event) => updateScore(event));
        btnC.addEventListener("click", (event) => updateScore(event));
        btnD.addEventListener("click", (event) => updateScore(event));
        btnSettings.addEventListener("click", showModal);

        mousetrap.bind("up", () => btnA.click());
        mousetrap.bind("down", () => btnB.click());
        mousetrap.bind("left", () => btnC.click());
        mousetrap.bind("right", () => btnD.click());

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    function updateScore(event) {
        let kana = document.querySelector("#Kana");
        totalQuestions++;
        if (event.target.classList[2] === "win") {
            validQuestions++;
            kana.classList.add("win");
        } else {
            kana.classList.add("lose");
            event.target.classList.add("show");
            document.querySelector(".flat-button.win").classList.add("show");
        }
        score = Math.round((validQuestions / totalQuestions) * 100);
        setTimeout(() => {
            document.querySelector(
                ".title"
            ).textContent = `Kana Trainer | Score : ${validQuestions}/${totalQuestions} | ${score}%`;
            kana.classList.remove("win");
            kana.classList.remove("lose");
            event.target.classList.remove("show");
            document.querySelector(".flat-button.win").classList.remove("show");
            Game.Load();
        }, 350);
    }

    function showModal() {
        document.getElementById("settings").style.display = "block";
    }

    return (
        <div className='App'>
            <div className='window-draggable'></div>
            <TitleBar />
            <div className='main'>
                <ContextMenuTrigger id='context-menu'>
                    <div>
                        <i id='btnSettings' className='material-icons'>
                            settings
                        </i>
                    </div>
                    <Kana />
                    <div className='answers'>
                        <Button id='btnA' hotkey='up' />
                        <Button id='btnB' hotkey='down' />
                        <Button id='btnC' hotkey='left' />
                        <Button id='btnD' hotkey='right' />
                    </div>
                </ContextMenuTrigger>
                <Settings />
            </div>
            <ContextMenu />
        </div>
    );
}
