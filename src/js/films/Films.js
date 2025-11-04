export default class Films {
  constructor(element) {
    this.element = element;
    this.initTableHeaders();
  }

  addFilm(filmId, title, imdb, year) {
    const film = document.createElement("tr");
    const filmIdElement = document.createElement("td");
    const titleElement = document.createElement("td");
    const imdbElement = document.createElement("td");
    const yearElement = document.createElement("td");

    film.dataset.id = `#${filmId}`;
    film.dataset.title = title;
    film.dataset.imdb = `imdb: ${imdb}`;
    film.dataset.year = `(${year})`;

    filmIdElement.textContent = filmId;
    titleElement.textContent = title;
    yearElement.textContent = year;
    imdbElement.textContent = imdb;

    film.appendChild(filmIdElement);
    film.appendChild(titleElement);
    film.appendChild(imdbElement);
    film.appendChild(yearElement);

    this.element.appendChild(film);
  }

  sortFilms(sortBy, reverse = false) {
    const films = Array.from(
      this.element.querySelectorAll("tr:not(:first-child)"),
    );
    films.sort((a, b) => {
      let valueA, valueB;
      switch (sortBy) {
        case "id":
        case "year":
          valueA = this.extractNumber(a.dataset[sortBy]);
          valueB = this.extractNumber(b.dataset[sortBy]);
          break;
        case "imdb":
          valueA = this.extractFloat(a.dataset[sortBy]);
          valueB = this.extractFloat(b.dataset[sortBy]);
          break;
        case "title":
          valueA = a.dataset[sortBy].toLowerCase();
          valueB = b.dataset[sortBy].toLowerCase();
          break;
        default:
          valueA = a.dataset[sortBy];
          valueB = b.dataset[sortBy];
      }

      let result = 0;
      if (valueA < valueB) result = -1;
      if (valueA > valueB) result = 1;

      return reverse ? -result : result;
    });
    const firstRow = this.element.querySelector("tr");
    this.element.innerHTML = "";
    this.element.appendChild(firstRow);

    films.forEach((film) => this.element.appendChild(film));

    this.updateSortIndicator(sortBy, reverse);
  }

  extractNumber(value) {
    if (typeof value === "number") return value;

    const cleaned = String(value).replace(/\D/g, "");
    return cleaned ? parseInt(cleaned, 10) : 0;
  }

  extractFloat(value) {
    if (typeof value === "number") return value;
    const match = String(value).match(/(\d+\.\d+)|(\d+)/);
    return match ? parseFloat(match[0]) : 0;
  }

  initTableHeaders() {
    const tableHeaders = this.element.querySelectorAll("th");
    tableHeaders.forEach((tableHeader) => {
      tableHeader.innerHTML = `
        <span class="table-header-text">${tableHeader.textContent}</span>
        <span class="sort-arrow"></span>
      `;
    });
  }

  getSortedField(tableHeaderText) {
    const fieldMap = {
      id: "id",
      title: "title",
      imdb: "imdb",
      year: "year",
    };
    return fieldMap[tableHeaderText.toLowerCase()];
  }

  updateSortIndicator(field, reverse) {
    const arrows = this.element.querySelectorAll(".sort-arrow");
    arrows.forEach((arrow) => {
      arrow.textContent = "";
      arrow.classList.add("sort-arrow");
    });

    const tableHeaders = this.element.querySelectorAll("th");
    tableHeaders.forEach((tableHeader) => {
      const sortField = this.getSortedField(
        tableHeader.querySelector(".table-header-text").textContent,
      );
      console.log(sortField);
      if (sortField === field) {
        const arrow = tableHeader.querySelector(".sort-arrow");
        console.log(arrow);
        arrow.textContent = reverse ? "\u2191" : "\u2193";
        arrow.classList.add(reverse ? "desc" : "asc");
      }
    });
  }
}
