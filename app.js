
    const tileDisplay = document.querySelector('.tile-container')
    const keyboard = document.querySelector('.key-container')
    const messageDisplay = document.querySelector('.message-container')


    let wordle
    let wor
    let dayWord
    let x = 0;
    let streak = 0;
    let streakOut;
    let canReset = false;


    wordle = localStorage.getItem("wor")


    function handleReset() {

        if (canReset == true) {
            location.reload();
            canReset = false;
        }

    }

    function streakCounter() {
        if (localStorage.streakcount) {
        
        } else {
            localStorage.streakcount = 0;
        }
    
    }

    document.getElementById("streak").innerHTML = "Your Daily Streak Is : " + localStorage.streakcount;
//document.getElementById("correctAnswer").innerHTML = "Correct answer was : " + wordle;

    const guessRowsEasy = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ]

    const guessRowsHard = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ]

    let guessRows = guessRowsEasy;


    function setEasy() {

        guessRows = guessRowsEasy;
        rowNum = 8;
        closeNav();

    };

    function setHard() {

        guessRows = guessRowsHard;
        rowNum = 5;
        closeNav();

    };

    setEasy


    function openNav() {
        if (localStorage.getItem("Won") == "false") {
            document.getElementById("OpenScreen").style.height = "100%";
        }
        if (localStorage.getItem("Won") == "true") {
            document.getElementById("CloseScreen").style.height = "100%";
        }
    
    }

    function closeNav() {
        document.getElementById("OpenScreen").style.height = "0%";
    }

    openNav()

const getWordle = () => {
        /*
        fetch('https://squirreldle.onrender.com/word')
            .then(response => response.json())
            .then(json => {
                dayWord = json.toUpperCase()
                localStorage.setItem("wor", dayWord)
                console.log("getWordle func run")
            })

            .catch(err => console.log(err))
            */
    localStorage.setItem("wor", "LATEX")
    }

console.log(localStorage.getItem("gamePlayed"))
console.log(localStorage.getItem("Won"))

