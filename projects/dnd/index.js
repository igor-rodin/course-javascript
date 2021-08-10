/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

homeworkContainer.style.height = '100vh';
const hwContRect = homeworkContainer.getBoundingClientRect();

export function createDiv() {
  const getRandomNumber = (from, to) => from + Math.round(Math.random() * to);

  const box = document.createElement('div');
  box.classList.add('draggable-div');

  const boxWidth = getRandomNumber(10, 0.6 * hwContRect.width);
  const boxHeight = getRandomNumber(10, 0.6 * hwContRect.height);

  box.style.width = `${boxWidth}px`;
  box.style.height = `${boxHeight}px`;
  box.style.left = `${getRandomNumber(0, hwContRect.width - boxWidth)}px`;
  box.style.top = `${getRandomNumber(0, hwContRect.height - boxHeight)}px`;

  box.style.backgroundColor = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
    0,
    255
  )}, ${getRandomNumber(0, 255)})`;
  box.draggable = 'true';

  return box;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

let selectedBox, shiftX, shiftY;

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

homeworkContainer.addEventListener('dragstart', (event) => {
  selectedBox = event.target;
  shiftX = event.clientX - parseInt(selectedBox.style.left);
  shiftY = event.clientY - parseInt(selectedBox.style.top);
});

homeworkContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});

homeworkContainer.addEventListener('drop', (event) => {
  if (selectedBox) {
    event.preventDefault();

    if (event.clientX - shiftX <= 0) {
      selectedBox.style.left = `0px`;
    } else if (
      event.clientX + parseInt(selectedBox.style.width) - shiftX >=
      hwContRect.width
    ) {
      selectedBox.style.left = `${
        hwContRect.width - parseInt(selectedBox.style.width)
      }px`;
    } else {
      selectedBox.style.left = `${event.clientX - shiftX}px`;
    }

    if (event.clientY - shiftY <= 0) {
      selectedBox.style.top = `0px`;
    } else if (
      event.clientY + parseInt(selectedBox.style.height) - shiftY >=
      hwContRect.height
    ) {
      selectedBox.style.top = `${
        hwContRect.height - parseInt(selectedBox.style.height)
      }px`;
    } else {
      selectedBox.style.top = `${event.clientY - shiftY}px`;
    }

    selectedBox = null;
  }
});
