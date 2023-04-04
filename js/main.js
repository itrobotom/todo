import {STATUSES, PRIORIRTIES} from './consts.js';
import {getFullTime, convertTimeStartFinish, getLeadTime} from './time.js';

let todoArr = [ 
  //{name: 'create a new practice task', status: STATUSES.IN_PROGRESS, priority: PRIORIRTIES.HIGH, timeStart: '00:00:00', timeFinish: '00:02:00', timeLead: '2', id: 0}, 
  /*{name: 'create a new practice task №2', status: STATUSES.IN_PROGRESS, priority: PRIORIRTIES.HIGH},*/ 
  //{name: 'make a bed', status: STATUSES.DONE, priority: PRIORIRTIES.HIGH, timeStart: '00:00:00', timeFinish: '00:02:00', timeLead: '2', id: 1}, 
  /*{name: 'make a bed2', status: STATUSES.DONE, priority: PRIORIRTIES.LOW},*/
];

let countId = 2; //счетчик для уникального id каждой задаче (с 2 т.к. уже было две задачи в html)

//кнопка добавления задачи для любого приоритета (две кнопки на странице)
const btnAdd = document.querySelectorAll(".btn");

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
    if(todoArr.find(element => element.name === inputHigh)){
      alert('Такая задача уже есть!');
    } else {
      const newTaskObj = new CreateTask(inputHigh, PRIORIRTIES.HIGH, countId);
      console.log(`Добавлена новая задача: ${newTaskObj}`);
      todoArr.push(newTaskObj);
      console.log(`Массив с задачами: ${todoArr}`);
    }

  } else if (inputLow){
    console.log('Добавляем новую задачу LOW в массив!');
    const newTaskObj = new CreateTask(inputLow, PRIORIRTIES.LOW, countId);
    todoArr.push(newTaskObj);
    console.log(todoArr);
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
  this.status = STATUSES.IN_PROGRESS;
  this.priority = priority;
  this.timeStart = getFullTime();
  this.timeFinish = 'inProgress';
  this.timeLead = 'inProgress';
  this.id = idTask;
}

//функция для обновления задач на странице 
//ДОБАВИТЬ АРГУМЕНТ СТАТУСА, ДЛЯ КАКОГО СТАТУСА МЫ ВЫЗЫВАЕМ ЭТУ ФУНКЦИЮ
//ИЛИ ГДЕ ЛУЧШЕ УЧИТЫВАТЬ ДОБАВЛЕНИ
function render() {
  clearDom();

  //ОБЕРНУТЬ В ФУНКЦИЮ ДОБАВЛЕНИЕ ЗАДАЧИ ИЗ МАССИВА В DOM ДЕРЕВО с проверкой добавляемого статуса и отрисовкой цвета
  //далее берем актуальные задачи из массива и в зависимости от приоритета добавляем в нужные позиции
  todoArr.forEach(function(elem){
    //!!!сделать вызывать сразу функцию с приоритетом, тогда не прийдется проверять if
    if(elem.priority === PRIORIRTIES.HIGH){
      createElement('taskHighList', elem);
      
      
    } 
    else if(elem.priority === PRIORIRTIES.LOW){
      createElement('taskLowList', elem);
    } 
  });
}

//функция удаления ЗАДАЧИ из массива по id
function deleteTaskFromArr(arr, idTask){
  //проверять, есть ли такая задача не надо, т.к. уже нашли ее id, а если он есть, значит есть и задача для удаления
  let delTaskConsole = arr.splice(arr.findIndex(element => element.id == idTask), 1);
  render();  
}

function changeStatusSetTime(arr, idTask, stat) {
  arr.findIndex(function(element) {
    if(element.id === idTask) {
      if(stat === STATUSES.IN_PROGRESS) {
        element.status = STATUSES.DONE;
        element.timeFinish = getFullTime(); //записываем в element.timeFinish время, вызывая функцию получения времени завершения задачи
        element.timeLead = getLeadTime(element.timeStart, element.timeFinish); //записываем в element.timeLead, вызывая функцию расчета времени выполенения задачи
      } else {
        element.status = STATUSES.IN_PROGRESS;
        element.timeFinish = 'inProgress'; 
        element.timeLead = 'inProgress';
      }
    }
  });
  render();  
}

