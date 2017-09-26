import CardInterface from '../cardinterface';

export default interface CardPresentation {
  model: CardInterface;
  element: any;
  buildElement();
  flip();
}
