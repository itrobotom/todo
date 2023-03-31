import * as massModule from './mainMass.js';

let countId = 1; //счетчик для уникального id каждой задаче

//кнопка добавления задачи для любого приоритета (две кнопки на странице)
const btnAdd = document.querySelectorAll(".btn");

let htmlTemplateTask = '<li><div class="input-task"><div class="radio-btn"><input class="task-checkbox-input" type="checkbox"></div><div class="input-task-text">Поле по умолчанию</div><button class="btn"><img class = "icon-del-task" id="del-task-high" src="./img/close-icon.svg" alt="close task"></button></div></li>'

//слушаем нажатие одной из двух (пока из двух) кнопок в форме ввода задачи и вызываем функцию добавления задачи в случае нажатия кнопки
btnAdd.forEach(btnAdd => {
	btnAdd.addEventListener("click", addTask);
});

function addTask(e) {
  e.preventDefault(); //сброс действия по умолчанию для отправки формы чтобы страница не перезагружалась
 
  //проверяем, в каком поле появилось значение (в LOW или HIGH)
  const inputHigh = document.querySelector(".input-high").value;
  const inputLow = document.querySelector(".input-low").value;
  
  if (inputHigh){
    console.log('Добавляем новую задачу HIGH в массив!');
    //ОПТИМИЗИРОВАТЬ И ПРОПИСАТЬ ВЫЗОВ ФУНКЦИИ ПО ДОБАВЛЕНИЮ ЗАДАЧИ НУЖНОГО СТАТУСА
    if(massModule.todoArr.find(element => element.name === inputHigh)){
      alert('Такая задача уже есть!');
    } else {
      const newTaskObj = new CreateTask(inputHigh, massModule.PRIORIRTIES.HIGH, countId);
      console.log(newTaskObj);
      massModule.todoArr.push(newTaskObj);
      console.log(massModule.todoArr);
    }

  } else if (inputLow){
    console.log('Добавляем новую задачу LOW в массив!');
    const newTaskObj = new CreateTask(inputLow, massModule.PRIORIRTIES.LOW, countId);
    massModule.todoArr.push(newTaskObj);
    console.log(massModule.todoArr);
    //const listLow = document.getElementById("task-low-list");
    //listLow.insertAdjacentHTML("beforeend", htmlTemplateTask);
  } else {
    alert('Вы не ввели задачу');
  }
  //чистим поле после ввода задачи
  document.querySelector(".input-high").value = "";
  document.querySelector(".input-low").value = "";
  
  render(); 

  countId += 1; //для добавления уникального id задачам
}

//функция конструктор создания новой задачи
//делает короче всего на одну запись status (она внутри функции задана), тем не менее это снизит вероятность ошибки при написании кода и это только пример
function CreateTask(name, priority, idTask) {
  this.name = name;
  this.status = massModule.STATUSES.IN_PROGRESS;
  this.priority = priority;
  this.id = idTask;
}

