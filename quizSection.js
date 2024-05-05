//a list of questions
const questions = [
    {
        question: "With what block/loop can you make the robot move forever?" ,
        answers: [
            {text: "[If-else] loop", correct: false}, 
            {text: "[Repeat until] loop", correct: false}, 
            {text: "[Wait] loop", correct: false}, 
            {text: "[Forever] loop", correct: true}, 
        ]
    },
    {
        question: "Is it true that you can add several [If-else] and [If-Then] loops in one code? " ,
        answers: [
            {text: "Not true", correct: false}, 
            {text: "True", correct: true}, 

        ]
    },
    {
        question: "How do you make the robot take a break(make a pause)?" ,
        answers: [
            {text: "[If-else] loop", correct: false}, 
            {text: "[Repeat until] loop", correct: false}, 
            {text: "[Wait] loop", correct: true}, 
            {text: "[Forver] loop", correct: false},  
        ]
    },
    {
        question: "Is it true that you can add another block after [forever] blocks?" ,
        answers: [
            {text: "Not true", correct: true}, 
            {text: "True", correct: false}, 
        ]
    },
    {
        question: "Is [Wait until] and [Repeat until] work the same way?" ,
        answers: [
            {text: "No. They are not the same because the movements blocks are placed different.", correct: false}, 
            {text: "Yes. [Wait until] and [Repeat Until] make the robot do a certain action UNTIL a condition is met. ", correct: true}, 
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons"); //This is the damn problem why i got stuck: answerElement instead of answerButton.
const nextButton = document.getElementById("next-button");

// To keep track of the scores and start the questions
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0; //when start the quiz, the question 1
    score = 0;
    nextButton.innerHTML = 'Next'; //display teh next button once you select an asnwer
    showQuestion(); //calling the next question.
}

function showQuestion(){
    resetState();

    //display  the questions:
    let currentQuestion = questions[currentQuestionIndex]; //keep track of the questions: begin with question 1 and continue.
    
    let questionNumber = currentQuestionIndex + 1; //next question, computer will know that the 1st question it's answered

    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question; //replace the text in the HTML to the texts from the list.


    //displat the multiple questions asnwer texts
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //in the button:....
        button.innerHTML = answer.text; //get into the list: the answer element
        button.classList.add("btn");
        answerButton.appendChild(button); //Thios is to append a child element to an existing parent element
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){ //this function it's to remove the asnwers 1 answer 2 ... from the html
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){ //the amount of questions I have.
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
