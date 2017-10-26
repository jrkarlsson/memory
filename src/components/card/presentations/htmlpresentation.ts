import Card from  '../cardinterface';
import CardPresentationInterface from './presentationinterface';
import * as styles from './stylespresentation.scss';

export default class CardHTMLPresentation implements CardPresentationInterface {
  model: Card;
  element: HTMLDivElement;

  constructor(model: Card) {
    this.model = model;
    this.element = this.buildElement();
  }

  buildElement(): HTMLDivElement {
    let container = document.createElement('div'),
        flipper = document.createElement('div'),
        front = document.createElement('div'),
        back = document.createElement('div');

    container.className = styles.card;
    flipper.className = styles.flipper;
    front.className = styles.front;
    front.innerHTML = '<i class="fa fa-'+ this.model.symbol +'"/>';
    back.className = styles.back;

    flipper.appendChild(front);
    flipper.appendChild(back);
    container.appendChild(flipper);
    
    container.addEventListener('click', this.flip.bind(this));

    return container;
  }

  flip(): boolean {
    if(this.model.disabled) {
      return false;
    }
    
    if(!this.model.flipped) {
      this.element.className = styles.card +' '+ styles.flipped;
    }
    else {
      this.element.className = styles.card;
    }

    this.model.flip();
    
    return true;
  }

  reset(): void {
    this.element.className = styles.card;
  }
}
