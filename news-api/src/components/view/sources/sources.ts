import './sources.css';
import ISource from '../../utils/interfaces/ISource';

class Sources {
  // eslint-disable-next-line class-methods-use-this
  public draw(data: ISource[], choosenSources: string) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

      const sourceItemName = sourceClone.querySelector('.source__item-name');
      const sourceItem = sourceClone.querySelector('.source__item');

      if (sourceItemName && sourceItem) {
        sourceItemName.textContent = item.name;
        sourceItem.setAttribute('data-source-id', item.id);
      }

      if (item.name.startsWith(choosenSources)) {
        fragment.append(sourceClone);
      }
    });

    const sourcesList = document.querySelector('.sources');

    if (sourcesList) {
      sourcesList.innerHTML = '';
      sourcesList.append(fragment);
    }
  }
}

export default Sources;
