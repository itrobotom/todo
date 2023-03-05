import * as massModule from './mainMass.js';

let countId = 1;

let taskHighList;
let htmlTemplateTask = '<li><div class="input-task"><div class="radio-btn"><input class="task-checkbox-input" type="checkbox"></div><div class="input-task-text">Поле по умолчанию</div><button class="btn"><img class = "icon-del-task" id="del-task-high" src="./img/close-icon.svg" alt="close task"></button></div></li>'

//по заданию нужно на enter отправить форму, но нужно отменить стандартное действие, иначе страница перезагрузиться и форма исчезнет
//получим по id форму
const formTaskHigh = document.getElementById("add-task-form-input");
//для добавления действия по enter сбросим стандартное поведение при type="submit" element.prevetnDefault
formTaskHigh.addEventListener('submit', function(e) {
  // сбрасываем стандартное поведение функции function(e) (по умолчанию она делает get запрос) и после нажатия на enter форма не сбросится и не перезагрузится
  e.preventDefault();

  //добавляем задачу по нажатю на enter из поля
  if (formTaskHigh.highTask.value === ""){
    alert("Поле для добавления задачи пустое");
  } else {
    massModule.addTask(massModule.todoArr, formTaskHigh.highTask.value, massModule.PRIORIRTIES.HIGH, countId);   
  }
  //massModule.showTodo(massModule.todoArr);
  console.log(massModule.todoArr);
 
  render(massModule.todoArr); 

  countId += 1; //для добавления уникального id задачам
});

//функция для обновления задач на странице 
function render(arrTask) {
  let elementsDel = document.getElementById('task-high-list');

  while (elementsDel.firstChild) {
    elementsDel.removeChild(elementsDel.firstChild);
  }

  let arrPrior = massModule.getTodoPriorityId(arrTask, massModule.PRIORIRTIES.HIGH);
  arrPrior.forEach(function(elem) {
    taskHighList = document.getElementById("task-high-list");
    taskHighList.insertAdjacentHTML("beforeend", htmlTemplateTask);

    const parent = document.querySelector('#task-high-list'); //поиск по id через решетку - #task-high-list
    const newTemplate = parent.lastElementChild;
    console.log(newTemplate.querySelector(".input-task-text").innerHTML); //поиск по классу через точку - .input-task-text
    newTemplate.querySelector(".input-task-text").innerHTML = elem.name; //записываем задачу
    newTemplate.setAttribute("id", elem.id);
    console.log(`Задача ${elem.name} с HIGH приоритетом `);
    let getElemForChangeColor = newTemplate.querySelector(".input-task-text");
    if(elem.status === massModule.STATUSES.IN_PROGRESS){
      getElemForChangeColor.style.background = 'green';
    } else { //иначе красный
      getElemForChangeColor.style.background = 'red';
    }
    let idTask = elem.id;
    let elemChange = document.getElementById(idTask);
    let buttonDel = elemChange.querySelector("#del-task-high");
    //слушаем нажатие кнопки для удаления задачи
    buttonDel.addEventListener("click", function(){
      //получим id элемента, где нажали крестик для удаления
      console.log(`id элемента для удаления: ${newTemplate.id}`);
      deleteTaskFromArr(massModule.todoArr, idTask);
    });

    let stat = elem.status; //считываем текущий статус задачи
    let checkbox = elemChange.querySelector(".task-checkbox-input");
    checkbox.addEventListener("click", function() {
      changeStatus(massModule.todoArr, idTask, stat)
    });
  });
  console.log(`Массив элементов ${arrPrior} с приоритетом HIGH`);
}

//функция удаления ЗАДАЧИ из массива по id
function deleteTaskFromArr(arr, idTask){
    //проверять, есть ли такая задача не надо, т.к. уже нашли ее id, а если он есть, значит есть и задача для удаления
    let delTaskConsole = arr.splice(arr.findIndex(element => element.id == idTask), 1);
    console.log(`Задача "${delTaskConsole[0].name}" успешно удалена`);
    render(massModule.todoArr);  
}

//функция смены статуса задачи по id
function changeStatus(arr, idTask, stat) {
  arr.findIndex(function(element) {
    if(element.id === idTask) {
      if(stat === massModule.STATUSES.IN_PROGRESS){
        element.status = massModule.STATUSES.DONE;
      } else {
        element.status = massModule.STATUSES.IN_PROGRESS;
      }
    }
  });
  render(massModule.todoArr);  
}