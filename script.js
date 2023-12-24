const startGameButton = document.querySelector(".start-quiz")
const nextQuestionButton = document.querySelector(".next-question")
const questionsContainer = document.querySelector(".questions-container")
const questionText = document.querySelector(".question")
const answersContainer = document.querySelector(".answers-container")
const answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

startGameButton.addEventListener("click", startGame)
nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  startGameButton.classList.add("hide")
  questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()

  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while(answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })

  nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)

  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente,você é um verdadeiro fã da marvel :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "No início do filme, qual é o primeiro dinossauro que aparece no filme?",
    answers: [
      { text: "t-rex", correct: false },
      { text: "giguanossauro", correct: false },
      { text: "nasutoceratops", correct: true },
      { text: "parassaurrolofo", correct: false }
    ]
  },
  {
    question: "Como é o nome do filhote da Blue?",
    answers: [
      { text: "beta", correct: true },
      { text: "bete", correct: false },
      { text: "billy", correct: false },
      { text: "biti", correct: false }
    ]
  },
  {
    question: 'Qual foi o dinossaro mais rapido?',
    answers: [
      { text: 'Compsognathu', correct: true },
      { text: 'Aachenosaurus', correct: false },
      { text: 'Abrictosaurus.', correct: false },
      { text: "Aardonyx", correct: false }
    ]
  },
  {
    question: 'o anquilossauro é o dinossauro mais lento?',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Qual foi o primeiro dinossauro exitente?',
    answers: [
      { text: 't-rex', correct: false },
      { text: 'Megalosaurus bucklandii', correct: true },
      { text: 'tiranosssauro', correct: false },
      { text: 'dragão', correct: false }
    ]
  },
  {
    question: 'quantos filmes de jurasck parque existem?',
    answers: [
      { text: '6', correct: false },
      { text: '5', correct: true },
      { text: '4', correct: false },
      { text: '7', correct: false }
    ]
  },
  {
    question: 'qual o persnagem principal de jurassic world?',
    answers: [
      { text: 'Barry', correct: false },
      { text: 'Henry Wu', correct: false },
      { text: 'Claire Dearing', correct: false },
      { text: 'Owen Grady', correct: true },
    ]
  },
]