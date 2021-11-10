import * as wanakana from 'wanakana';

const config = require('./config');
const KANA = require('./Kana');

const btnArray = ['btnA', 'btnB', 'btnC', 'btnD'];
var previousKana = '';

export function Load() {
    //* With rndValueArray() create an with 4 randoms kana
    var answerKanaArray = generateAnswersKana(KANA.FULL);
    //* Set the kana on the page
    console.table(answerKanaArray);
    document.getElementById('Kana').textContent = HiraganaKatakana(
        answerKanaArray[0]
    );
    //* Clone array to splice it
    let btnAnswer = [...btnArray];
    //* Index for
    var indexAnswer = 0;
    //* While cloned array isn't empty, loop
    while (btnAnswer.length !== 0) {
        //* With rndValueArray() get a rnd btn
        const rndElement = rndValueArray(btnAnswer);
        //* Remove answer class to avoid duplicate
        document.getElementById(rndElement).classList.remove('lose');
        document.getElementById(rndElement).classList.remove('win');
        //* Set the btn with a kana
        document.getElementById(rndElement).textContent =
            answerKanaArray[indexAnswer];
        //* Add answer class to first in array
        if (indexAnswer === 0) {
            document.getElementById(rndElement).classList.add('win');
        } else {
            document.getElementById(rndElement).classList.add('lose');
        }
        //* Increment array
        indexAnswer++;
        //* Remove a btn from the list(array)
        btnAnswer.splice(btnAnswer.indexOf(rndElement), 1);
    }
}

function HiraganaKatakana(answer) {
    //* Create random number 0 or 1
    let r = Math.floor(Math.random() * 2);
    //* Mode HiragaKatakana
    if (config.get('Hiragana') && config.get('Katakana')) {
        if (r === 0) {
            return wanakana.toHiragana(answer);
        } else {
            return wanakana.toKatakana(answer);
        }
        //* Mode Hiragana only
    } else if (config.get('Hiragana')) {
        return wanakana.toHiragana(answer);
        //* Mode Kanatakana only
    } else if (config.get('Katakana')) {
        return wanakana.toKatakana(answer);
    } else {
        return wanakana.toKatakana(answer);
    }
}

function generateAnswersKana(KanaArray) {
    let answerKanaArray = [
        rndValueArray(KanaArray),
        rndValueArray(KanaArray),
        rndValueArray(KanaArray),
        rndValueArray(KanaArray),
    ];
    let unique = [...new Set(answerKanaArray)];
    //* If answers are not unique OR Answer is the same as the previou
    if (unique.length !== 4 || previousKana === answerKanaArray[0]) {
        //* RE - generateAnswersKana
        return generateAnswersKana(KanaArray);
    }
    previousKana = answerKanaArray[0];
    return unique;
}

function rndValueArray(array) {
    let random = Math.floor(Math.random() * array.length);
    return array[random];
}
