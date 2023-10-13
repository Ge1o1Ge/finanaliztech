function exit(): void {
  localStorage.removeItem('userLogged');
  localStorage.removeItem('userLogin');
}

function deleteUser(): void {
  localStorage.removeItem('userLogged');
  localStorage.removeItem('userLogin');
}

export function sheckProfile(profileBox: HTMLElement, lang: string): void {
  const profile = profileBox;
  const check = localStorage.getItem('userLogged');

  if (check === 'true') {
    const login = localStorage.getItem('userLogin');
    profile.innerHTML = `<h1 class="visually-hidden">Войти</h1>
    <div class="container tickets__container">
      <div class="card__image--travel">
        <svg class="card__icon card__icon--travel" width="100" height="100" aria-hidden="true" focusable="false">
          <use xlink:href="#profile"></use>
        </svg>
      </div>
      <h3 class="section__title section__title--profile">${lang === 'ru' ? 'Добро пожаловать' : 'Wlcome'} ${login}</h3>
      <form id="exit__form" class="tickets__form form" autocomplete="off">
        <button class="form__button" id="exit">${lang === 'ru' ? 'Выйти из профиля' : 'Sign out'}</button>
        <button class="form__button" id="delete">${lang === 'ru' ? 'Удалить профиль' : 'Delete profile'}</button>
      </form>
    </div>`;
  }

  const exitBtn = document.getElementById('exit');
  const deleteBtn = document.getElementById('delete');

  exitBtn?.addEventListener('click', (ev) => {
    ev.preventDefault();
    exit();
    location.reload(); // eslint-disable-line no-restricted-globals
  });

  deleteBtn?.addEventListener('click', (ev) => {
    ev.preventDefault();
    deleteUser();
    location.reload(); // eslint-disable-line no-restricted-globals
  });
}
