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

//возвращает МАССИВ ОБЪЕКТОВ ЗАДАЧ С НУЖНЫМ ПРИОРИТЕОТОМ, УНИКЛЬНЫМ ID, статусом и остальными данными, которые не будем использовать
export function getTodoPriorityId(arr, priority) {
    const arrPriorObj = arr.filter(element => element.priority === priority);
    console.log(arrPriorObj); 
    return arrPriorObj;
}
