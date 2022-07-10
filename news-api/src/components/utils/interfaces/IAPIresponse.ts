import IArticle from './IArticle';
import ISource from './ISource';

interface IAPIresponse {
  status: string;
  totalResults?: number;
  articles?: IArticle[];
  sources?: ISource[];
}

export default IAPIresponse;