function createElement(prioryty, elem) { //приоритет и объект с задачей
  let parent = document.querySelector(`#${prioryty}`); //в зависимости от приоритета найдем нужный родитель, куда вставим задачу
  const newLi = document.createElement('li');
  newLi.setAttribute("id", elem.id); //установим элементу списка свой уникальный id
  parent.appendChild(newLi);
  //*
  const newDivInputTask = document.createElement('div');
  newDivInputTask.className = 'input-task';
  newLi.appendChild(newDivInputTask);
  //*
  const newDivRadioBtn = document.createElement('div');
  newDivRadioBtn.className = 'radio-btn';
  newDivInputTask.appendChild(newDivRadioBtn);
  //*
  const newInputRadioBtn = document.createElement('input');
  newInputRadioBtn.className = 'task-checkbox-input';
  newInputRadioBtn.type = 'checkbox';
  //установик флажок у задачи согласно статусу
  elem.status === STATUSES.IN_PROGRESS ? newInputRadioBtn.checked = false : newInputRadioBtn.checked = true;
  newDivRadioBtn.appendChild(newInputRadioBtn);

  //создаем и наполняем большой узел с содержанием задачи и временем
  const newDivInputTaskText = document.createElement('div');
  newDivInputTaskText.className = 'input-task-text';
  newDivInputTask.appendChild(newDivInputTaskText);

  const newDivTask = document.createElement('div');
  newDivTask.textContent = elem.name; //вставим задачу, набранную в input
  newDivInputTaskText.appendChild(newDivTask);
  //*
  const newDivInputTimeTask = document.createElement('div');
  newDivInputTimeTask.className = 'input-time-task';
  newDivInputTaskText.appendChild(newDivInputTimeTask);
  //Время начала задания
  const newDivStartTime = document.createElement('div');
  newDivStartTime.textContent = 'Start: ';
  newDivInputTimeTask.appendChild(newDivStartTime);
  //*
  const newSpanStartTime = document.createElement('span');
  newSpanStartTime.textContent = convertTimeStartFinish(elem.timeStart); 
  newDivStartTime.appendChild(newSpanStartTime);
  
  //*время окончания задания
  const newDivFinishTime = document.createElement('div');
  newDivFinishTime.textContent = 'Finish: ';
  newDivInputTimeTask.appendChild(newDivFinishTime);
  //*
  const newSpanFinishTime = document.createElement('span');
  newSpanFinishTime.textContent = convertTimeStartFinish(elem.timeFinish); 
  newDivFinishTime.appendChild(newSpanFinishTime);
  //время выполенения задания
  const newDivLeadTime = document.createElement('div');
  newDivLeadTime.textContent = 'Time lead: ';
  newDivInputTimeTask.appendChild(newDivLeadTime);
  //*
  const newSpanLeadTime = document.createElement('span');
  newSpanLeadTime.textContent = elem.timeLead; 
  newDivLeadTime.appendChild(newSpanLeadTime);

  //добавим кнопку удаления задачи
  //создали объект div
  const newDivRadioBtnClose = document.createElement('div');
  newDivRadioBtnClose.className = 'radio-btn';
  newDivInputTask.appendChild(newDivRadioBtnClose);
  //создали объект button
  const newBtnDel = document.createElement('button');
  newBtnDel.className = 'btn';
  newDivRadioBtnClose.appendChild(newBtnDel);
  //создали картинку значка закрытия
  const newImgDel = document.createElement('img');
  newImgDel.className = 'icon-del-task';
  newImgDel.src = './img/close-icon.svg';
  newImgDel.alt = 'close task'; 
  newBtnDel.appendChild(newImgDel);
  
  //слушаем кнопку удаления только тогда, когда отрисовали задачу!!!
  //найдем сначала задачу по id а затем и кнопку для удаления задачи
  const idTask = elem.id;
  const elemChange = document.getElementById(idTask); //находим по id конкретный элемент
  const buttonDel = elemChange.querySelector(".btn"); //в нем находим кнопку
  
  //слушаем нажатие кнопки для удаления задачи
  buttonDel.addEventListener("click", function(){
    deleteTaskFromArr(todoArr, idTask);
  });
      
  //слушаем чекбокс задачи (задачу elemChange по id мы нашли выше)
  const stat = elem.status; //считываем текущий статус задачи
  const checkbox = elemChange.querySelector(".task-checkbox-input");
  checkbox.addEventListener("click", function() {
    changeStatusSetTime(todoArr, idTask, stat);
  }); 
  
  //!!!!!!!
  //напсать функцию, которая устанваливает цвет задаче (передаем аргумент status) setColorTask()
  //лучше с классом рабоать? то есть менять класс (оба будут в css), а не отдельно свойство писать
  if (elem.status === STATUSES.IN_PROGRESS){ //зеленый
    newLi.style.background = 'rgba(0, 255, 0, 0.3)';
  } else { //иначе голубой - готов
    newLi.style.background = 'rgba(0, 0, 255, 0.3)';
  }
}

function clearDom() {
  //сначала удаляет все задачи из списка в DOM дереве, для начала найдем списки
  const listHigh = document.getElementById('taskHighList');
  const listLow = document.getElementById('taskLowList');
  //console.log(`Первый дочерний элемент: ${elementsDel.firstChild}`);
  //пока есть хоть один (первый) дочерный элемент удалаем его в обоих списках
  while (listHigh.firstChild) {
    listHigh.removeChild(listHigh.firstChild);
  }
  while (listLow.firstChild) {
    listLow.removeChild(listLow.firstChild);
  }
}
