const xhr = new XMLHttpRequest();
const poll__title = document.getElementById('poll__title');
const poll__answers = document.getElementById('poll__answers');

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();

let tempRequest = JSON.parse(xhr.responseText);





