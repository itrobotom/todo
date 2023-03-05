export const STATUSES = { //пространство имен задаем, когда есть изначально известные часто используемые в коде данные (строки, числа)
    //TO_DO: 'To Do',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
}; 
  
export const PRIORIRTIES = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
}
  
export const statusDefault = 'To Do';
  
export let todoArr = [ 
    {name: 'create a new practice task', status: STATUSES.IN_PROGRESS, priority: PRIORIRTIES.HIGH, id: 0}, 
    {name: 'make a bed', status: STATUSES.DONE, priority: PRIORIRTIES.HIGH}, 
];

export function addTask(arr, newTask, prior, idNow){
    //добавить задачу, если такой еще нет
    //если есть, сообщить что такая уже есть
    if (arr.find(element => element.name === newTask)){ 
        console.log('Такая зачача уже есть!');
    } else { //иначе добавить задачу
        let newTaskObj = {name: newTask, status: STATUSES.IN_PROGRESS, priority: prior, id: idNow};
        arr.push(newTaskObj);
    }
}

//старая функция только для работы с массивом с поиском задачи по имени
export function deleteTask(arr, delTask){
    //проверить, есть ли задача для удаления
    if (!isValidTask(arr, delTask)){
        console.log('Такой задачи не существует!');
    } else { // удалить задачу
        let delTaskConsole = arr.splice(arr.findIndex(element => element.name == delTask), 1);
        console.log(`Задача "${delTaskConsole[0].name}" успешно удалена`);
    }
}

//возвращает МАССИВ ОБЪЕКТОВ ЗАДАЧ С НУЖНЫМ ПРИОРИТЕОТОМ, УНИКЛЬНЫМ ID, статусом и остальными данными, которые не будем использовать
export function getTodoPriorityId(arr, priority) {
    const arrPriorObj = arr.filter(element => element.priority === priority);
    console.log(arrPriorObj); 
    return arrPriorObj;
}
