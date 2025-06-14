const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

let questions = [];
let currentQuestionIndex = 0;
let selectedOption = null;

async function fetchQuestions() {
  try {
    const response = await fetch("https://gist.githubusercontent.com/sathwika-musku/2834280c05ed3d90cbff81207a506ea1/raw/29df89974adb1af73677a8401d74f95e3d4c5ac5/quiz.json");
    questions = await response.json();
    showQuestion();
  } catch (error) {
    questionEl.textContent = "Failed to load questions.";
    console.error("Error loading quiz:", error);
  }
}

function showQuestion() {
  const current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => {
      selectedOption = option;
      Array.from(optionsEl.children).forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    optionsEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  const current = questions[currentQuestionIndex];
  if (selectedOption === current.answer) {
    alert("Correct!");
  } else {
    alert("wrong! Correct answer: ${answer}");
  }

  currentQuestionIndex++;
  selectedOption = null;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Quiz finished!";
optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

fetchQuestions();