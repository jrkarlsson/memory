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
    let element = document.createElement('div');
    element.id = this.model.id;
    element.className = styles.card +' '+styles.facedown;
    element.innerHTML = '<i class="fa fa-'+ this.model.symbol +'"/>';
    
    element.addEventListener('click', this.flip.bind(this));

    return element;
  }

  flip(): boolean {
    if(this.model.disabled) {
      return false;
    }
    
    this.model.flip();
    
    if(this.model.flipped) {
      this.element.className = styles.card +' '+styles.faceup;
    }
    else {
      this.element.className = styles.card +' '+styles.facedown;
    }

    return true;
  }

  reset(): void {
    this.element.className = styles.card +' '+styles.facedown;
  }
}
