const xhr = new XMLHttpRequest();
const poll__title = document.getElementById('poll__title');
const poll__answers = document.getElementById('poll__answers');
let tempResp = null; // ответ от сервера
let respAnswers = []; // Массив вариантов ответа
let respTitle = null; // Заголовок вопроса
let respId = null; // Id вопроса 
let staticResp = {}; //Сюда получаем результат со статистикой ответов
const poll__box = document.querySelector('.poll');

let buttons = null;
let clickButtonId = null;


xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

function static () {               //Добавляет результаты статистики в окно popUp
    const popUp__title = document.querySelector('.popUp__title');
    const popUp__statics = document.getElementById('popUP__statics');
    popUp__title.textContent = respTitle;

    for(let i = 0; i < staticResp.length; i++) {
        let answer = document.createElement('div');
        answer.classList.add('answer');
        answer.textContent = `${staticResp.stat[i].answer} : ${staticResp.stat[i].votes}`;
        popUp__statics.appendChild(answer);
    }
}

function work (answers, title) {
    poll__title.textContent = title;

    for(let i = 0; i < answers.length; i++) {
        let button = document.createElement('button');
        button.classList.add('poll__answer');
        button.setAttribute('id', 'poll__answer');
        button.setAttribute('idAnswer', respId);
        button.setAttribute('idButton', i);   //Получаем значение индекса ответа
        button.addEventListener('click', (e)=>{
            console.log('Клик');
            const xhr2 = new XMLHttpRequest();
            console.log('Статус запроса:  ' + xhr2.status + xhr2.statusText);

            xhr2.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
            console.log('Статус запроса:  ' + xhr2.status + xhr2.statusText);

            xhr2.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
            console.log('Статус запроса:  ' + xhr2.status + xhr2.statusText);

            let x = e.target; // Получаем ссылку на кликнутую кнопку
            let y = x.getAttribute('idButton');

            xhr2.send(`vote=${respId}&answer=${y}`); // Отправляем данные на сервер
            alert('Спасибо, Ваш ответ засчитан');
            xhr2.addEventListener('load', ()=> {
                staticResp = JSON.parse(xhr2.responseText);
                console.log(staticResp);
                document.querySelector('.popUp').style.display = 'block';
                static(staticResp);
            });  
        });

        button.textContent = answers[i];

        poll__answers.appendChild(button);
    }
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
    }
});





