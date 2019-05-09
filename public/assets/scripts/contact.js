// 'use strict';

let form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', validateForm);
let btnSub = document.getElementById('btnSubmit');
btnSub.addEventListener('click', validateForm);

let errors = [];
let results;

const name = document.getElementsByName('name')[0];
const email = document.getElementsByName('email')[0];
const message = document.getElementsByName('message')[0];

function validateForm(e) {
  console.log('submit type', e.type == 'submit');

  results = [];
  errors = [];

  results.push(validateName());
  results.push(validateEmail());
  results.push(validateMessage());

  if (results.includes(false)) {
    let str = '<ul>';
    errors.forEach(function (e) {
      str += `<li>${e}</li>`
    });
    str += '</ul>';

    document.getElementById('errors').innerHTML = str;
    document.getElementById('errors').style.display = 'block';
    resize();
  }

  console.log('errors', results.includes(false) ? errors : "None");
  console.log('return', !results.includes(false));

  if (e.type == 'submit')
    e.returnValue = !results.includes(false);
}

function validateName() {
  let res = [];

  if (!name.validity.valueMissing) {
    if (name.value.length >= 5) {
      res.push(true);
    } else {
      errors.push('Name must have 5 or more characters');
      res.push(false);
    }

    let reg = /([a-zA-Z]).{3,}[\s]([a-zA-Z]).{1,}/g;
    if (reg.test(name)) {
      res.push(true);
    } else {
      errors.push('Name must contain a space and others');
      res.push(false);
    }
  } else {
    errors.push('Name can\'t be empty');
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
      errors.push('Email must be 7 characters or more');
      res.push(false);
    }

    let reg = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
    if (reg.test(email.value)) {
      res.push(true);
    } else {
      errors.push('Email contains an unrecognised pattern');
      console.log(reg.test(email));
      res.push(false);
    }
  } else {
    errors.push('Email can\'t be empty');
    res.push(false);
  }
  return !res.includes(false);
}
function validateMessage() {
  let res = [];

  if (!message.value == "") {
    res.push(true);
  } else {
    // message.addAttribrute('class', 'error');
    errors.push("Message can\'t be empty");
    res.push(false);
  }

  return !res.includes(false);
}