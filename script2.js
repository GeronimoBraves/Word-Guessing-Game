const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
timeText = document.querySelector(".time b"),
imge = document.querySelector(".gimg"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");
currentScore = document.querySelector(".cscore span");

let word, maxGuesses, incorrectLetters = [], correctLetters = [],csc=0;
let images = ["/images/taj.jpg","/images/lotus.jpg","/images/qutub.jpg","/images/redfort.jpg","/images/indiagate.jpg","/images/mahatma.jpeg","/images/ratan.jpg","/images/sachin.png","/images/kalpana_chawla.jpg","/images/mary_kom.jpg"];
let correctWord, timer;
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        else {   
            alert(`Time off! ${correctWord.toUpperCase()} was the correct word and your score is ${csc}`);
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            csc=0;
            randomWord();
        }
    }, 1000);
}

function randomWord() {
    initTimer(30);
    currentScore.innerText = csc;
    var randomIndex = Math.floor(Math.random() * wordList.length)
    let ranItem = wordList[randomIndex];
    word = ranItem.word;
    correctWord = word;
    var randomImage = images[randomIndex];
    imge.src = randomImage;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
    // for (let i = 0; i<word.length;i++) {
    //     if (word[i] == " ") {
    //         html +=`<p style = "font-size:40px; padding-top:3px">-</p>`;
            
    //     }
    //     else {
    //         html += `<input type="text" disabled>`;
    //     }
    //     inputs.innerHTML = html;
    // }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";
    
    setTimeout(() => {
        if(correctLetters.length === word.length) {
            csc+=1;
            if (csc==10) {
                alert(`Congratulations on completing the Level 1! All the best for future levels!! You can either continue guessing or try other levels`);
                return randomWord();    
            }
            else{
                alert(`Congrats! You found the word ${word.toUpperCase()}`);
                return randomWord();
            }
        } else if(maxGuesses < 1) {
            alert(`Game over! You don't have remaining guesses and your final score is ${csc}`);
            csc=0;
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            randomWord();
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());