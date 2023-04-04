export {deleteTaskFromArr, addTask}
import {render} from './dom.js';
import {todoArr} from './main.js';
import {STATUSES, PRIORIRTIES} from './consts.js';
import {getFullTime} from './time.js';

let countId = 2; //счетчик для уникального id каждой задаче (с 2 т.к. уже было две задачи в html)

//функция удаления ЗАДАЧИ из массива по id
function deleteTaskFromArr(arr, idTask){
    //проверять, есть ли такая задача не надо, т.к. уже нашли ее id, а если он есть, значит есть и задача для удаления
    let delTaskConsole = arr.splice(arr.findIndex(element => element.id == idTask), 1);
    render();  
}

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