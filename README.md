# useStateWithLayoutAnimation
Abstraction for `React Native`'s `LayoutAnimation` and `useState`

## Example

```tsx
// This example is taken from the React Native documentation, with a little bit of modification.
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import useStateWithLayoutAnimation from 'use-state-with-layout-animation';

const App = () => {
  const [state, setState] = useStateWithLayoutAnimation({w: 100, h: 100});

  const spring = () => {
    setState.spring({w: state.w + 15, h: state.h + 15});
  };

  const linear = () => {
    setState.linear({w: state.w + 15, h: state.h + 15});
  };

  const easeInEaseOut = () => {
    setState.easeInEaseOut({w: state.w + 15, h: state.h + 15});
  };

  const reset = () => {
    setState.noAnimation({w: 100, h: 100});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, {width: state.w, height: state.h}]} />
      <TouchableOpacity onPress={spring}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Spring</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={linear}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Linear</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={easeInEaseOut}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Ease in, Ease out</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'tomato',
    height: 200,
    width: 200,
  },
  button: {
    backgroundColor: 'black',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
```

## API
By default, `UIManager.setLayoutAnimationEnabledExperimental` is invoked, you can pass `false` as the second parameter if you want to call it on your own.
```
useStateWithLayoutAnimation(initialState: any, setLayoutAnimationEnabledExperimental?: boolean = true)
```

You can pass a callback as second parameter to `setState` animation functions to be called when animation is finished
```ts
const [state, setState] = useStateWithLayoutAnimation(1);

const animationDidFinish = () => console.log('Animation finished');

setState.spring(2, animationDidFinish);
setState.linear(3, animationDidFinish);
setState.easeInEaseOut(4, animationDidFinish);
```

## License
[MIT](https://github.com/karlmarxlopez/useStateWithLayoutAnimation/blob/master/LICENSE)