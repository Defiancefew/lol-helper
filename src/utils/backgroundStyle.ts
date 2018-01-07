import { IBackgroundStyleType } from 'models';

export const backgroundStyle = ({ type, sprite, x, y }: IBackgroundStyleType): string => {
  return `url('/static/img/sprites/${sprite}') ${-x}px ${-y}px`;
};
