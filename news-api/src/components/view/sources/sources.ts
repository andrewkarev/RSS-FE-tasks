import './sources.css';
import ISource from '../../utils/interfaces/ISource';

class Sources {
  // eslint-disable-next-line class-methods-use-this
  draw(data: ISource[]) {
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

      fragment.append(sourceClone);
    });

    const sourcesList = document.querySelector('.sources');

    if (sourcesList) {
      sourcesList.append(fragment);
    }
  }
}

export default Sources;
