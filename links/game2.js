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
        question: "五",
        choice1: "1",
        choice2: "3",
        choice3: "5",
        choice4: "4",
        answer: 3
    },
    {
        question: "日",
        choice1: "dia",
        choice2: "noite",
        choice3: "tarde",
        choice4: "manhã",
        answer: 1
    },
    {
        question: "今",
        choice1: "depois",
        choice2: "agora",
        choice3: "semana",
        choice4: "mês",
        answer: 2
    },
    {
        question: "時",
        choice1: "hora",
        choice2: "semana",
        choice3: "eu",
        choice4: "noite",
        answer: 1
    },
    {
        question: "学",
        choice1: "árvore",
        choice2: "água",
        choice3: "semana",
        choice4: "estudar",
        answer: 4
    },
    {
        question: "週",
        choice1: "dia",
        choice2: "quatro",
        choice3: "semana",
        choice4: "hora",
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