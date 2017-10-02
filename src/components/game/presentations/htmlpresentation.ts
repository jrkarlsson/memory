import BoardPresentationInterface from './boardpresentationinterface';
import Card from '../../card/cardinterface';
import * as styles from './stylespresentation.scss';

export default class BoardHTMLPresentation implements BoardPresentationInterface {
  element: HTMLDivElement;

  constructor(cards: Array<Card>) {
    this.element = this.buildElement(cards);
  }

  buildElement(cards): HTMLDivElement {
    let element = document.createElement('div');
    element.id = 'game-board';
    element.className = styles.content;

    for(let i = 0; i < cards.length; i++) {
      element.appendChild(cards[i].presentation.element);
    }
    
    return element;
  }

  render(): void {
    let boardElement = document.getElementById('game-board');

    if(boardElement) {
      document.body.replaceChild(this.element, boardElement);
    }
    else {
      document.body.appendChild(this.element);
    }
  }
}
