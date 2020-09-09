import {useState, useRef, useEffect, SetStateAction, useCallback} from 'react';
import {LayoutAnimation, NativeModules} from 'react-native';
import {StateSetter, LayoutAnimationFn, OnAnimationDidEndFn} from './types';

const {UIManager} = NativeModules;

const useStateWithLayoutAnimation = <S>(
  initialValue: S,
  setLayoutAnimationEnabledExperimental = true,
): [S, StateSetter<S>] => {
  useEffect(() => {
    if (setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [setLayoutAnimationEnabledExperimental]);

  const [state, setState] = useState<S>(initialValue);

  const curriedSetState = useCallback(
    (animationFn: LayoutAnimationFn) => (
      nextState: SetStateAction<S>,
      onAnimationDidEnd?: OnAnimationDidEndFn,
    ) => {
      animationFn(onAnimationDidEnd);
      setState(nextState);
    },
    [],
  );

  const spring = curriedSetState(LayoutAnimation.spring);
  const linear = curriedSetState(LayoutAnimation.linear);
  const easeInEaseOut = curriedSetState(LayoutAnimation.easeInEaseOut);
  const noAnimation = (nextState: SetStateAction<S>) => setState(nextState);

  const stateSetters = useRef({
    spring,
    linear,
    easeInEaseOut,
    noAnimation,
  }).current;

  return [state, stateSetters];
};

export default useStateWithLayoutAnimation;
