/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 http://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  const townLink =
    'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

  return fetch(townLink)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Не удалось загрузить города');
      }
    })
    .then((towns) => towns.sort((first, second) => (first.name <= second.name ? -1 : 1)));
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

retryButton.addEventListener('click', () => {
  loadingBlock.style.display = 'block';
  getTownData();
});

filterInput.addEventListener('input', function (evt) {
  const sugest = evt.target.value;
  filterResult.innerHTML = '';
  if (sugest.trim() === '') {
    searched = [];
  } else {
    searched = towns.filter((elem) => isMatching(elem.name, sugest));
    if (searched) {
      searched.forEach((elem) => {
        const townElem = document.createElement('div');
        townElem.textContent = elem.name;
        filterResult.append(townElem);
      });
    }
  }
});

let towns = [];
let searched = [];

function getTownData() {
  loadTowns()
    .then((result) => (towns = [...result]))
    .then(() => {
      filterBlock.style.display = 'block';
    })
    .finally(() => {
      loadingBlock.style.display = 'none';
    })
    .catch((error) => {
      loadingFailedBlock.style.display = 'block';
    });
}

getTownData();

export { loadTowns, isMatching };
