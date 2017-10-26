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
  moves: number = 0;
  readonly cardFlipTimeout: number = 150;

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
    this.cards.forEach(card => {
      card.toggleDisabled();
    });
  }

  allIsFlipped(): boolean {
    return this.cards.every((card) => {
      return card.flipped;
    });
  }

  /**
   * Cascade flip all the cards at the end of the game.
   * 
   * @memberof Game
   */
  flipAllCards(): void {
    let timer = 0;
    this.cards.forEach(card => {
      setTimeout(() => {
        card.reset();
      }, timer);

      timer += this.cardFlipTimeout;
    });
  }

  resetCards(): void {
    this.cards.forEach(card => {
      card.reset();
    })
  }

  /**
   * Init/Reset game, boolean to decide which.
   * 
   * @param {boolean} [init=false] 
   * @memberof Game
   */
  reset(init: boolean = false): void {
    //Calculate the timeout, either immediately or number of cards * timeout + margin
    let timeout = init ? 0 : this.cards.length * this.cardFlipTimeout + this.cardFlipTimeout;
    
    if(!init) {
      this.flipAllCards();
      // this.resetCards();
    }
    setTimeout(() => {
      this.moves = 0;
      this.cards = this.generateCards(this.noPairs);
      this.presentation = new BoardHtmlPresentation(this.cards);
      this.presentation.render();
    }, timeout)
  }

  /**
   * Alert user with number of moves they used to complete the game.
   * Note: To prevent the script pausing execution it should probably 
   * be a proper modal. setTimeout didn't work.
   * 
   * @memberof Game
   */
  alertUser() {
      alert(`Congratulations, you solved it in ${this.moves} moves!`);
  }

  /**
   * The observer logic that gets called by the subjects. Contains game logic.
   * 
   * @param {Card} card 
   * @memberof Game
   */
  update(card: Card): void {
    this.flipped.push(card);

    // If all cards are flipped/matched, end game and reset.
    if(this.allIsFlipped()) {
      this.toggleDisabled();
      this.alertUser();
      this.reset();
    }

    // If two cards are flipped, check if they match
    if(this.flipped.length === 2) {
      this.moves = this.moves + 1;
      this.toggleDisabled();
      
      if(this.flipped[0].match(this.flipped[1])) {
        this.flipped[0].toggleDisabled();
        this.flipped[1].toggleDisabled();
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
