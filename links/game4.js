const question = document.getElementById("question")
const choices = Array.from (document.getElementsByClassName("choice-text"))
const progressText = document.getElementById("progressText")
const scoreText = document.getElementById("score")
const progressBarFull = document.getElementById("progressBarFull")

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = [];

let questions = [

    {
        question: "ウ",
        choice1: "a",
        choice2: "ke",
        choice3: "ni",
        choice4: "u",
        answer: 4
    },
    {
        question: "ソ",
        choice1: "so",
        choice2: "tsu",
        choice3: "mi",
        choice4: "a",
        answer: 1
    },
    {
        question: "ン",
        choice1: "de",
        choice2: "n",
        choice3: "e",
        choice4: "u",
        answer: 2
    },
    {
        question: "ツ",
        choice1: "tsu",
        choice2: "ka",
        choice3: "ke",
        choice4: "wa",
        answer: 1
    },
    {
        question: "ア",
        choice1: "fu",
        choice2: "do",
        choice3: "a",
        choice4: "ke",
        answer: 3
    },
    {
        question: "ニ",
        choice1: "mi",
        choice2: "i",
        choice3: "ni",
        choice4: "ho",
        answer: 3
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
        return startGame()
    }
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

choices.forEach(choice => {
    choice.addEventListener("click",  e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selecAnswer = selectedChoice.dataset["number"]

        // const classToApply = 'incorrect'
        //     if(selecAnswer == currentQuestion.answer){
        //         classToApply = 'correct'
        //     }

        const classToApply = 
            selecAnswer == currentQuestion.answer ? "correct": "incorrect"
       
        if(classToApply == "incorrect"){
            correctAnswer = currentQuestion.answer -1
            choices[correctAnswer].parentElement.classList.add("correct")
            selectedChoice.parentElement.classList.add(classToApply)
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                choices[correctAnswer].parentElement.classList.remove("correct")
                getNewQuestion()
            }, 1760)

        }

        else{
            
            selectedChoice.parentElement.classList.add(classToApply)
            incrementScore(CORRECT_BONUS)
            setTimeout(() => {
                    selectedChoice.parentElement.classList.remove(classToApply)
                    
                    getNewQuestion()
                }, 1760)
        }       
        
    })

})

incrementScore = num => {
    score += num;
    scoreText.innerText = score
}

zeroScore = num =>{
    score = 0
    scoreText.innerText = 0
}


startGame()