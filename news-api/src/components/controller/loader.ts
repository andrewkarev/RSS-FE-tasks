/* eslint-disable no-console */
import IGetRespParameter from '../utils/interfaces/IGetRespParameter';
import IResponse from '../utils/interfaces/IResponse';
import CallbackFunction from '../utils/types/callback';

class Loader {
  baseLink: string;

  options: { apiKey: string };

  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp({ endpoint, options }: IGetRespParameter, callback: CallbackFunction = () => { console.error('No callback for GET response'); }): void {
    this.load('GET', endpoint, callback, options);
  }

  // eslint-disable-next-line class-methods-use-this
  errorHandler = (res: IResponse): never | IResponse => {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  };

  makeUrl(options: object, endpoint: string): string {
    const urlOptions: {[index: string]: string} = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: 'GET', endpoint: string, callback: CallbackFunction, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
