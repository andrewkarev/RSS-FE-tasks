import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'f91610e459fc44829bca4c3e75d36678', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
