# react-touch-position

A React component that decorates its children with touch coordinates, plotted relative to itself.

Supports [long press and pan gestures](https://material.google.com/patterns/gestures.html).

Safe for server rendering and cleans up after unmount on the client.

## Installation

```sh
npm install --save react-touch-position
```

## Usage

Intended as a primitive for composing features that require notification of
touch position coordinates.

```JSX
<ReactTouchPosition>
    <YourComponentOne/>
    <YourComponentTwo/>
</ReactTouchPosition>
```
ReactTouchPosition wraps its children in a div, which touch position
is plotted relative to.

Each child component will receive a prop named `touchPosition`, which
has the following structure.

```JavaScript
{
    x: Number,
    y: Number
}
```
Optionally map custom prop names to your component interface with the `mapPropNames` feature.

### props API

`className` : String - Optionally provide a CSS class to be applied to the div rendered by react-touch-position.

`style` : String - Optionally provide a style object to be applied to the div rendered by react-touch-position.

`isActivatedOnTouch` : Boolean - Optionally activate immediately on touch. Scrolling may not be possible when scroll
gesture begins on image. Recommended only when scrolling is not an expected use case.

`mapPropNames` : Function - Optionally provide a function that returns an object, which maps property names to
your component interface. function receives one parameter with the signature `{ isActive, isTouchOutside, touchPosition }`.

`onActivationChanged` : Function - Optionally provide a function that will be called when the component is active.

`onPositionChanged` : Function - Optionally provide a function that will be called when touch position changes.
Function will receive an object containing `isPositionOutside`, `x`, and `y` properties as a single parameter.

`pressDuration` : Number - Milliseconds delay before press gesture is activated. Defaults to 500.

`pressMoveThreshold`: Number - Amount of movement allowed during press event. Defaults to 5.

`shouldDecorateChildren` : Boolean - Defaults to true. Optionally suppress `touchPosition` decoration of child components by
setting this prop false.

## Companion Project
For mouse position tracking, see [react-cursor-position](https://www.npmjs.com/package/react-cursor-position).
It has a similar architecture and interface.

## Support

Please [open an issue](https://github.com/ethanselzer/react-touch-position/issues).

## Development

```ssh
git clone https://github.com/ethanselzer/react-touch-position.git
cd react-touch-position
npm install
```
See available commands:
```ssh
npm run
```

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-touch-position/compare/).
