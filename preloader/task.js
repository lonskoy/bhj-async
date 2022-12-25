const xhr = new XMLHttpRequest();
const item = document.querySelector('.item');
const svgIcon = document.getElementById('loader');

function moneyObj(arr) {

    let valuteObj__Code = document.createElement('div');
    valuteObj__Code.classList.add('item__code');
    valuteObj__Code.textContent = arr.USD.CharCode;

    let valuteObj__Value = document.createElement('div');
    valuteObj__Value.classList.add('item__value');
    valuteObj__Value.textContent = arr.USD.Value;

    let valuteObj__Currency = document.createElement('div');
    valuteObj__Currency.classList.add('item__currency');
    valuteObj__Currency.textContent = 'руб.';

    item.appendChild(valuteObj__Code);
    item.appendChild(valuteObj__Value);
    item.appendChild( valuteObj__Currency);

}

xhr.open("GET", 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.send();
xhr.addEventListener('readystatechange', () => { 
    if(xhr.readyState === 4) {
        svgIcon.classList.remove('loader_active');

        let tempRequest = JSON.parse(xhr.responseText);
        let arr = tempRequest.response.Valute;
        moneyObj(arr);
    }

} );

