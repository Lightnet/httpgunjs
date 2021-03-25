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

//console.log(timeStampD());
function DateToTimeInt(time){
  //let time = timeStampD();
  //console.log(time);
  //console.log(time.split('/'))
  //console.log(time.split(':'))
  //console.log(time.split('.'))
  let time0 =new Date();
  time0.setFullYear(time.split('/')[0]);
  time0.setMonth(time.split('/')[1]-1)
  time0.setDate(time.substring(10,8))
  //console.log(time.substring(10,8))
  //time0.setHours(time.split(':')[1])
  //console.log(time0.getHours());
  time0.setMinutes(time.split(':')[2])
  time0.setSeconds(time.substring(19,17))
  time0.setMilliseconds(time.split('.')[1])
  //time0.setTime(1)
  //console.log(time0);
  //console.log(time0.getTime());
  return time0.getTime();
}