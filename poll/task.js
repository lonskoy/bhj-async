const xhr = new XMLHttpRequest();
const poll__title = document.getElementById('poll__title');
const poll__answers = document.getElementById('poll__answers');
let tempResp = null; // ответ от сервера
let respAnswers = []; // Массив вариантов ответа
let respTitle = null; // Заголовок вопроса
let respId = null; // Id вопроса 

let buttons = null;
let clickButtonId = null;


xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

function work (answers, title) {
    poll__title.textContent = title;

    for(let i = 0; i < answers.length; i++) {
        let button = document.createElement('button');
        button.classList.add('poll__answer');
        button.setAttribute('id', 'poll__answer');
        button.setAttribute('idAnswer', respId);
        button.setAttribute('idButton', i);   //Получаем значение индекса ответа
        button.textContent = answers[i];

        poll__answers.appendChild(button);
    }
}

function allButtons() {
    buttons = document.getElementById('poll__answer');
    buttons.addEventListener('click', (e)=> {
        console.log('Клик');
        const xhr2 = new XMLHttpRequest();
        console.log('Статус запроса:  ' + xhr2.status + xhr2.statusText);

        xhr2.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
        console.log('Статус запроса:  ' + xhr2.status + xhr2.statusText);

        xhr2.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
        console.log('Статус запроса:  ' + xhr2.status + xhr2.statusText);

        let x = e.target; // Получаем ссылку на кликнутую кнопку
        let y = x.getAttribute('idButton');

        xhr2.send( 'vote=respId&answer=y' ); //Как вписать переменные в этот запрос?

        console.log('Статус запроса:  ' + xhr2.status + xhr2.statusText);
        console.log(xhr2.responseText);
    });
}

xhr.addEventListener('load', ()=> {
    if(xhr.status === 200) {
        tempResp = JSON.parse(xhr.responseText);
        console.log(tempResp);
        respAnswers = tempResp.data.answers;
        respTitle = tempResp.data.title;
        respId = tempResp.id;
        console.log(respTitle + '__'+ respAnswers);
        work(respAnswers, respTitle);
        allButtons();
    }
});





