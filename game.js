const start = $(".start");
const questionContainer = $(".question-container");
const header = $("header");


const question = $("#question");
const choices = $(".choice-text");
const questionCounterText = $("#questionCounter");
const scoreText = $("#Score");
const answer = $(".answerText");



let currentQuestionIndex = 0;
let currentQuestion 
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


//constants 
const CORRECT_BONUS = 2;
const MAX_QUESTION = questions.length;
const MAX_SCORE = 10;

const init = () => {
    start.click(() => {
        header.hide()
        questionContainer.show()
        $("#hud").show();
        currentQuestion = questions[currentQuestionIndex];

        displayQuestion(currentQuestion);
        answerQuestion(currentQuestion);
        next();
        displayScore();
    
        
    })
}
const displayQuestion = (questions) => { 
    const html = questionString(questions)
     questionContainer.html(html);
}

const questionString = (questions) => {
    const {question, choice1, choice2, choice3,choice4} = questions
    return `
    <h3>${question}</h3>
    <form>
        <input required type="radio" id="choice1" name="question" value="choice1">
        <label for="choice1">${choice1}</label><br>
        <input required type="radio" id="choice2" name="question" value="choice2">
        <label for="choice2">${choice2}</label><br>
        <input required type="radio" id="choice3" name="question" value="choice3">
        <label for="choice3">${choice3}</label><br>
        <input required type="radio" id="choice4" name="question" value="choice4">
        <label for="choice4">${choice4}</label><br>
        <button type="submit" class="next">NEXT</button>

    </form>
    `
}

const displayFinal = () => {
    const html = `
    <h1>FINAL</h1>
    <button class="restart">RESTART QUIZ</button>
    `
    questionContainer.html(html);
}

const restart = () => {
    questionContainer.on("click", ".restart",()=>{
        currentQuestionIndex = 0 
        header.show()
        questionContainer.hide()
        $("#hud").hide()
        init();
    })
}

const next = () => {
    questionContainer.on("submit", "form",(e)=> {
        e.preventDefault();        
        if(currentQuestionIndex === questions.length -1){ 
            displayFinal();
            displayScore();
            restart();
        } else {
            currentQuestionIndex++
            currentQuestion = questions[currentQuestionIndex];
            displayQuestion(currentQuestion);
            answerQuestion(currentQuestion);
            displayScore();
        }
    });
}


const answerQuestion = (currentQuestion) => {
    $("form").on("click","input",(e)=>{
       if($(e.currentTarget).val() === currentQuestion.answer){
           $(e.currentTarget).next().after('<p class="correct">Correct</p>')
           score= score + 2
           
       } else {
           console.log("incorrect");
           $(e.currentTarget).next().after(`<p class="incorrect">Incorrect: ${currentQuestion.answerText}</p>`)
       }
            $('input[type="radio"]').attr("disabled", true)
    
    })
}
const displayScore = () =>{
const html = `<div id="hud-item">
<p class="hud-prefix">
    Question
</p>
<h1 class="hud-main-text" id ="questionCounter">
${currentQuestionIndex +1}/${MAX_QUESTION}
</h1>
</div>
<div id="hud-item">
<p class="hud-prefix">
Score
</p>
<h1 class="hud-main-text" id="Score">
${score}/${MAX_SCORE}


</h1>
</div>`
$("#hud").html(html)
}

const loader = () => {
    init();
}

// startGame();
$(loader);
    
