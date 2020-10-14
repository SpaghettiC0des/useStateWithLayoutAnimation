import {act, renderHook} from '@testing-library/react-hooks';
import {LayoutAnimation} from 'react-native';
import cases from 'jest-in-case';
import useStateWithLayoutAnimation from '../useStateWithLayoutAnimation';

jest.mock(
  '../../node_modules/react-native/Libraries/LayoutAnimation/LayoutAnimation.js',
);

const mock = jest.fn();

beforeEach(() => jest.clearAllMocks());

cases(
  'should methods change state and call callback',
  ({name, callback}) => {
    const {result} = renderHook(() => useStateWithLayoutAnimation(1));
    const setState = result.current[1];

    act(() => {
      setState[name](2, callback);
    });

    const animationMock = LayoutAnimation[name];
    const state = result.current[0];

    expect(state).toBe(2);
    expect(animationMock).toBeCalledTimes(1);
    expect(animationMock.mock.calls[0][0]).toBe(callback);
  },
  [
    {name: 'spring', callback: mock},
    {name: 'spring', callback: undefined},
    {name: 'linear', callback: mock},
    {name: 'linear', callback: undefined},
    {name: 'easeInEaseOut', callback: mock},
    {name: 'easeInEaseOut', callback: undefined},
  ],
);

test('should noAnimation method change only state', () => {
  const {result} = renderHook(() => useStateWithLayoutAnimation(1));
  const setState = result.current[1];

  act(() => {
    setState.noAnimation(2);
  });

  const state = result.current[0];

  expect(state).toBe(2);
  expect(LayoutAnimation.spring).toBeCalledTimes(0);
  expect(LayoutAnimation.linear).toBeCalledTimes(0);
  expect(LayoutAnimation.easeInEaseOut).toBeCalledTimes(0);
});
