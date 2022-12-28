const xhr = new XMLHttpRequest();
const item = document.querySelector('.item');
const items = document.getElementById('items');
const svgIcon = document.getElementById('loader');
let arr = null;
const arrObj = [];

function moneyObj(elem) {

    let valuteObj = document.createElement('div');
    valuteObj.classList.add('item');

    let valuteObj__Code = document.createElement('div');
    valuteObj__Code.classList.add('item__code');
    valuteObj__Code.textContent = elem.CharCode;

    let valuteObj__Value = document.createElement('div');
    valuteObj__Value.classList.add('item__value');
    valuteObj__Value.textContent = elem.Value;

    let valuteObj__Currency = document.createElement('div');
    valuteObj__Currency.classList.add('item__currency');
    valuteObj__Currency.textContent = 'руб.';

    valuteObj.appendChild(valuteObj__Code);
    valuteObj.appendChild(valuteObj__Value);
    valuteObj.appendChild(valuteObj__Currency);

    items.appendChild(valuteObj);
}

xhr.open("GET", 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();
xhr.addEventListener('readystatechange', () => { 
    if(xhr.readyState === 4) {
        svgIcon.classList.remove('loader_active');

        let tempRequest = JSON.parse(xhr.responseText);
        arr = tempRequest.response.Valute;
        for(key in arr) {
            arrObj.push(arr[key]);
        }

        arrObj.forEach(elem => moneyObj(elem));
    }

} );

