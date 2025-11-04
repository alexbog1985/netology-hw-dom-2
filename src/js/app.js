import { films } from "./data";
import Films from "./films/Films";

addEventListener("DOMContentLoaded", () => {
  const filmsEl = new Films(document.querySelector(".films"));

  films.forEach((film) => {
    filmsEl.addFilm(film.id, film.title, film.imdb, film.year);
  });

  const sortByArray = ["id", "title", "imdb", "year"];

  let currentIndex = 0;
  let reverse = false;

  setInterval(() => {
    filmsEl.sortFilms(sortByArray[currentIndex], reverse);
    console.log(`sort by: ${sortByArray[currentIndex]} reversed: ${reverse}`);
    currentIndex = (currentIndex + 1) % sortByArray.length;
    if (currentIndex === 0) reverse = !reverse;
  }, 2000);
});
