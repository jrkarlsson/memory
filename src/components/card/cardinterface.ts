import CardPresentation from './presentations/presentationinterface';

export default interface CardInterface {
  readonly id: string;
  presentation: CardPresentation;
  symbol: string;
  flipped: boolean;
  flip(): boolean;
  match(card): boolean;
}
