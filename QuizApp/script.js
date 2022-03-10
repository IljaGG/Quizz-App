let questions = [
    {
        "question": "Wer hat die meisten Punkte in der Geschichte der NBA erzielt?",
        "answer_1": "Kobe Bryant",
        "answer_2": "Kareem Abdul-Jabbar",
        "answer_3": "Karl Malone",
        "answer_4": "Lebron James",
        "right_answer": 2
    },

    {
        "question": "Welcher NBA-Spieler schaffte 100 Punkte in einem Spiel und hat damit den Rekord?",
        "answer_1": "Michael Jordan",
        "answer_2": "Kobe Bryant",
        "answer_3": "Devin Booker",
        "answer_4": "Wilt Chamberlain",
        "right_answer": 4
    },

    {
        "question": "Welcher NBA-Spieler hat die meisten Assists in der Geschichte der NBA?",
        "answer_1": "Magic Johnson",
        "answer_2": "John Stockton",
        "answer_3": "Chris Paul",
        "answer_4": "Jason Kidd",
        "right_answer": 2
    },

    {
        "question": "Zwei NBA-Mannschaften führen die Liga mit bereits 17 NBA-Titles an. Welche sind es?",
        "answer_1": "Los Angeles Lakers und Boston Celtics",
        "answer_2": "Golden State Warriors und Los Angeles Clippers",
        "answer_3": "Chicago Bulls und San Antonio Spurs",
        "answer_4": "Detroit Pistons und Philaderphia 76ers",
        "right_answer": 1
    },

    {
        "question": "Wieviele Mannschaften gibt es in der NBA?",
        "answer_1": "15",
        "answer_2": "30",
        "answer_3": "35",
        "answer_4": "26",
        "right_answer": 2
    },

    {
        "question": "Wie heißt die einzige kanadische Mannschaft in der NBA?",
        "answer_1": "Vancouver Grizzlies",
        "answer_2": "Montreal Alliance",
        "answer_3": "Ottawa BlackJacks",
        "answer_4": "Toronto Raptors",
        "right_answer": 4
    }
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('sound/right.mp3');
let AUDIO_FAIL = new Audio('sound/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }

}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('questionbody').style = 'display: none;';
    document.getElementById('all-questions-end').innerHTML = questions.length;
    document.getElementById('amount-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-img').src = 'img/cup.png';
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success')
        AUDIO_FAIL.play();
    };
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-img').src = 'img/quiz.jpg';
    document.getElementById('endscreen').style = 'display: none;';
    document.getElementById('questionbody').style = '';

    rightQuestions = 0;
    currentQuestion = 0;
    init();
}