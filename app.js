const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')


let wordle
let wor
let dayWord
let x = 0;


const getWordle = () => {
    fetch('https://squirreldle.onrender.com/word')
        .then(response => response.json())
        .then(json => {
            dayWord = json.toUpperCase()
            showMessage('Correst word was ' + dayWord)
            localStorage.setItem("wor", dayWord)
            showMessage('Correst word was ' + localStorage.getItem("wor"))
            wordle = localStorage.getItem("wor")
        })
    
        .catch(err => console.log(err))
}
//localStorage.clear();


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


// some function which should run once a day
function runOncePerDay() {
    if (!hasOneDayPassed()) return false;

    // your code below
    getWordle()
    alert('Good morning!');

}

runOncePerDay(); // run the code



wordle = localStorage.getItem("wor")

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
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow,guessRowIndex) => {
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
    if (currentTile < 5 && currentRow < 8) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log('guessRows',guessRows)
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
                        return
                    } else {
                        if (currentRow >= 7) {
                            isGameOver = true
                            showMessage('GAME OVER')
                            showMessage('Correst word was ' + wordle)
                            return
                        }
                        if (currentRow < 7) {
                            currentRow++
                            currentTile = 0
                           
                        }
                    }
                }
            }).catch(err => console.log(err))
        x=0
    }
}

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
