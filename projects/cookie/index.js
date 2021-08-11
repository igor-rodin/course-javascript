/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies = getBrowserCookies();
let filteredCookies = [];

renderCookieTable(cookies);

function getBrowserCookies() {
  if (document.cookie.length) {
    return document.cookie.split('; ').map((val) => {
      const [name, value] = val.split('=');
      return { name, value };
    });
  }
}

function refreshCookieTable() {
  cookies = getBrowserCookies();
  const filterStr = filterNameInput.value.trim().toLowerCase();
  if (filterStr) {
    filteredCookies = cookies.filter(
      (cookie) =>
        cookie.name.toLowerCase().includes(filterStr) ||
        cookie.value.toLowerCase().includes(filterStr)
    );
    renderCookieTable(filteredCookies);
  } else {
    renderCookieTable(cookies);
  }
}

function createTableRaw(cookie) {
  const rawElem = document.createElement('tr');
  const nameElem = document.createElement('th');
  nameElem.textContent = cookie.name;
  const valElem = document.createElement('th');
  valElem.textContent = cookie.value;
  const delBtnElem = document.createElement('th');
  const delBtn = document.createElement('button');
  delBtn.textContent = '\u274C';
  delBtn.addEventListener('click', (evt) => {
    deleteCookie(cookie.name);
    refreshCookieTable();
  });
  delBtnElem.append(delBtn);

  rawElem.append(nameElem);
  rawElem.append(valElem);
  rawElem.append(delBtnElem);

  return rawElem;
}

function renderCookieTable(cookies) {
  listTable.innerHTML = '';
  if (!cookies) {
    return;
  }
  const fragment = document.createDocumentFragment();

  cookies.forEach((val) => {
    const raw = createTableRaw(val);
    fragment.append(raw);
  });

  listTable.append(fragment);
}

function createCookie(name, value) {
  document.cookie = `${name}=${value}`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires='${new Date().toUTCString()}'`;
}

filterNameInput.addEventListener('input', function (event) {
  refreshCookieTable();
});

addButton.addEventListener('click', () => {
  const cookieName = addNameInput.value.trim();
  const cookieValue = addValueInput.value.trim();
  if (cookieName && cookieValue) {
    createCookie(cookieName, cookieValue);
    refreshCookieTable();
    addNameInput.value = '';
    addValueInput.value = '';
  }
});

listTable.addEventListener('click', (e) => {});
