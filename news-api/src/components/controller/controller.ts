import AppLoader from './appLoader';
import CallbackFunction from '../utils/types/callback';

class AppController extends AppLoader {
  public getSources(callback: CallbackFunction): void {
    this.getResp({ endpoint: 'sources' }, callback);
  }

  public getNews<T extends HTMLElement>(e: Event, callback: CallbackFunction): void {
    let target = e.target as T;
    const newsContainer = e.currentTarget as T;

    while (target !== newsContainer) {
      if (!target.classList.contains('source__item') && target.parentNode) {
        target = target.parentNode as T;
        // eslint-disable-next-line no-continue
        continue;
      }

      const sourceId = target.getAttribute('data-source-id');

      if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
        newsContainer.setAttribute('data-source', sourceId);
        this.getResp(
          {
            endpoint: 'everything',
            options: {
              sources: sourceId,
            },
          },
          callback,
        );
      }

      return;
    }
  }

  public findNews(callback: CallbackFunction): void {
    const search = document.querySelector('.header__search') as HTMLInputElement;
    const searchQuery = search.value || 'TypeScript';

    this.getResp(
      {
        endpoint: 'everything',
        options: {
          q: searchQuery,
        },
      },
      callback,
    );

    search.value = '';
  }
}

export default AppController;
