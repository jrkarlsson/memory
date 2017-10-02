import Card from '../../card/cardinterface';

export default interface BoardPresentation {
  element: any;
  buildElement(cards: Array<Card>);
  render(): void;
}
