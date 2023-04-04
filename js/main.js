import {addTask} from './data.js';
export {todoArr};

let todoArr = [ 
  //{name: 'create a new practice task', status: STATUSES.IN_PROGRESS, priority: PRIORIRTIES.HIGH, timeStart: '00:00:00', timeFinish: '00:02:00', timeLead: '2', id: 0}, 
  /*{name: 'create a new practice task №2', status: STATUSES.IN_PROGRESS, priority: PRIORIRTIES.HIGH},*/ 
  //{name: 'make a bed', status: STATUSES.DONE, priority: PRIORIRTIES.HIGH, timeStart: '00:00:00', timeFinish: '00:02:00', timeLead: '2', id: 1}, 
  /*{name: 'make a bed2', status: STATUSES.DONE, priority: PRIORIRTIES.LOW},*/
];

//кнопка добавления задачи для любого приоритета (две кнопки на странице)
const btnAdd = document.querySelectorAll(".btn");

//слушаем нажатие одной из двух (пока из двух) кнопок в форме ввода задачи и вызываем функцию добавления задачи в случае нажатия кнопки
btnAdd.forEach(btnAdd => {
	btnAdd.addEventListener("click", addTask);
});








