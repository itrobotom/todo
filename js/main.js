import * as massModule from './mainMass.js';
//import {showTodo} from './mainMass.js';



massModule.showTodo(massModule.todoArr);
massModule.addTask(massModule.todoArr, 'New task', massModule.PRIORIRTIES.HIGH);
massModule.showTodo(massModule.todoArr);
//найдем кнопку для добавления задачи приоритета HIGH, и именно при нажатии кнопки "+" будет 
let buttonHigh = document.getElementById("add-task-high");
//если в кнопке указать type = "submit" то форма станет ждать нажатия enter и будет отправлять форму с перезагрузкой страницы по умолчанию 

console.log(buttonHigh);
let taskHighList;
let htmlTemplateHighTask = '<li><div class="input-task"><div class="radio-btn"><input type="radio" name="" id=""></div><div class="input-task-text">Поле по умолчанию</div><button class="btn"><img class = "icon-del-task" src="./img/close-icon.svg" alt="close task"></button></div></li>'
//слушаем нажатие кнопки добавления задачи HIGH и при нажатии добавляем шаблон (пока без добавления самого содержимого из input)
/*buttonHigh.addEventListener("click", function(){
  console.log('Кнопка нажата High');
  //найдем список в DOM, где весь перечень задач высокого приоритета
  taskHighList = document.getElementById("task-high-list");
  console.log(taskHighList);

  taskHighList.insertAdjacentHTML("beforeend", htmlTemplateHighTask);
});*/

//по заданию нужно на enter отправить форму, но нужно отменить стандартное действие, иначе страница перезагрузиться и форма исчезнет
//получим по id форму
const formTaskHigh = document.getElementById("add-task-form-input");
//для добавления действия по enter сбросим стандартное поведение при type="submit" element.prevetnDefault
formTaskHigh.addEventListener('submit', function(e) {
  // сбрасываем стандартное поведение функции function(e) (по умолчанию она делает get запрос) и после нажатия на enter форма не сбросится и не перезагрузится
  e.preventDefault();
  //теперь делаем тоже самое, что и при нажатии "+"
  taskHighList = document.getElementById("task-high-list");
  taskHighList.insertAdjacentHTML("beforeend", htmlTemplateHighTask);
  //берем данные из input по name = "highTask" из input
  //console.log(this.highTask.value); 
  //изменяем значение поля (наша задача статуса HIGH) по умолчанию в шаблоне htmlTemplateHighTask
  //сначала ищем последнюю конструкцию (элемент) родителя parent по классу task-high-list
  //именно туда вставляется новая задача
  const parent = document.querySelector('#task-high-list'); //поиск по id через решетку - #task-high-list
  const newTemplate = parent.lastElementChild;
  //console.log(newTemplate);
  console.log(newTemplate.querySelector(".input-task-text").innerHTML); //поиск по классу через точку - .input-task-text
  //записываем из поля input в новую задачу (новый созданный шаблон)
  newTemplate.querySelector(".input-task-text").innerHTML = this.highTask.value; //с помощью .innerHTML получаем содержимое тега, а не весь тег с нужным селектором и содержимым
  massModule.addTask(massModule.todoArr, this.highTask.value, massModule.PRIORIRTIES.HIGH);
  massModule.showTodo(massModule.todoArr);
});
