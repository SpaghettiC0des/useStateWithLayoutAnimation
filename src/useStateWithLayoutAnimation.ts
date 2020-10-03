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

  const partialSetState = useCallback(
    (animationFn: LayoutAnimationFn) => (
      nextState: SetStateAction<S>,
      onAnimationDidEnd?: OnAnimationDidEndFn,
    ) => {
      animationFn(onAnimationDidEnd);
      setState(nextState);
    },
    [],
  );
  
  const stateSetters = useRef({
    spring: partialSetState(LayoutAnimation.spring),
    linear: partialSetState(LayoutAnimation.linear),
    easeInEaseOut: partialSetState(LayoutAnimation.linear),
    noAnimation: setState,
  }).current;

  return [state, stateSetters];
};

export default useStateWithLayoutAnimation;
