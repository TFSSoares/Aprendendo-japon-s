
var textInput = document.getElementById('main-text-input');
wanakana.bind(textInput, /* options */);




const choices = Array.from (document.getElementsByClassName("choice-text"))
const question = document.getElementById("question")
const progressText = document.getElementById("progressText")
const scoreText = document.getElementById("score")
const progressBarFull = document.getElementById("progressBarFull")
var correctAns = document.getElementById("h3")

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = [];

let questions = [

    {
        question: "一",
        answer: "いち"
    },
    {
        question: "ニ",
        answer:"に" 
    },
    {
        question: "三",
        answer:"さん"
    },
    {
        question: "四",
        answer: "よん"
    },
    {
        question: "六",
        answer: "ろく"
    },
    {
        question: "五",
        answer:"ご"
    },
    {
        question: "七",
        answer:"なな"
    },
    {
        question: "八",
        answer:"はち"
    },
    {
        question: "九",
        answer:"きゅう"
    },
    {
        question: "十",
        answer:"じゅう"
    },

]


const CORRECT_BONUS = 1
const MAX_QUESTIONS = questions.length

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions =[...questions]
    getNewQuestion()
}

getNewQuestion = () =>{

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        zeroScore()
        return startGame()//window.location.assign('end.html')
    }
    correctAns.innerHTML = ""
    questionCounter++;
    progressText.innerText = "Questão " + questionCounter + "/"+ MAX_QUESTIONS
    progressBarFull.style.width = `${((questionCounter/MAX_QUESTIONS)*100)}%`

    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice =>{ 
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice'+number]

    })  

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}


function handle(e){
    var key=e.keyCode || e.which;
    if (key==13 && document.getElementById('main-text-input').value != ''){
        
        if(document.getElementById('main-text-input').value == currentQuestion.answer){
            question.style.backgroundColor = 'green'
            incrementScore(CORRECT_BONUS)
        }
        
        
       else{
        question.style.backgroundColor = 'red'
        correctAns.innerHTML = currentQuestion.answer
        correctAns.style.backgroundColor = 'green'
       }     
       document.getElementById('main-text-input').value = ''
       setTimeout(() => {
        //console.log(document.getElementById('main-text-input').value)
        question.style.backgroundColor = '#ecf5ff'
        
        getNewQuestion() 
        }, 2200)
       
    }
}



zeroScore = num =>{
    score = 0
    scoreText.innerText = 0
}

incrementScore = num => {
    score += num;
    scoreText.innerText = score
}

startGame()

