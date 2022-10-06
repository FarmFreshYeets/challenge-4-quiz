// Grab all of the necessary IDs and whatnot from the html
var openHighscores = document.querySelector('#view-high-scores')
var timer = document.querySelector('h2')
var quizBox = document.querySelector('#quiz')
var score = document.querySelector('#score')
var highscoreScreen = document.querySelector('#highscore-screen')
var quizScreen = document.querySelector('#quiz-screen')
var backToQuiz = document.querySelector('#back-to-quiz')
var clearScores = document.querySelector('#clear-scores')
highscoreScreen.hidden = true // add highscore screen
quizScreen.hidden = false
 
 
// Create button for starting the game
var startButton = document.createElement('button')
startButton.innerHTML = 'Start Quiz'
quizBox.appendChild(startButton)
 
var secondsLeft = 15
var scoreCounter = 0
 
// Array of questions that will display on the quiz screen
var questions = ['What is an easy way to make a reusable block of code?', 'What is the type of the following value: 2', 'What is the type of the following value: "3"', 'What is the type of the following value: true', 'What is the type of a variable that hasn\'t been given a value yet?', 'Which syntax is correct for declaring a variable?', 'What does DOM stand for?', 'Which turns and object into a string that we can store?', 'Which turns a stringified object into an actual object?']
var answers = ['Functions, Strings, For Loops, Arrays', 'Number, String, Boolean, Null', 'String, Number, Boolean, Null', 'Boolean, Number, String, Null', 'Null, Number, String, Boolean', 'var name = value, name var = value, name = value, var = value', 'Document Object Model, Disco On Mars, Direct Object Model, Donuts Of Mystery', 'JSON.stringify, JSON.parse, object.stringify, object.parse', 'JSON.stringify, JSON.parse, object.stringify, object.parse']
 
// randomly choose a question and its correspong answer list and display it as multiple choice buttons
function displayQuiz() {
    var randomQuestion = Math.floor(Math.random() * questions.length)
    var answerList = document.createElement('ol')
    for (i = 0; i < answers[randomQuestion].split(', ').length; i++) {
        var item = document.createElement('li')
        var itemBtn = document.createElement('button')
        // The first words in the array are correct, so they are given an attribute to match.
        if (i == 0) {
            itemBtn.setAttribute('isCorrect', 'true')
        } else {
            itemBtn.setAttribute('isCorrect', 'false')
        }
        // append the button to the list item and then append the list item to the ordere list
        item.append(itemBtn)
        itemBtn.textContent = answers[randomQuestion].split(', ')[i]
        answerList.appendChild(item)
        // when the answer's button is clicked, run the checkAnswer function
        itemBtn.addEventListener('click', checkAnswer)
    }
    // sets the random question to the h1 element's text content
    quizBox.querySelector('h1').textContent = questions[randomQuestion]
    if (quizBox.querySelector('ol') != null) {
        quizBox.querySelector('ol').remove()
    }
    quizBox.append(answerList)
    score.textContent = 'Score:' + scoreCounter
}
 
// checks the isCorrect attribute of the answer, displays 'Correct' or 'Wrong' and then runs the displayQuiz function
function checkAnswer(event) {
    var evaluation = event.target.getAttribute('isCorrect')
    if (evaluation == 'true') {
        scoreCounter++
        displayQuiz()
        if (quizBox.querySelector('p') != null) {
            quizBox.querySelector('p').remove()
        }
        var response = document.createElement('p')
        response.innerHTML = 'Correct'
        quizBox.appendChild(response)
    } else {
        secondsLeft--
        displayQuiz()
        if (quizBox.querySelector('p') != null) {
            quizBox.querySelector('p').remove()
        }
        var response = document.createElement('p')
        response.innerHTML = 'Wrong'
        quizBox.appendChild(response)
    }
}
 
// Displays everything that should be visible during the quiz time
function startQuiz() {
    var startTimer = setInterval(function () {
        secondsLeft--
       
        if (secondsLeft <= 0) {
            clearInterval(startTimer)
            secondsLeft = 0
            quizBox.textContent = 'game over' // Make an end game screen
        }
 
        timer.textContent = 'Time: ' + secondsLeft
    }, 1000)
 
    displayQuiz()
    quizBox.querySelector('button').hidden = true
}
 
function switchScreens() {
    highscoreScreen.hidden = !highscoreScreen.hidden
    quizBox.hidden = !quizBox.hidden
}
 
startButton.addEventListener('click', startQuiz)
openHighscores.addEventListener('click', switchScreens)
backToQuiz.addEventListener('click', switchScreens)