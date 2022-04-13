// import { response } from "express";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions/orderActions';

import { createUserLog } from '../src/redux/actions/userLogActions';


console.log(document.location); // the url

console.log(document.referrer); // where the user come from

// console.log(screen.width);  //suppose to be screen side

console.log(navigator.userAgent); // the type of device used

console.log(screen); // screen size

let lati = '', longi = '';

// const sucess = async(postition) => {
//   const { latitude, longitude } = postition.coords;
//   console.log(latitude + ' : ' + longitude);

//   lati = latitude;
//   longi = longitude;

//   await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=018d9986cb5c483380337c7f6526c2fe`)
//   .then(response => response.json())
//   .then(data =>  printIt(data.results));
//   // .then(() => console.log(loc));
//   // .then(response => console.log(response.results[0].formatted));
// }

// navigator.geolocation.getCurrentPosition(sucess, console.log());

// let loc = '';

// let printIt = (data) => {
//   console.log(data);
//   data?.map((val) => {
//     console.log(val.formatted);
//     loc = val.formatted;
//   })
// }

// console.log(loc);
// console.log(lati);
// console.log(longi);

let cookie_code="random_cookie_id";
let data_to_send=RegExp(cookie_code+"=[^;]+").exec(document.cookie);
let data_to_send2=decodeURIComponent(!!data_to_send ? data_to_send.toString().replace(/^[^=]+./,"") : "");

// console.log(loc);
// console.log(loc.results[0].geometry);

// let final_array_to_send=[data_to_send2, document.referrer, document.location.href, screen.width, screen.height]

const user = { referrer : document.referrer,
               href: document.location.href,
               screenWidth: screen.width,
               screenHeight: screen.height,
               status: 'visit'
              };

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function setCook(){
  const user = JSON.parse(sessionStorage.getItem('user'));
  // localStorage.setItem("user", JSON.stringify(user));
  const date = new Date().toISOString().slice(0, 10);

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  dispatch(createUserLog(user.href,user.referrer,user.screenWidth,user.screenHeight,true,true,true,date,time));
}

window.onbeforeunload = function(){
  console.log('want to leave');
  setCook();
  // return 'Are you sure you want to leave?';
};

sessionStorage.setItem('user' , JSON.stringify(user));

console.log(user);

// var h36 = new XMLHttpRequest();
// h36.open("POST", data_server_IP, true);
// h36.setRequestHeader('User-Type', 'none');
// h36.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// h36.send(final_array_to_send);