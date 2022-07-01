/* eslint-disable class-methods-use-this */
import './pagination.css';

class Pagination {
  public draw(data: string[]) {
    const pagination = document.querySelector('.pagination');

    data.forEach((item) => {
      const paginationElement = document.createElement('p');

      paginationElement.classList.add('page');
      paginationElement.dataset.letter = item;
      paginationElement.textContent = item;

      if (pagination) {
        pagination.append(paginationElement);
      }
    });
  }

  public stylizeElement(choosenSources?: HTMLElement) {
    const paginationElements = document.querySelectorAll('.page');
    paginationElements.forEach((item) => item.classList.remove('active'));

    if (choosenSources) {
      choosenSources.classList.add('active');
    } else {
      paginationElements[0].classList.add('active');
    }
  }
}

export default Pagination;
