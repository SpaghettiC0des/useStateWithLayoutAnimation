import {SetStateAction} from 'react';

export type OnAnimationDidEndFn = () => void;

export type LayoutAnimationFn = (
  onAnimationDidEnd?: OnAnimationDidEndFn,
) => void;

export type SetStateWithLayoutAnimation<S> = (
  nextState: SetStateAction<S>,
  onAnimationDidEnd?: OnAnimationDidEndFn,
) => void;

export type StateSetter<S> = {
  spring: SetStateWithLayoutAnimation<S>;
  linear: SetStateWithLayoutAnimation<S>;
  easeInEaseOut: SetStateWithLayoutAnimation<S>;
};
