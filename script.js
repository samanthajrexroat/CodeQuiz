
var questionArray = [{
    question: "1. Commonly used data types DO NOT include",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{
    question: "2. The condition in an if/else statement is enclosed within ___.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
},
{
    question: "3. Arrays in JavaScript can be used to store ___.",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
},
{
    question: "4. String values must be enclosed within ___ when being assigned to variables. ",
    options: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
},
{
    question: "5. A very useful tool used during development and debugging for printing content to the debugger is ___.",
    options: ["JavaScript", "terminal/bash", "alerts", "console.log" ],
    answer: "console.log"
}
]

var timer = 30;
var score = 0;
var questionIndex = 0;

var startBtn = document.querySelector ("#start-game");
var startPageEl = document.getElementById ("start-page");
var questionPageEl = document.getElementById ("question-page");
var timerText = document.querySelector("#timer")
var questionEl = document.getElementById("question")
var optionsEl = document.getElementById("options");
var scoreEl = document.getElementById("score");
var endPageEl = document.getElementById("end-page");
var initialsEl = document.getElementById("initials");
var submitBtn = document.getElementById("submit-score");
var scoresListEl = document.getElementById("scores-list");

var savedScores = JSON.parse(localStorage.getItem("saveScores")) || [];

timerText.textContent = 30;
scoreEl.textContent = 0;
// Wait for user to start game
startBtn.addEventListener("click", startGame);

function startGame(){
    
    // hide starting section
    startPageEl.setAttribute("class", "hide");
    // show question section
    questionPageEl.setAttribute("class", "show");
    // start game timer
    var gameTimer = setInterval(() => {
        timer--;
        timerText.textContent = timer;

        if (timer <=0 || questionIndex > 4){
            clearInterval(gameTimer);
            gameOver();
        }
    }, 1000);
    
    // render first question
    questionEl.innerText = questionArray[0].question;
    
    optionsEl.innerText = ""

    // creating buttons for all options
    for (var i = 0; i < 4; i++){
        
        var button = document.createElement("button");
        button.innerText = questionArray[0].options[i];
        
        button.classList.add("option");
        optionsEl.appendChild(button);

        // check if answer is correct
        if (questionArray[0].options[i] == questionArray[0].answer){
            button.value = true
        }else{
            button.value = false
        }
        // wait for user to click on an answer
        button.addEventListener("click", function(event) {
            event.stopPropagation();

            checkAnswer(event);
        });
    }
}

// Checks for the 'true' answer and either adds a point
// or takes off five seconds.
function checkAnswer(event){
    console.log(event.target.value);
    if (event.target.value == "true") {
        score++;
        console.log(score);
        scoreEl.innerText = score;
        
    }else{
        timer -= 5
    }

    if (questionIndex <= 5){ 
        nextQuestion();
    }
}

// go through the rest of the questions
function nextQuestion(){
    questionIndex++
    questionEl.innerText = questionArray[questionIndex].question;
   
    optionsEl.innerText = ""

    for (var i = 0; i < 4; i++){
        var button = document.createElement("button");
        button.innerText = questionArray[questionIndex].options[i];
        button.classList.add("option");
        
        if (questionArray[questionIndex].options[i] == questionArray[questionIndex].answer){
            button.value = true 
        }else{
            button.value = false
        }

        optionsEl.appendChild(button);

        button.addEventListener("click", checkAnswer)
    }
}

function gameOver(){
    // hide the question section and show the score section
    questionPageEl.setAttribute("class", "hide");
    endPageEl.setAttribute("class", "show");

    // create a new variable to store initials and score
    var userInits = window.prompt("What are your initials?")
    var userObj = {
        userInits,
        score
    }
    // push the new data into an empty array
    savedScores.push(userObj);

    localStorage.setItem('savedScores', JSON.stringify (savedScores));
    
    alert("Here is your score, " + userInits + "\nScore:" + score);

    startPageEl.setAttribute("class", "show");
    endPageEl.setAttribute("class", "show");
    
    timer = 30;
    score = 0;
    questionIndex = 0;

    renderScores();
}

function renderScores(){
   
    for (let i=0; i < savedScores.length; i++) {
        console.log(savedScores);
        const element = savedScores [i];
        var newLi = document.createElement ("li");
        scoresListEl.appendChild(newLi);
        newLi.textContent = element.userInits + ":  " + element.score;
        
    }
}