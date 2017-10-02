import Card from '../card/card';
import {shuffleArray} from '../../shared/helpers';
import * as data from '../../shared/symbols.json';
import BoardHtmlPresentation from './presentations/htmlpresentation';
import Board from './presentations/boardpresentationinterface';

export default class Game {
  noPairs: number;
  cards: Array<Card>;
  symbols: Array<string>;
  presentation: Board; 
  flipped: Array<Card> = [];

  constructor(pairs) {
    this.noPairs = pairs;
    this.symbols = data as any;
    
    this.reset(true);
  }

  generateCards(pairs: number): Array<Card> {
    let cards = [];
    
    for(let i = 0; i < pairs; i++) {
      let symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      let cardA = new Card(symbol);
      let cardB = new Card(symbol);

      cardA.subscribe(this);
      cardB.subscribe(this);

      cards.push(cardA, cardB);
    }

    cards = shuffleArray(cards);

    return cards;
  }

  toggleDisabled(): void {
    this.cards.map((card) => {
      card.toggleDisabled();
    });
  }

  allIsFlipped(): boolean {
    return this.cards.every((card) => {
      return card.flipped;
    });
  }

  resetCards(): void {
    this.cards.map((card) => {
      card.reset();
    });
  }

  /**
   * Init/Reset game, boolean to decide which.
   * 
   * @param {boolean} [init=false] 
   * @memberof Game
   */
  reset(init: boolean = false): void {
    let timeout = init ? 0 : 2000;

    setTimeout(() => {
      if(!init) {
        this.resetCards();
      }

      this.cards = this.generateCards(this.noPairs);
      this.presentation = new BoardHtmlPresentation(this.cards);
      this.presentation.render();
    }, timeout)
  }

  /**
   * The observer logic that gets called by the subjects. Contains game logic.
   * 
   * @param {Card} card 
   * @memberof Game
   */
  update(card: Card): void {
    this.flipped.push(card);
    
    if(this.allIsFlipped()) {
      this.toggleDisabled();
      this.reset();
    }

    if(this.flipped.length === 2) {
      this.toggleDisabled();
      
      if(this.flipped[0].match(this.flipped[1])) {
        this.flipped = [];
        this.toggleDisabled();
      }
      else {
        setTimeout(() => {
          this.flipped.map((card) => {
            card.reset();
            this.flipped = [];
          });

          this.toggleDisabled();
        }, 1000);
      }
    }
  }
}
