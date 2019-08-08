let questionNumber = 0;
let score = 0;

function startQuiz() {
    $(".quizStart").on("click", ".startButton", function(event){
        $(".quizStart").remove();
        $(".questionNumber").text(1);
        renderQuestion();
        answerCorrectOrNot();
        nextQuestion();
    });
}

function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
        <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span class="answers">${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span class="answers">${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span class="answers">${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span class="answers">${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        renderResults();
        restartQuiz();
        $('.questionNumber').text(10)
      }
}

function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
}

function renderResults() {
    $('.questionAnswerForm').html(`<div class="results correctFeedBack"><h1>Good job finishing the quiz! You've got ${score} out of 10 correct!!</h1><button class="restartButton">Startover!</button></div>`)
}

function restartQuiz() {
    $('main').on('click', '.restartButton', function (event) {
        location.reload();
      });
}

function answerCorrectOrNot() {
    $('form').on('submit', function(event){
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            selected.parent().addClass('correct');
            $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it right! Congratulations!🎆</b></p><button type=button class="nextButton">Next</button></div>`);
            score++;
            $('.score').text(score);
        } else {
            selected.parent().addClass('wrong');
            $('.questionAnswerForm').html(`<div class="correctFeedback"><p><b>You got it wrong</b><br>The correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
          }
    })
}

function nextQuestion() {
    $('main').on("click",'.nextButton', function(event){
        questionNumber++;
        $('.questionNumber').text(questionNumber+1);
        renderQuestion();
        answerCorrectOrNot();
    })
}

function createQuiz() {
    startQuiz();
}

$(createQuiz);