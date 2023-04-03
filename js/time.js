export {getFullTime, convertTimeStartFinish, getLeadTime};

function getFullTime() {
    const dateTime = new Date();
    return dateTime;
}
  
function convertTimeStartFinish(fullTimeDateObj) { 
    //по умолчанию записана строка inProgress, поэтому нужно обработать этот вариант
    if (typeof fullTimeDateObj === 'string') {
      return fullTimeDateObj;
    } else{
      const date = fullTimeDateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short", 
        day: "numeric",
      });
      const time = fullTimeDateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: false,
        minute: "numeric",
      });
      return `${time} ${date}`;
    }
}
  
function getLeadTime(timeStart, timeFinish) {
    if (typeof timeFinish === 'string') {
      return timeFinish;
    } else {
      const msTime = timeFinish.getTime() - timeStart.getTime();
      const days = parseInt(msTime / (1000 * 60 * 60 * 24));
      const hours = parseInt((msTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = parseInt((msTime % (1000 * 60 * 60)) / (1000 * 60));
      // const seconds = (msTime % (1000 * 60)) / 1000;
      //получает двухзначное число в минутах и часах даже если число <10
      if (hours < 10 && minutes < 10) {
        return `0${hours}:0${minutes}, ${days} days`;
      }
      else if (hours < 10 && time.getMinutes() > 9) {
        return `$0${hours}:${minutes}, ${days} days`
      }
      else if (hours > 9 && time.getMinutes() < 10) {
        return `${hours}:0${minutes}, ${days} days`;
      }
      return `${hours}:${minutes}, ${days} days`
    }
}