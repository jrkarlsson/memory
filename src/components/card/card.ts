import {uuidv4} from '../../shared/helpers';
import CardInterface from './cardinterface';
import CardPresentation from './presentations/htmlpresentation';

export default class Card implements CardInterface {
  readonly id: string;
  symbol: string;
  flipped: boolean = false;
  disabled: boolean = false;
  presentation: CardPresentation;
  observers: Array<any> = [];

  constructor(symbol:string = '') {
    this.id = uuidv4();
    this.symbol = symbol;
    this.presentation = new CardPresentation(this);
  }

  reset(): boolean {
    this.flipped = false;
    this.presentation.reset();

    return this.flipped;
  }

  toggleDisabled(): boolean {
    this.disabled = !this.disabled;

    return this.disabled;
  }

  flip(): boolean {
    this.flipped = !this.flipped;
    this.notify(this);

    return this.flipped;
  }

  match(card: Card): boolean {
    return this.symbol === card.symbol;
  }

  subscribe(observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer): void {
    let index = this.observers.indexOf(observer);
    this.observers.slice(index, 1);
  }

  notify(subject): void {
    for(let i in this.observers) {
      this.observers[i].update(subject);
    }
  }
}
