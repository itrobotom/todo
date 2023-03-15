export const STATUSES = { //пространство имен задаем, когда есть изначально известные часто используемые в коде данные (строки, числа)
    TO_DO: 'To Do',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
}; 
  
export const PRIORIRTIES = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
}
  
export let todoArr = [ 
    {name: 'create a new practice task', status: STATUSES.IN_PROGRESS, priority: PRIORIRTIES.HIGH, id: 0}, 
    /*{name: 'create a new practice task №2', status: STATUSES.IN_PROGRESS, priority: PRIORIRTIES.HIGH},*/ 
    {name: 'make a bed', status: STATUSES.DONE, priority: PRIORIRTIES.HIGH}, 
    /*{name: 'make a bed2', status: STATUSES.DONE, priority: PRIORIRTIES.LOW},*/
];
