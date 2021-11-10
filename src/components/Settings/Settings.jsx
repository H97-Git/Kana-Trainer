import React, { useEffect } from "react";

import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";

import * as Game from "../../js/game.js";
import "../../css/Settings.css";

const config = require("../../js/config");

export default function Settings() {
    const isHChecked = config.get("Hiragana");
    const isKChecked = config.get("Katakana");

    useEffect(() => {
        let btn1 = document.getElementById("25"),
            btn25 = document.getElementById("50"),
            btn75 = document.getElementById("75"),
            btn100 = document.getElementById("100"),
            hiraganaS = document.getElementById("hiragana-switcher"),
            katakanaS = document.getElementById("katakana-switcher");

        btn1.textContent = "25%";
        btn25.textContent = "50%";
        btn75.textContent = "75%";
        btn100.textContent = "100%";

        btn1.addEventListener("click", (event) => changeOpacity(event));
        btn25.addEventListener("click", (event) => changeOpacity(event));
        btn75.addEventListener("click", (event) => changeOpacity(event));
        btn100.addEventListener("click", (event) => changeOpacity(event));

        hiraganaS.addEventListener("click", (event) => changeMode(event));
        katakanaS.addEventListener("click", (event) => changeMode(event));
    });

    function changeOpacity(event) {
        let main = document.querySelector(".main");
        main.style.opacity = event.target.id / 100;
    }

    function changeMode(event) {
        if (event.target.id.includes("hiragana")) {
            config.set("Hiragana", event.target.checked);
            if (!config.get("Hiragana") && !config.get("Katakana")) {
                config.set("Katakana", true);
                document.getElementById("katakana-switcher").click();
            }
        } else {
            config.set("Katakana", event.target.checked);
            if (!config.get("Hiragana") && !config.get("Katakana")) {
                config.set("Hiragana", true);
                document.getElementById("hiragana-switcher").click();
            }
        }
        Game.Load();
    }

    return (
        <div id='settings' className='modal'>
            <div className='modal-content'>
                <label className='opacity-label' htmlFor='opacity'>
                    Opacity :{" "}
                </label>
                <div id='opacity' className='opacity'>
                    <Button id='25' />
                    <Button id='50' />
                    <Button id='75' />
                    <Button id='100' />
                </div>
                <div className='mode'>
                    <label htmlFor='hiragana-switcher'>
                        Hiragana (ひらがな) :{" "}
                    </label>
                    <Checkbox id='hiragana-switcher' checked={isHChecked} />
                    <label htmlFor='katakana-switcher'>
                        Katakana (カタカナ) :{" "}
                    </label>
                    <Checkbox id='katakana-switcher' checked={isKChecked} />
                </div>
                {/* <div className="flaticon">Icons made from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
            </div>
        </div>
    );
}
