# react-touch-position
React Touch Position is a primitive component for composing UI features that require notification of
touch position status.

It plots touch coordinates relative to itself and re-renders child components with new touch
position props when touch position changes.

React Touch Position Supports [long press and pan gestures](https://material.google.com/patterns/gestures.html).

It is safe for server rendering and cleans up after unmount on the client.

## Status
[![CircleCI](https://img.shields.io/circleci/project/github/ethanselzer/react-touch-position.svg)](https://circleci.com/gh/ethanselzer/react-touch-position)
[![Coverage Status](https://coveralls.io/repos/github/ethanselzer/react-touch-position/badge.svg?branch=V2.0)](https://coveralls.io/github/ethanselzer/react-touch-position?branch=V2.0)
[![npm](https://img.shields.io/npm/v/react-touch-position.svg)](https://www.npmjs.com/package/react-touch-position)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Demo
Please see the [react-touch-position demo site](https://ethanselzer.github.io/react-touch-position).

## Related Project
For mouse position tracking, please consider [react-cursor-position](https://www.npmjs.com/package/react-cursor-position).

## Installation
```sh
npm install --save react-touch-position
```

## Usage
```JSX
import ReactTouchPosition from 'react-touch-position';
...
<ReactTouchPosition>
    <YourComponentOne/>
    <YourComponentTwo/>
</ReactTouchPosition>
```
ReactTouchPosition wraps its children in a div, which touch position
is plotted relative to.

Each child component will receive the following props:

```JavaScript
{
    isActive: Boolean,
    isPositionOutside: Boolean,
    touchPosition: {
        x: Number,
        y: Number
    }
}
```
This structure may be customized by implementing `mapChildProps` API feature.

### Props API

`className` : String - Optionally provide a CSS class to be applied to the div rendered by react-touch-position.

`style` : Object - Optionally provide a style object to be applied to the div rendered by react-touch-position.

`isActivatedOnTouch` : Boolean - Optionally activate immediately on touch. Scrolling may not be possible when scroll
gesture begins on target area. Recommended only when scrolling is not an expected use case.

`mapChildProps` : Function - Optionally model child component props to your custom shape.
Function receives one parameter with the signature `{ isActive, isPositionOutside, touchPosition }`,
and returns an object that is compatible with the props interface of your components.

`onActivationChanged` : Function - Optionally provide a function that will be called when the component is active.
Function receives one parameter with the signature `{ isActive }`

`onPositionChanged` : Function - Optionally provide a function that will be called when touch position changes.
Function will receive an object with the signature `{ isPositionOutside, touchPosition: { x, y } }`, as a single parameter.

`pressDuration` : Number - Milliseconds delay before press gesture is activated. Defaults to 500.

`pressMoveThreshold`: Number - Amount of movement allowed during press event detection. Defaults to 5.

`shouldDecorateChildren` : Boolean - Defaults to true. Optionally suppress `touchPosition` decoration of child components by
setting this prop false.

## Support

Please [open an issue](https://github.com/ethanselzer/react-touch-position/issues).

## Development

```ssh
git clone https://github.com/ethanselzer/react-touch-position.git
cd react-touch-position
npm install
npm run #print available commands
```

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-touch-position/compare/).

## License
MIT
