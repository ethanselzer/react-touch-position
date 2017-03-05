# react-touch-position
React Touch Position is a primitive component for composing UI features that require notification of
touch position status.

It plots touch coordinates relative to itself and re-renders child components with new touch
position props when touch position changes.

React Touch Position Supports the [long press gesture](https://material.google.com/patterns/gestures.html) and does
not interfere with page or element scrolling.

It is safe for server rendering and cleans up after unmount on the client.

## Status
[![CircleCI](https://img.shields.io/circleci/project/github/ethanselzer/react-touch-position.svg)](https://circleci.com/gh/ethanselzer/react-touch-position)
[![Coverage Status](https://coveralls.io/repos/github/ethanselzer/react-touch-position/badge.svg?branch=V2.0)](https://coveralls.io/github/ethanselzer/react-touch-position?branch=V2.0)
[![npm](https://img.shields.io/npm/v/react-touch-position.svg)](https://www.npmjs.com/package/react-touch-position)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Demo
Please see the [react-touch-position demo site](https://ethanselzer.github.io/react-touch-position).

Experiment with react-touch-position [live on CodePen](http://codepen.io/ethanselzer/pen/KWzOgj).

<img src="https://raw.githubusercontent.com/ethanselzer/react-touch-position/master/images/qrcode.png" width="75" height="75" alt="Touch Demo"/>

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

## Example Project

```ssh
git clone https://github.com/ethanselzer/react-touch-position.git
cd react-touch-position/example
npm install
npm start
```

If your default browser does not start automatically, open a new browser window and go to localhost:3000

## Development

```ssh
git clone https://github.com/ethanselzer/react-touch-position.git
cd react-touch-position
npm install
npm run #print available commands
```

The Example Project may be used in development of react-touch-position. To import ReactTouchPosition
from your local project change any import of ReactTouchPosition, on files in the components folder, to:

`import ReactTouchPosition from '../../../dist/ReactTouchPosition';`

The command `npm run prepublsih` must be run from the root of the project each time you want
your ReactTouchPosition changes to be reflected in the example.

If you experience ReferenceError: Unknown plugin "'transform-es2015-modules-umd'" when running
`prepublish` you may try running `npm run prepublish-cjs` instead.
## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-touch-position/compare/).

## License
MIT
