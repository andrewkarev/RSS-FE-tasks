import News from './news/news';
import Sources from './sources/sources';
import IArticle from '../utils/interfaces/IArticle';
import ISource from '../utils/interfaces/ISource';
import IAPIresponse from '../utils/interfaces/IAPIresponse';

export class AppView {
  news: News;

  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IAPIresponse): void {
    const values: Array<IArticle> = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IAPIresponse): void {
    const values: Array<ISource> = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
