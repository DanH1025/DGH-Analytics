// import { response } from "express";

console.log(document.location); // the url
console.log(document.referrer); // where the user come from
// console.log(screen.width);  //suppose to be screen side
console.log(navigator.userAgent); // the type of device used
console.log(screen);
let loc;

let printIt = (data) => {
  console.log(data);
  loc = data;
}

const sucess = async(postition) => {
  const { latitude, longitude } = postition.coords;
  console.log(latitude + ' : ' + longitude);

  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=018d9986cb5c483380337c7f6526c2fe`)
  .then(response => response.json())
  .then(data => printIt(data.results));
  // .then(() => console.log(loc));
  // .then(response => console.log(response.results[0].formatted));
}

navigator.geolocation.getCurrentPosition(sucess, console.log());
let cookie_code="random_cookie_id";

let data_to_send=RegExp(cookie_code+"=[^;]+").exec(document.cookie);

let data_to_send2=decodeURIComponent(!!data_to_send ? data_to_send.toString().replace(/^[^=]+./,"") : "");

// console.log(loc);
// console.log(loc.results[0].geometry);

let final_array_to_send=[data_to_send2, document.referrer, document.location.href, screen.width, screen.height]

console.log(final_array_to_send);

console.log(loc.json());
// var h36 = new XMLHttpRequest();
// h36.open("POST", data_server_IP, true);
// h36.setRequestHeader('User-Type', 'none');
// h36.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// h36.send(final_array_to_send);