const xhr = new XMLHttpRequest();
const poll__title = document.getElementById('poll__title');
const poll__answers = document.getElementById('poll__answers');

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

xhr.addEventListener('readystatechange', ()=> {
    if(xhr.readyState === 4) {
        console.log('Ответ получен!');
        let resp = JSON.parse(xhr.respText);        //По чему сюда не сохраняется ответ?
        let respTitle = resp.data.title;
        let respAnswer = resp.data.answers;
        let respId = resp.data.id;
        
    }
    else {
        console.log('Ошибка загрузки');
    }

});






