/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000 * seconds);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  const townLink = `https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json`;
  return new Promise((resolve) => {
    let towns;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', townLink, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();
    xhr.addEventListener('load', () => {
      towns = JSON.parse(xhr.responseText);
      towns.sort((first, second) => (first.name <= second.name ? -1 : 1));
      resolve(towns);
    });
  });
}

export { delayPromise, loadAndSortTowns };
