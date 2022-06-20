
// console.log(document.location); // the url

// console.log(document.referrer); // where the user come from

// // console.log(screen.width);  //suppose to be screen side

// console.log(navigator.userAgent); // the type of device used

// console.log(screen); // screen size

let lat = '', lng = '';

const success = async(postition) => {
  const { latitude, longitude } = postition.coords;
  console.log(latitude + ' : ' + longitude);

  lat = latitude;
  lng = longitude;

  await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=018d9986cb5c483380337c7f6526c2fe`)
  .then(response => response.json())
  .then(data =>  printIt(data.results));
  // .then(() => console.log(loc));
  // .then(response => console.log(response.results[0].formatted));
}



navigator.geolocation.getCurrentPosition(success, console.log());

let loc = '';

let printIt = (data) => {
  console.log(data);
  data?.map((val) => {
    console.log(val.formatted);
    console.log(val.components.state);
    console.log(val.components.county);
    loc = val.formatted;

    
    const user = { referrer : document.referrer,
      href: document.location.href,
      screenWidth: screen.width,
      screenHeight: screen.height,
      status: 'visit',
      lat: lat,
      lng:lng,
      city: val.components.state,
      state: val.components.county? val.components.county : ''
    };
    console.log(user);

    sessionStorage.setItem('user' , JSON.stringify(user));
  })
}

console.log(loc);
console.log(lat);
console.log(lng);

// let cookie_code="random_cookie_id";
// let data_to_send=RegExp(cookie_code+"=[^;]+").exec(document.cookie);
// let data_to_send2=decodeURIComponent(!!data_to_send ? data_to_send.toString().replace(/^[^=]+./,"") : "");

// console.log(loc);
// console.log(loc.results[0].geometry);

// let final_array_to_send=[data_to_send2, document.referrer, document.location.href, screen.width, screen.height]


function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

console.log(loc);

// window.onbeforeunload = function(){
//   console.log('want to leave');
//   setCook();
//   // return 'Are you sure you want to leave?';
// };