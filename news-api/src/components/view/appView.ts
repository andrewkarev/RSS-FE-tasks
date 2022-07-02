import News from './news/news';
import Sources from './sources/sources';
import Pagination from './pagination/pagination';
import IArticle from '../utils/interfaces/IArticle';
import ISource from '../utils/interfaces/ISource';
import IAPIresponse from '../utils/interfaces/IAPIresponse';

export class AppView {
  private news: News;

  private sources: Sources;

  private pagination: Pagination;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
    this.pagination = new Pagination();
  }

  public drawNews(data: Pick<IAPIresponse, 'articles'>): void {
    const values: Array<IArticle> = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: Pick<IAPIresponse, 'sources'>, choosenSources = 'A'): void {
    const values: Array<ISource> = data?.sources ? data?.sources : [];
    this.sources.draw(values, choosenSources);
  }

  public drawPagination(data: Pick<IAPIresponse, 'sources'>) {
    const values: Array<ISource> = data?.sources ? data?.sources : [];
    const sourceNamesFirstChars: string[] = values.map((item) => item.name.charAt(0));
    const uniqueChars: Set<string> = new Set(sourceNamesFirstChars);
    const uniqueCharsArray: string[] = [...uniqueChars];
    this.pagination.draw(uniqueCharsArray);
  }

  public stylizePaginationElement(choosenSources?: HTMLElement) {
    if (choosenSources) {
      this.pagination.stylizeElement(choosenSources);
    } else {
      this.pagination.stylizeElement();
    }
  }
}

export default AppView;
