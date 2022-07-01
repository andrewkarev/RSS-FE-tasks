import News from './news/news';
import Sources from './sources/sources';
import IArticle from '../utils/interfaces/IArticle';
import ISource from '../utils/interfaces/ISource';
import IAPIresponse from '../utils/interfaces/IAPIresponse';

export class AppView {
  private news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: IAPIresponse): void {
    const values: Array<IArticle> = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: IAPIresponse): void {
    const values: Array<ISource> = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
