import IArticle from './IArticle';
import ISource from './ISource';

interface IAPIresponse {
  status: string;
  totalResults?: number;
  articles?: Array<IArticle>;
  sources?: Array<ISource>;
}

export default IAPIresponse;
