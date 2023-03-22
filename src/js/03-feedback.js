import throttle from 'lodash.throttle';
const elForm = document.querySelector('.feedback-form');
console.log(elForm);
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

updateForm();

elForm.addEventListener('input', throttle(onFormInput, 500));
elForm.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.target;

  if (email.value === '' || message.value === '') {
    return window.alert('Please fill in all the fields!');
  }
  console.log({ Email: email.value, Message: message.value });
  elForm.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function updateForm() {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    return;
  }
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
  Object.entries(savedForm).forEach(([name, value]) => {
    formData[name] = value;
    elForm.elements[name].value = value;
  });
}