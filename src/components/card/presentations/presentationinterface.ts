import CardInterface from '../cardinterface';

export default interface CardPresentation {
  model: CardInterface;
  element: any;
  buildElement(): HTMLDivElement;
  flip(): boolean;
  reset(): void;
}