//функция для обновления задач на странице 
//ДОБАВИТЬ АРГУМЕНТ СТАТУСА, ДЛЯ КАКОГО СТАТУСА МЫ ВЫЗЫВАЕМ ЭТУ ФУНКЦИЮ
//ИЛИ ГДЕ ЛУЧШЕ УЧИТЫВАТЬ ДОБАВЛЕНИ
function render() {
  //ОБЕРНУТЬ В ФУНКЦИЮ ОТЧИСТКУ DOM ДЕРЕВА
  //сначала удаляет все задачи из списка в DOM дереве, для начала найдем списки
  const listHigh = document.getElementById('task-high-list');
  const listLow = document.getElementById('task-low-list');
  //console.log(`Первый дочерний элемент: ${elementsDel.firstChild}`);
  //пока есть хоть один (первый) дочерный элемент удалаем его в обоих списках
  while (listHigh.firstChild) {
    listHigh.removeChild(listHigh.firstChild);
  }
  while (listLow.firstChild) {
    listLow.removeChild(listLow.firstChild);
  }
  
  //ОБЕРНУТЬ В ФУНКЦИЮ ДОБАВЛЕНИЕ ЗАДАЧИ ИЗ МАССИВА В DOM ДЕРЕВО с проверкой добавляемого статуса и отрисовкой цвета
  //далее берем актуальные задачи из массива и в зависимости от приоритета добавляем в нужные позиции
  massModule.todoArr.forEach(function(elem){
    if(elem.priority === massModule.PRIORIRTIES.HIGH){
      listHigh.insertAdjacentHTML("beforeend", htmlTemplateTask); //добавили шаблон
      //добавим в шаблон введенную задачу
      //последняя конструкция дочерняя отностиельно списка с HIGH зачадачами
      const newTemplate = listHigh.lastElementChild;
      newTemplate.querySelector(".input-task-text").innerHTML = elem.name; //записываем задачу
      //добавим id из массива с задачами нашей таске в DOM
      newTemplate.setAttribute("id", elem.id);
      //установка цвета по статусу
      //если статус DONE, поставить цвет элементу зеленый
      if(elem.status === massModule.STATUSES.IN_PROGRESS){
        newTemplate.style.background = 'green';
      } else { //иначе красный
        newTemplate.style.background = 'blue';
      }
    } 
    else if(elem.priority === massModule.PRIORIRTIES.LOW){
      listLow.insertAdjacentHTML("beforeend", htmlTemplateTask); //добавили шаблон
      const newTemplate = listLow.lastElementChild;
      newTemplate.querySelector(".input-task-text").innerHTML = elem.name; //записываем задачу
      //добавим id из массива с задачами нашей таске в DOM
      newTemplate.setAttribute("id", elem.id);
      //установка цвета по статусу
      //const getElemForChangeColor = newTemplate.querySelector(".input-task-text");
      //если статус DONE, поставить цвет элементу зеленый
      if(elem.status === massModule.STATUSES.IN_PROGRESS){
        newTemplate.style.background = 'green';
      } else { //иначе красный
        newTemplate.style.background = 'blue';
      }
    }

    //слушаем кнопку удаления только тогда, когда отрисовали задачу!!!
    //найдем сначала задачу по id а затем и кнопку для удаления задачи
    const idTask = elem.id;
    const elemChange = document.getElementById(idTask); //находим id конкретного элемента
    const buttonDel = elemChange.querySelector(".btn"); //в нем находим кнопку
    //слушаем нажатие кнопки для удаления задачи
    buttonDel.addEventListener("click", function(){
      deleteTaskFromArr(massModule.todoArr, idTask);
    });
      
    //слушаем чекбокс задачи (задачу elemChange по id мы нашли выше)
    let stat = elem.status; //считываем текущий статус задачи
    let checkbox = elemChange.querySelector(".task-checkbox-input");
    checkbox.addEventListener("click", function() {
      changeStatus(massModule.todoArr, idTask, stat)
    }); 
  });
}

//функция удаления ЗАДАЧИ из массива по id
function deleteTaskFromArr(arr, idTask){
  //проверять, есть ли такая задача не надо, т.к. уже нашли ее id, а если он есть, значит есть и задача для удаления
  let delTaskConsole = arr.splice(arr.findIndex(element => element.id == idTask), 1);
  render();  
}

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
  render();  
}

/*
//функция смены статуса задачи по id с учетом нового статуса newStat
//при однократном нажатии сменяется статус на todo 
//при двукратном нажатии на inProgress
//при трехкратном снова устанавливается статус Done
function changeStatus2(arr, idTask, newStat) {
  arr.findIndex(function(element) {
    if(element.id === idTask) {
      for (let key in element){

      }
      if(stat === massModule.STATUSES.IN_PROGRESS){
        element.status = massModule.STATUSES.DONE;
      } else {
        element.status = massModule.STATUSES.IN_PROGRESS;
      }
    }
  });
  render(massModule.todoArr);  
}
*/