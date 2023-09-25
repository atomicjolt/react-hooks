# Atomic Hooks

A Set of React Hooks for Atomic Jolt

## Installation

```
npm install --save @atomic-jolt/hooks
```

```
yarn add @atomic-jolt/hooks
```

## Documentation

[Docs can be found here](https://atomicjolt.github.io/react-hooks/)

## Usage

```js
import { useBool } from '@atomic-jolt/hooks';

const Component = () => {
  const [bool, toggle] = useBool(false);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <p>Bool is {bool}</p>
    </div>
  );
};
```
