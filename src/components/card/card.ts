import {uuidv4} from '../../shared/helpers';
import CardInterface from './cardinterface';
import CardPresentation from './presentations/htmlpresentation';

export default class Card implements CardInterface {
  readonly id: string;
  symbol: string;
  flipped: boolean;
  presentation: CardPresentation;

  constructor(symbol:string = '', flipped: boolean = false) {
    this.id = uuidv4();
    this.symbol = symbol;
    this.presentation = new CardPresentation(this);
    this.flipped = flipped;
  }

  flip() {
    this.flipped = !this.flipped;

    return this.flipped;
  }

  match(card: Card): boolean {
    return this.symbol === card.symbol;
  }
}
