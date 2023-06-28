$(function() {
    var tab = $('#tabs .tabs-items > div');
    tab.hide().filter(':first').show();

    // Клики по фильтрам.
    $('#tabs .tabs-nav a').click(function(){
        tab.hide();
        tab.filter(this.hash).show();
        $('#tabs .tabs-nav a').removeClass('active');
        $(this).addClass('active');
        return false;
    }).filter(':first').click();

    // Клики по якорным ссылкам.
    $('.tabs-target').click(function(){
        $('#tabs .tabs-nav a[href=' + $(this).attr('href')+ ']').click();
    });

    // Открываю вкладки из хеша URL
    if(window.location.hash){
        $('#tabs-nav a[href=' + window.location.hash + ']').click();
        window.scrollTo(0, $("#" . window.location.hash).offset().top);
    }
});

$(document).ready(function() {
    $("a.scroll").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
    //при уменьшении ширины окна
    $('.burger').click(function(){
        $(this).toggleClass('active');
        $('.logo').toggleClass('active');
        $('.menu').slideToggle();
    });
});

let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let userScore = document.getElementById("user-score");
let otvet = document.getElementById("otvet");
let crot = document.getElementById("number");
let questionCount;
let scoreCount = 0;
let count = 3;
let countdown;

//тренажер эмоций

const quizArray = [
    {
        id: "0",
        question: "img9",
        options: ["грустит", "радуется", "обижается", "злится"],
        correct: "обижается",
    },
    {
        id: "1",
        question: "img10",
        options: ["удивляется", "радуется", "злится", "грустит"],
        correct: "удивляется",
    },
    {
        id: "2",
        question: "img11",
        options: ["удивляется", "радуется", "злится", "грустит"],
        correct: "злится",
    },
];

//кнопка далее
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //счетчик вопросов
        questionCount += 1;
        //если вопросов больше нет
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "ещё? <div class='text'>ты прошел пробный тест, приходи в музей!</div>";
        } else {
            //обновление счетчика
            countOfQuestion.innerHTML =
                questionCount + 1 + "/" + quizArray.length + "";

            quizDisplay(questionCount);
            count = 3;
            clearInterval(countdown);
            nextBtn.classList.add("hide");
            crot.classList.add("con"+questionCount);
            var radio = document.querySelector('input[name="qviz"]:checked');
            radio.checked = false;
        }
    })
);


const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });

    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {

    for (let i of quizArray) {

        i.options.sort(() => Math.random() - 0.5);
        let a = i.id;
        const lip = a;

        let div = document.createElement("div");
        div.classList.add("container-mid", "box","cor"+i.id, "hide");

        countOfQuestion.innerHTML = 1 + "/" + quizArray.length + "";

        div.innerHTML += `<div class="left">
        <div class="option-div">
            <input type="radio" name="qviz" id="qviz1${lip}" class="hide" value="${i.options[0]}">
            <label for="qviz1${lip}">${i.options[0]}</label>
        </div>
        <div class="option-div">
            <input type="radio" name="qviz" id="qviz2${lip}" class="hide" value="${i.options[1]}">
            <label for="qviz2${lip}">${i.options[1]}</label>
        </div>
        <div class="option-div">
            <input type="radio" name="qviz" id="qviz3${lip}" class="hide" value="${i.options[2]}">
            <label for="qviz3${lip}">${i.options[2]}</label>
        </div>
        <div class="option-div">
            <input type="radio" name="qviz" id="qviz4${lip}" class="hide" value="${i.options[3]}">
            <label for="qviz4${lip}">${i.options[3]}</label>
        </div>
       </div>
    `;
        quizContainer.appendChild(div);

        let question_DIV = document.createElement("div");
        question_DIV.classList.add("right");
        question_DIV.innerHTML = "<div class='img'><img src='img/"+i.question+".jpeg'></div>";
        div.appendChild(question_DIV);
    }
}

//проверка ответа
function checker(userOption) {
    const fruits = document.querySelectorAll('input[name="qviz"]')
    for (const userOption of fruits) {
        if (userOption.checked) {
            let userSolution = userOption.value;

            let question =
                document.getElementsByClassName("container-mid")[questionCount];
            let options = question.querySelectorAll('input[name="qviz"]');

            if (userSolution === quizArray[questionCount].correct) {
                userOption.classList.add("correct");
                scoreCount++;
            } else {
                userOption.classList.add("incorrect");
                //правильный ответ
                options.forEach((element) => {
                    if (element.value == quizArray[questionCount].correct) {
                        element.classList.add("correct");
                    }
                });
            }

            clearInterval(countdown);

            options.forEach((element) => {
                element.disabled = true;
            });
        }
    }
}
otvet.addEventListener("click", () => {
    checker();
    const fruits = document.querySelectorAll('input[name="qviz"]')
    for (const userOption of fruits) {
        if (userOption.checked) {
            nextBtn.classList.remove("hide");
        }
    }
});
//обновление теста
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 3;
    clearInterval(countdown);
    quizCreator();
    quizDisplay(questionCount);
}


window.onload = () => {
    initial();
    displayContainer.classList.remove("hide");
};
