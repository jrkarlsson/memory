import Card from './components/card/card';
import * as data from './shared/symbols.json';
import * as styles from './shared/styles.scss';

let element = document.createElement('div');


element.className = styles.content;  



const symbols = data as any;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateCards(pairs) {
  let cards = [];

  for(let i = 0; i < pairs; i++) {
    let symbol = symbols[Math.floor(Math.random() * symbols.length)];
    cards.push(new Card(symbol));
    cards.push(new Card(symbol));
  }

  cards = shuffle(cards);

  return cards;
}

let cards = generateCards(6);

for(let i = 0; i < cards.length; i++) {
  element.appendChild(cards[i].presentation.element);
}

document.body.appendChild(element);

