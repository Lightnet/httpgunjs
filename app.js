/*
  Name: httpgunjs

  Created by: Lightnet

*/

require('./server');

// '2019/06/20:10:10:10.30'

function timeStampD(){
  let time =new Date();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;
  //let ms = time.getUTCMilliseconds();
  let ms = time.getMilliseconds();

  var str = time.getFullYear() + "/" + month + "/" + day + ":" +  hour + ":" + min + ":" + sec + "." + ms;

  return str
}

console.log(timeStampD());