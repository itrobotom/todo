import {STATUSES, PRIORIRTIES} from './consts.js';
import {todoArr} from './main.js';
import {convertTimeStartFinish, changeStatusSetTime} from './time.js';
import {deleteTaskFromArr} from './data.js'

export {render, createElement, clearDom};

function render() {
    clearDom();
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