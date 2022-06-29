import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '0651d81528834200a0a58d42fa497272', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
