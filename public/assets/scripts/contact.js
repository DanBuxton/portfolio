const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', validate);
const name = document.getElementsByName('name')[0];
const email = document.getElementsByName('email')[0];
const message = document.getElementsByName('message')[0];
function validate(e) {
  let result = [];

  result.push(validateName());
  result.push(validateEmail());
  result.push(validateMessage());

  if (email.value.length >= 6) {
    result = true;
  } else {
    // Email error

    result = false;
  }

  if (message) {
    result = true;
  }
  else {
    // No messsage

    result = false;
  }

  e.returnValue = result;
}

function validateName(str) {
  let res = [];

  if (str.value) {
    if (str.value.length >= 3) {
      res.push(true);
    } else {


      res.push(false);
    }

    let reg = /([a-zA-Z][\s]).{3,}/g;
    if (reg.test(str)) {
      res.push(true);
    } else {


      res.push(false);
    }
  }
  return !res.includes(false);
}