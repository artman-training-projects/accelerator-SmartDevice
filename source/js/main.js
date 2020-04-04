let modal = document.querySelector('.modal');
let requestName = modal.querySelector('#form-modal__name');
let requestTel = modal.querySelector('#form-modal__tel');
let requestText = modal.querySelector('#form-modal__message');

/* Открытие и закрытие формы по кнопке */
let requestShowButton = document.querySelector('.page-header__item--btn');

requestShowButton.addEventListener('click', function (evt) {
  modal.classList.remove('modal--off');
  requestName.focus();

  requestName.value = localStorage.getItem('requestName');
  requestTel.value = localStorage.getItem('requestTel');
  requestText.value = localStorage.getItem('requestText');
});

/* Закрытие формы клавишой ESC */
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (!modal.classList.contains('modal--off')) {
      evt.preventDefault();
        modal.classList.add('modal--off');
    }
  }
})

/* Закрытие формы нажатием крестика */
let modalCloseButton = modal.querySelector('.modal__close');
modalCloseButton.addEventListener('click', function (evt) {
  if (!modal.classList.contains('modal--off')) {
    evt.preventDefault();
      modal.classList.add('modal--off');
  }
})

/* Проверка заполненности полей формы перед отправкой,
загрузках данных из localStorage, если доступно */
let modalForm = modal.querySelector('form');
modalForm.addEventListener('submit', function (evt) {
  if (!modal.classList.contains('modal--off')) {
    evt.preventDefault();

    localStorage.setItem('requestName', requestName.value);
    localStorage.setItem('requestTel', requestTel.value);
    localStorage.setItem('requestText', requestText.value);

    modal.classList.add('modal--off');
  }
});



