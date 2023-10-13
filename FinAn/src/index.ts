import './components/normalize.scss';
import 'flatpickr/dist/flatpickr.min.css'; // eslint-disable-line import/no-extraneous-dependencies
import './global.scss';

import flatpickr from 'flatpickr'; // eslint-disable-line import/no-extraneous-dependencies
import { sheckProfile } from './components/login';

const header = document.querySelector('.header');
const openMenu = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__list');
const popupBtn = document.getElementById('contants');
const popupMenu = document.querySelector('.contact-popup');
const submitBtn = document.getElementById('form__submit-button');
const registerBtn = document.getElementById('register');
const submitBtnModal = document.getElementById('modal__button-submit');
const form = document.getElementById('form');
const registerForm = document.getElementById('enter__form');
const modalForm = document.getElementById('modal__form');
const modalMenu = document.querySelector('.modal__content');
const modalBtn = document.getElementById('visit_card');
const closeBtn = document.querySelectorAll('.modal__close');
const baeutyItems = document.querySelectorAll('.beauty__item');
const restarauntsItems = document.querySelectorAll('.restaurants__item');
const like = document.querySelectorAll('.restaurant__button');
const profile = document.getElementById('user');
const pageLanguage = document.documentElement.lang;

function submitForm(): void {
  console.log('sucsess');
}

function checkLikesUpload(el: Element): void {
  const likesPressed = localStorage.getItem('likes')?.split(',') || [];
  const elData = el.getAttribute('data-like') || '';
  if (likesPressed) {
    if (likesPressed.includes(elData)) {
      el.classList.add('liked');
    }
  }
}

function crreateUser(): void {
  const login = document.getElementById('login__input');
  console.log('df');
  if (login instanceof HTMLInputElement) {
    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('userLogin', login.value);
    location.reload(); // eslint-disable-line no-restricted-globals
  }
}

if (like.length >= 1) {
  like.forEach((el) => {
    checkLikesUpload(el);
  });
}

function checkLikes(el: Element): void {
  const likesPressed = localStorage.getItem('likes')?.split(',') || [];
  const elData = el.getAttribute('data-like') || '';
  if (likesPressed) {
    if (likesPressed.includes(elData)) {
      el.classList.remove('liked');
      const updatedLikes = likesPressed.filter((likeItem) => likeItem !== elData);
      localStorage.setItem('likes', updatedLikes.join(','));
    } else {
      el.classList.add('liked');
      likesPressed.push(elData);
      localStorage.setItem('likes', likesPressed.join(','));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  flatpickr('#date-picker', {
    locale: pageLanguage === 'ru' ? 'ru' : 'en',
    dateFormat: 'd.m.Y', // Формат даты (день-месяц-год)
    // Другие настройки...
  });
});

window.addEventListener('scroll', function checkY() {
  if (header && this.scrollY > 0) {
    header.classList.add('header-bg');
  } else if (header) {
    header.classList.remove('header-bg');
  }
});

window.addEventListener('click', (ev) => {
  const { target } = ev;
  if (target instanceof Node && popupBtn?.contains(target) && popupMenu) {
    ev.preventDefault();
    popupMenu.classList.add('contact-popup--active');
    document.body.classList.add('no-scroll');
  } else if (target instanceof Node && popupMenu && popupMenu.classList.contains('contact-popup--active')) {
    if (!popupMenu?.contains(target)) {
      ev.preventDefault();
      popupMenu.classList.remove('contact-popup--active');
      document.body.classList.remove('no-scroll');
    }
  } else if (target instanceof Node && registerBtn?.contains(target)) {
    if (registerForm instanceof HTMLFormElement && registerForm.checkValidity()) {
      ev.preventDefault();
      crreateUser();

      submitForm();
    }
  } else if (target instanceof Node && submitBtn?.contains(target)) {
    if (form instanceof HTMLFormElement && form.checkValidity()) {
      ev.preventDefault();
      submitForm();
    }
  } else if (target instanceof Node && modalBtn?.contains(target)) {
    ev.preventDefault();
    modalMenu?.classList.add('modal-active');
    document.body.classList.add('no-scroll');
  } else if (target instanceof Node && modalMenu && modalMenu.classList.contains('modal-active')) {
    if (!modalMenu?.contains(target)) {
      ev.preventDefault();
      modalMenu.classList.remove('modal-active');
      document.body.classList.remove('no-scroll');
    }
  }

  if (baeutyItems.length >= 1 && target instanceof Node) {
    baeutyItems.forEach((el) => {
      if (el.contains(target)) {
        modalMenu?.classList.add('modal-active');
        document.body.classList.add('no-scroll');
      }
    });
  }

  if (target instanceof Node && submitBtnModal?.contains(target)) {
    if (modalForm instanceof HTMLFormElement && modalForm.checkValidity()) {
      ev.preventDefault();
      submitForm();
    }
  }

  let firstEventProcessed = false;

  if (like.length >= 1 && target instanceof Node) {
    like.forEach((el) => {
      if (el.contains(target)) {
        firstEventProcessed = true;
        checkLikes(el);
      }
    });
  }
  if (restarauntsItems.length >= 1 && target instanceof Node) {
    restarauntsItems.forEach((el) => {
      if (!firstEventProcessed && el.contains(target)) {
        modalMenu?.classList.add('modal-active');
        document.body.classList.add('no-scroll');
      }
    });
  }
});

closeBtn?.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalMenu?.classList.remove('modal-active');
    popupMenu?.classList.remove('contact-popup--active');
    document.body.classList.remove('no-scroll');
  });
});

openMenu?.addEventListener('click', () => {
  openMenu.classList.toggle('active');
  navMenu?.classList.toggle('show-menu');
});

if (profile) {
  sheckProfile(profile, pageLanguage);
}
