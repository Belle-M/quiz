const question = $("#question");
const choices = $(".choice-text");
const questionCounterText = $("#questionCounter");
const scoreText = $("#Score");
const answer = $(".answerText");



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {

question: "You're due for an upgrade on your phone. Your current one still works but you’ve had an eye on a newer version. You decide to…",
choice1: "Get the upgrade… after all, you’ve had the old phone for so long and the new one looks awesome.",
choice2: "Keep the old phone as long as you can -- every month you put off the upgrade, you’re saving money",
choice3: "Sell your old phone and put the extra cash toward the new phone. While you’re at it, you downgrade your data plan to save a few bucks",
choice4: "Ehhh,huh???",
answerText:"Keep the old phone as long as you can -- every month you put off the upgrade, you’re saving money",
answer:2
    
},
    {
question:"It's time to go grocery shopping. Do you:",
choice1: "Who has time to grocery shop? Or to cook? Order in instead!",
choice2: "YOLO",
choice3: "Write a carefully constructed grocery list and price compare different stores",
choice4: "Go to the nearest store with a general idea of what you need...you'll figure it out when you get there",
answerText:"Write a carefully constructed grocery list and price compare different stores",
answer:3
    },

    {
question:"You find the perfect apartment, but the rent is way out of your price range. Do you:",
choice1: "Keep looking, expanding your search to cheaper areas or smaller apartments -- a nice place isn’t worth going broke",
choice2: "Move back in with your parents until your 75 birthday",
choice3: "Look for a roommate to split the bills",
choice4: "Live in your car, no one comes over anyways",
answerText:"Keep looking, expanding your search to cheaper areas or smaller apartments -- a nice place isn’t worth going broke",
answer:1
    },
    {
        question:"Your friends are planning a dinner out but you’re dangerously close to exceeding your budget for the month, do you:",
        choice1: "Arby's we have the MEATS",
        choice2: "Ask a friend if they can pick up your tab — you’ll get them back next time!",
        choice3: "Search for deals on Groupon or Living Social and steer the group to a cheaper restaurant with a great discount available",
        choice4: "What do you mean ‘budget’? If everyone’s going out, I want to be there - I’ll just fill up on bread and order something cheap if I’m short on funds this week…",
        answerText:"Search for deals on Groupon or Living Social and steer the group to a cheaper restaurant with a great discount available",
        answer:3
    },
    {
        question:"Your child is BEGGING for a new toy he saw somewhere, and he’s been a really big help lately. But it’s over $100. You...",
        choice1: "Tell him he’ll have to wait until his birthday or put it on his Christmas list -- let Santa deal with it!",
        choice2: "That's why grandparents exist",
        choice3: "Just put it on the credit card. He’ll love it so much, and he’s only this age once -- it’s worth splurging for even if it’s more than you can afford right now",
        choice4: "Help him count what's in his piggybank and encourage him to save up the rest to buy it for himself…",
        answerText:"Help him count what's in his piggybank and encourage him to save up the rest to buy it for himself…",
        answer:4
    },
    
];

//constants 
const CORRECT_BONUS = 2;
const MAX_QUESTION = 5;
const MAX_SCORE = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTION) {
        $("#end-game").css("display" ,"flex");
        $("#game").hide();
    $("#final-score").text(score+ "/" + MAX_SCORE);
    }
    $(".correct-answer").empty();
    questionCounter++;
    questionCounterText.text(questionCounter + "/" + MAX_QUESTION);

    
    scoreText.text(score+ "/" + MAX_SCORE);


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions [questionIndex];
    question.text(currentQuestion.question);

    // choices is a collection of all the elements on the HTML with the class "choice"
    // index is the index of the element in the collection
    choices.each((index) => {
        // get that specific choice
        const choice = choices[index];

        //populate it with the choice text from the array
        $(choice).text(currentQuestion["choice" + $(choice).data("number")]);
      });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
}
choices.click(e =>{
    if(!acceptingAnswers) return;


    acceptingAnswers = false;
    const selectedChoice = $(e.target);
    const selectedAnswer = selectedChoice.data("number");

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === "correct"){
        incrementScore(CORRECT_BONUS);
        console.log("right");
    }
    else { 

        selectedChoice.siblings(".correct-answer").text(`Sorry/! Wrong answer. The correct answer is ${currentQuestion.answerText}`)
    
        console.log("wrong");
    }
    
    
    selectedChoice.parent().addClass(classToApply);

    setTimeout( () => {
selectedChoice.parent().removeClass(classToApply);
getNewQuestion();
    }, 2600);

});

incrementScore = num => {
    score += num;
    scoreText.text(score + "/" + MAX_SCORE);
};



startGame();
