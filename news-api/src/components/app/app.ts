import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  controller: AppController;

  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sourcesList = document.querySelector('.sources');
    if (sourcesList) {
      sourcesList.addEventListener('click', (e) => this.controller.getNews<HTMLElement>(e, (data) => this.view.drawNews(data)));
      this.controller.getSources((data) => this.view.drawSources(data));
    }
  }
}

export default App;
