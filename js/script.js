/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
      movies: [
          "Логан",
          "Лига справедливости",
          "Ла-ла лэнд",
          "Одержимость",
          "Скотт Пилигрим против..."
      ]
  };

  const advertisingImages = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = document.querySelector('.promo__genre');

  const deleteAdv = (arr) => {
    arr.forEach(item => {
      item.remove();
    });
  };

  const makeChanges = () => {
    genre.textContent = 'Драма';
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  let filmsList = document.querySelector('.promo__interactive-list'),
      form = document.querySelector('.add'),
      addFilm = form.querySelector('.adding__input'),
      checkbox = form.querySelector('[type="checkbox"]'),
      confirmFilm = form.lastElementChild;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = addFilm.value,
        favorite = checkbox.checked;

    if (newFilm) {

      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`;
      }

      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);

      createMovieList(movieDB.movies, filmsList);
    }

    event.target.reset();
  });

  const sortArr = (arr) => {
    arr.sort();
  };

  function createMovieList(films, parent) {
    parent.innerHTML = "";

    films.forEach((item, i) => {
      parent.innerHTML +=
      `<li class="promo__interactive-item">${i + 1}. ${item}
          <div class="delete"></div>
      </li>`;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
      });
    });

  }

  deleteAdv(advertisingImages);
  makeChanges();
  sortArr(movieDB.movies);
  createMovieList(movieDB.movies, filmsList);
});
