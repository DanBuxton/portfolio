// 'use strict';

let form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', validate);

let error;

const name = document.getElementsByName('name')[0];
const email = document.getElementsByName('email')[0];
const message = document.getElementsByName('message')[0];

function validate(e) {
  let results = [];

  error = [];

  results.push(validateName());
  results.push(validateEmail());
  results.push(validateMessage());

  const result = results.includes(false);

  if (result) {
    str = '<ul>';
    error.forEach(e => {
      str += `<li>${e}</li>`
    });
    str += '</ul>';
  }

  console.log('errors', error === [] ? error : "None");
  console.log('result', !result);

  e.returnValue = !result;
}

function validateName() {
  let res = [];

  if (!name.validity.valueMissing) {
    if (name.value.length >= 5) {
      res.push(true);
    } else {
      error.push('Name must have 5 or more characters');
      res.push(false);
    }

    let reg = /([a-zA-Z]).{3,}[\s]([a-zA-Z]).{1,}/g;
    if (reg.test(name)) {
      res.push(true);
    } else {
      error.push('Name must contain a space and others');
      res.push(false);
    }
  } else {
    error.push('Name can\'t be empty');
    res.push(false);
  }

  return !res.includes(false);
}
function validateEmail() {
  let res = [];

  if (email.value) {
    if (email.value.length >= 7) {
      res.push(true);
    } else {

      error.push('Email must be 7 characters or more');
      res.push(false);
    }

    let reg = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
    if (reg.test(email.value)) {
      res.push(true);
    } else {
      error.push('Email contains an unrecognised pattern');
      console.log(reg.test(email));

      res.push(false);
    }
  } else {
    error.push('Email can\'t be empty');
    res.push(false);
  }
  return !res.includes(false);
}
function validateMessage() {
  let res = [];

  if (message.value) {
    res.push(true);
  } else {
    error.push('Message can\'t be empty');
    res.push(false);
  }

  return res.includes(false) == false;
}