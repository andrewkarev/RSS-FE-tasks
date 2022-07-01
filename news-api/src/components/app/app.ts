import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesList = document.querySelector('.sources');
    const pagesList = document.querySelector('.pagination');

    if (sourcesList) {
      sourcesList.addEventListener('click', (e) => this.controller.getNews<HTMLElement>(e, (data) => this.view.drawNews(data)));
    }

    if (pagesList) {
      pagesList.addEventListener('click', (e) => {
        const currentPage = e.target as HTMLElement;
        const choosenSources = currentPage.dataset.letter;
        this.controller.getSources((data) => this.view.drawSources(data, choosenSources));
        this.view.stylizePaginationElement(currentPage);
      });
    }

    this.controller.getSources((data) => {
      this.view.drawPagination(data);
      this.view.drawSources(data);
      this.view.stylizePaginationElement();
    });
  }
}

export default App;
