/* eslint-disable no-console */
import IGetRespParameter from '../utils/interfaces/IGetRespParameter';
import IResponse from '../utils/interfaces/IResponse';
import CallbackFunction from '../utils/types/callback';
import StatusCodeEnum from '../utils/enums/statusCode';
import IResponseOptions from '../utils/interfaces/IResponseOptions';

class Loader {
  private baseLink: string;

  private options: Partial<IResponseOptions>;

  constructor(baseLink: string, options: Partial<IResponseOptions>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp({ endpoint, options }: IGetRespParameter, callback: CallbackFunction = () => { console.error('No callback for GET response'); }): void {
    this.load('GET', endpoint, callback, options);
  }

  // eslint-disable-next-line class-methods-use-this
  private errorHandler = (res: IResponse): never | IResponse => {
    if (res.ok) {
      return res;
    }

    if (res.status === StatusCodeEnum.Unathorized || res.status === StatusCodeEnum.NotFound) {
      console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
    }

    throw Error(res.statusText);
  };

  private makeUrl(options: object, endpoint: string): string {
    const urlOptions: { [index: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.entries(urlOptions).forEach(([key, value]) => {
      url += `${key}=${value}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: 'GET', endpoint: string, callback: CallbackFunction, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
