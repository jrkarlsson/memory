import CardPresentation from './presentations/presentationinterface';

export default interface CardInterface {
  readonly id: string;
  presentation: CardPresentation;
  symbol: string;
  flipped: boolean;
  disabled: boolean;
  observers: Array<any>
  flip(): boolean;
  match(card): boolean;
  toggleDisabled(): boolean;
  subscribe(observer): void;
  unsubscribe(observer): void;
  notify(subject): void;
}