// checks if one day has passed. 
    function hasOneDayPassed() {
        // get today's date. eg: "7/37/2007"
        var date = new Date().toLocaleDateString();
        //alert(date);
        // if there's a date in localstorage and it's equal to the above:
        // inferring a day has yet to pass since both dates are equal.
        if (localStorage.yourapp_date == date)
            return false;

        // this portion of logic occurs when a day has passed
        localStorage.yourapp_date = date;
        return true;
    }

    function setLastWinDates() {

        let lastDay = new Date().getDate();
        let lastMonth = new Date().getMonth();
        let lastYear = new Date().getFullYear();

            localStorage.setItem("Day", lastDay);
            localStorage.setItem("Month", lastMonth);
            localStorage.setItem("Year", lastYear);

    }


    function checkLastWinDates() {

        //const currentDate = new Date();
        let day = new Date().getDate() -1;
        let month = new Date().getMonth();
        let Year = new Date().getFullYear();

        //let day = currentDate.getDate() - 1;
        //let month = currentDate.getMonth();

        if (day == 0) {
            month = month - 1;
        }
        //let Year = currentDate.getFullYear();

        if (day == 0 && month == -1) {
            Year = Year - 1;
        }

        if (Year.toString() != localStorage.getItem("Year")) {

            localStorage.streakcount = 0;

        } else if (Year.toString() == localStorage.getItem("Year") && day == 0 && month == -1) {
        } else if (month.toString() != localStorage.getItem("Month")) {

            localStorage.streakcount = 0;

        } else if (month.toString() == localStorage.getItem("Month") && day == 0) {
        } else if (day.toString() != localStorage.getItem("Day")) {

            localStorage.streakcount = 0;
        }
    }
   
    function handleStreak() {
        if (localStorage.getItem("gamePlayed") == "false") {
            localStorage.streakcount = 0;


        }

    }

    // some function which should run once a day
    function runOncePerDay() {
        if (!hasOneDayPassed()) return false;

        // your code below
        getWordle();
        localStorage.setItem("Won", "false");
        wordle = localStorage.getItem("wor");
        checkLastWinDates();
        localStorage.setItem("gamePlayed", "false");
        console.log("OnceADay func run");
        canReset = true;


    }

    //localStorage.clear();

    runOncePerDay(); // run the code
    wordle = localStorage.getItem("wor")

    if (localStorage.getItem("gamePlayed") == "false") {
        checkLastWinDates();
    }
    



    const keys = [
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'ENTER',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M',
        '<<',
    ]

    let currentRow = 0
    let currentTile = 0
    let isGameOver = false


    guessRows.forEach((guessRow, guessRowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
        guessRow.forEach((_guess, guessIndex) => {
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
            tileElement.classList.add('tile')
            rowElement.append(tileElement)
        })
        tileDisplay.append(rowElement)
    })

    keys.forEach(key => {
        const buttonElement = document.createElement('button')
        buttonElement.textContent = key
        buttonElement.setAttribute('id', key)
        buttonElement.addEventListener('click', () => handleClick(key))
        keyboard.append(buttonElement)
    })

    const handleClick = (letter) => {
        if (!isGameOver) {
            if (letter === '<<') {
                deleteLetter()
                return
            }
            if (letter === 'ENTER') {
                checkRow()
                return
            }
            addLetter(letter)
        }
    }

    const addLetter = (letter) => {
        if (currentTile < 5 && currentRow < rowNum) {
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
            tile.textContent = letter
            guessRows[currentRow][currentTile] = letter
            tile.setAttribute('data', letter)
            currentTile++
            console.log('guessRows', guessRows)
        }
    }

    const deleteLetter = () => {
        if (currentTile > 0) {
            currentTile--
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
            tile.textContent = ''
            guessRows[currentRow][currentTile] = ''
            tile.setAttribute('data', '')
        }
    }


    const checkRow = () => {
        const guess = guessRows[currentRow].join('')

        if (currentTile > 4) {
            fetch(`https://squirreldle.onrender.com/check/?word=${guess}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    if (json == 'Entry word not found') {
                        showMessage('Invalid Word !')
                        return
                    } else if (x == 0) {
                        x = 1
                        console.log('guess is ' + guess, 'wordle is ' + wordle)
                        flipTile()
                        if (wordle == guess) {
                            showMessage('Excellent!!!')
                            isGameOver = true
                            localStorage.setItem("Won", "true")
                            localStorage.streakcount = Number(localStorage.streakcount) + 1;
                            document.getElementById("isWin").innerHTML = "Congratulation You Won !";
                            document.getElementById("correctAnswer").innerHTML = "Answer Was : " + wordle;
                            document.getElementById("streak").innerHTML = "Your Daily Streak Is : " + localStorage.streakcount;
                            localStorage.setItem("gamePlayed", "true");
                            setLastWinDates();
                            window.setTimeout(openNav, 2500);
                            return
                        } else {
                            if (currentRow >= rowNum - 1) {
                                isGameOver = true
                                localStorage.setItem("Won", "true")
                                localStorage.streakcount = 0;
                                document.getElementById("isWin").innerHTML = "Well You Lose ";
                                document.getElementById("correctAnswer").innerHTML = "Correct Answer Was : " + wordle;
                                document.getElementById("streak").innerHTML = "Your Daily Streak Is : " + localStorage.streakcount;
                                window.setTimeout(openNav, 2500);
                                return
                            }
                            if (currentRow < rowNum - 1) {
                                currentRow++
                                currentTile = 0

                            }
                        }
                    }
                }).catch(err => console.log(err))
            x = 0
        }
    }

    //CountDown Timer

    const showMessage = (message) => {
        const messageElement = document.createElement('p')
        messageElement.textContent = message
        messageDisplay.append(messageElement)
        setTimeout(() => messageDisplay.removeChild(messageElement), 4000)
    }

    const addColorToKey = (keyLetter, color) => {
        const key = document.getElementById(keyLetter)
        key.classList.add(color)
    }

    const flipTile = () => {
        const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
        let checkWordle = wordle
        const guess = []


        rowTiles.forEach(tile => {
            guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
        })

        guess.forEach((guess, index) => {
            if (guess.letter == wordle[index]) {
                guess.color = 'green-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })

        guess.forEach(guess => {
            if ((checkWordle.includes(guess.letter)) && (guess.color != 'green-overlay')) {
                guess.color = 'yellow-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })

        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('flip')
                tile.classList.add(guess[index].color)
                addColorToKey(guess[index].letter, guess[index].color)
            }, 500 * index)
        })
    }

    const Countdown = (() => {

        let nextMidnight = new Date();
        nextMidnight.setHours(24, 0, 0, 0);

        const getRemainingTime = () => {
            let now = new Date();

            let time = (nextMidnight.getTime() - now.getTime()) / 1000;

            if (time < 0) {
                location.reload();
                nextMidnight = new Date();
                nextMidnight.setHours(24, 0, 0, 0);



                return getRemainingTime();
            }

            return time;
        }

        const parseTime = (time) => {
            const hours = Math.floor(time / 3600);
            let rest = time - (hours * 3600);
            const minutes = Math.floor(rest / 60);
            rest = rest - (minutes * 60);
            const seconds = Math.floor(rest);
            const milliseconds = (rest - seconds) * 1000;

            return [hours, minutes, seconds, milliseconds];
        };

        const formatTime = (parsedTime) => {

            if (parsedTime[0] < 10) {
                return '<span class="hours">' + 0 + parsedTime[0] + '</span><span class="hSep">:</span><span class="minutes">' + ("0" + parsedTime[1]).slice(-2) + '</span><span class="mSep">:</span><span class="seconds">' + ("0" + parsedTime[2]).slice(-2) + '</span>';
            } else

            return '<span class="hours">' + parsedTime[0] + '</span><span class="hSep">:</span><span class="minutes">' + ("0" + parsedTime[1]).slice(-2) + '</span><span class="mSep">:</span><span class="seconds">' + ("0" + parsedTime[2]).slice(-2) + '</span>';
        };

        const els = [];
        let timeout;

        return (el) => {
            els.push(el);

            if (!timeout) {

                const refresh = () => {
                    const parsedTime = parseTime(getRemainingTime());
                    const formattedTimes = formatTime(parsedTime);

                    for (let i = 0, iend = els.length; i < iend; i++) {
                        els[i].innerHTML = formattedTimes;
                    }

                    setTimeout(() => {
                        refresh();
                    }, parsedTime[3]);
                };
                refresh();

            }
            else el.innerHTML = formatTime(parseTime(getRemainingTime()));
        };

    })();

    Countdown(document.getElementById('countdown'));

    streakCounter()
    window.setTimeout(handleReset, 500);

    //handleReset();
    //Countdown(document.getElementById('countdown-two'));
