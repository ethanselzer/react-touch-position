(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'lodash.omit', './utils/addEventListener', 'create-react-class'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('lodash.omit'), require('./utils/addEventListener'), require('create-react-class'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.lodash, global.addEventListener, global.createReactClass);
        global.ReactTouchPosition = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _lodash, _addEventListener, createReactClass) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _addEventListener2 = _interopRequireDefault(_addEventListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = createReactClass({

        displayName: 'ReactTouchPosition',

        getInitialState: function getInitialState() {
            return {
                isActive: false,
                isPositionOutside: true,
                touchPosition: {
                    x: 0,
                    y: 0
                }
            };
        },


        propTypes: {
            children: _propTypes2.default.any,
            className: _propTypes2.default.string,
            isActivatedOnTouch: _propTypes2.default.bool,
            mapChildProps: _propTypes2.default.func,
            onActivationChanged: _propTypes2.default.func,
            onPositionChanged: _propTypes2.default.func,
            pressDuration: _propTypes2.default.number,
            pressMoveThreshold: _propTypes2.default.number,
            shouldDecorateChildren: _propTypes2.default.bool,
            style: _propTypes2.default.object
        },

        getDefaultProps: function getDefaultProps() {
            var noop = function noop() {};

            return {
                isActivatedOnTouch: false,
                mapChildProps: function mapChildProps(props) {
                    return props;
                },
                onActivationChanged: noop,
                onPositionChanged: noop,
                pressDuration: 500,
                pressMoveThreshold: 5,
                shouldDecorateChildren: true
            };
        },
        onTouchStart: function onTouchStart(e) {
            var touch0 = e.touches[0];
            var viewportRelativePosition = this.getViewportRelativeTouchPosition(touch0);

            this.elementOffsetRect = this.getViewportRelativeElementRect(e.currentTarget);
            this.setPosition(viewportRelativePosition);

            if (this.props.isActivatedOnTouch) {
                e.preventDefault();

                this.setState({
                    isActive: true
                });

                this.props.onActivationChanged({ isActive: true });

                return;
            }

            this.initPressEventCriteria(viewportRelativePosition);

            this.setPressEventTimer();
        },
        onTouchMove: function onTouchMove(e) {
            var touch0 = e.touches[0];
            var viewportRelativePosition = this.getViewportRelativeTouchPosition(touch0);

            if (!this.state.isActive) {
                this.setPressEventCriteria(viewportRelativePosition);
                return;
            }

            this.setPosition(viewportRelativePosition);

            e.preventDefault();
        },
        unsetIsActive: function unsetIsActive() {
            this.clearPressDurationTimer();

            this.setState({
                isActive: false,
                isPositionOutside: true
            });

            this.props.onActivationChanged({ isActive: false });
        },
        setPosition: function setPosition(viewportRelativeTouchPosition) {
            var elementOffsetRect = this.elementOffsetRect;
            var touchPosition = this.getElementRelativeTouchPosition(viewportRelativeTouchPosition, elementOffsetRect);
            var isPositionOutside = this.getIsPositionOutside(viewportRelativeTouchPosition, elementOffsetRect);

            this.setState({
                touchPosition: touchPosition,
                isPositionOutside: isPositionOutside
            });

            this.props.onPositionChanged({ isPositionOutside: isPositionOutside, touchPosition: touchPosition });
        },
        setPressEventTimer: function setPressEventTimer() {
            var _this = this;

            var _props = this.props,
                onActivationChanged = _props.onActivationChanged,
                pressDuration = _props.pressDuration,
                pressMoveThreshold = _props.pressMoveThreshold;


            this.pressDurationTimerId = setTimeout(function () {
                if (Math.abs(_this.currentElTop - _this.initialElTop) < pressMoveThreshold) {
                    _this.setState({ isActive: true });
                    onActivationChanged({ isActive: true });
                }
            }, pressDuration);
        },
        setPressEventCriteria: function setPressEventCriteria(position) {
            this.currentElTop = position.y;
        },
        initPressEventCriteria: function initPressEventCriteria(position) {
            var top = position.y;
            this.initialElTop = top;
            this.currentElTop = top;
        },
        getViewportRelativeElementRect: function getViewportRelativeElementRect(el) {
            return el.getBoundingClientRect();
        },
        getIsPositionOutside: function getIsPositionOutside(viewportRelativeTouchPosition, elementOffsetRect) {
            var viewportRelativeTouchX = viewportRelativeTouchPosition.x,
                viewportRelativeTouchY = viewportRelativeTouchPosition.y;
            var offsetTop = elementOffsetRect.top,
                offsetRight = elementOffsetRect.right,
                offsetBottom = elementOffsetRect.bottom,
                offsetLeft = elementOffsetRect.left;


            return viewportRelativeTouchX < offsetLeft || viewportRelativeTouchX > offsetRight || viewportRelativeTouchY < offsetTop || viewportRelativeTouchY > offsetBottom;
        },
        getViewportRelativeTouchPosition: function getViewportRelativeTouchPosition(touch) {
            return {
                x: touch.clientX,
                y: touch.clientY
            };
        },
        getElementRelativeTouchPosition: function getElementRelativeTouchPosition(viewportRelativetouchPosition, elementOffsetRect) {
            var touchX = viewportRelativetouchPosition.x,
                touchY = viewportRelativetouchPosition.y;
            var offsetX = elementOffsetRect.left,
                offsetY = elementOffsetRect.top;


            return {
                x: touchX - offsetX,
                y: touchY - offsetY
            };
        },
        isReactComponent: function isReactComponent(reactElement) {
            return typeof reactElement.type === 'function';
        },
        shouldDecorateChild: function shouldDecorateChild(child) {
            return this.isReactComponent(child) && this.props.shouldDecorateChildren;
        },
        decorateChild: function decorateChild(child, props) {
            return (0, _react.cloneElement)(child, props);
        },
        decorateChildren: function decorateChildren(children, props) {
            var _this2 = this;

            return _react.Children.map(children, function (child) {
                return _this2.shouldDecorateChild(child) ? _this2.decorateChild(child, props) : child;
            });
        },
        clearPressDurationTimer: function clearPressDurationTimer() {
            clearTimeout(this.pressDurationTimerId);
        },


        eventListeners: [],

        addEventListeners: function addEventListeners() {
            this.eventListeners.push((0, _addEventListener2.default)(this.el, 'touchstart', this.onTouchStart, { passive: false }), (0, _addEventListener2.default)(this.el, 'touchmove', this.onTouchMove, { passive: false }), (0, _addEventListener2.default)(this.el, 'touchend', this.unsetIsActive, { passive: true }), (0, _addEventListener2.default)(this.el, 'touchcancel', this.unsetIsActive, { passive: true }));
        },
        removeEventListeners: function removeEventListeners() {
            while (this.eventListeners.length) {
                this.eventListeners.pop().removeEventListener();
            }
        },
        componentDidMount: function componentDidMount() {
            this.addEventListeners();
        },
        componentWillUnmount: function componentWillUnmount() {
            this.clearPressDurationTimer();
            this.removeEventListeners();
        },
        getPassThroughProps: function getPassThroughProps() {
            var ownPropNames = Object.keys(this.constructor.propTypes);
            return (0, _lodash2.default)(this.props, ownPropNames);
        },
        render: function render() {
            var _this3 = this;

            var _props2 = this.props,
                children = _props2.children,
                className = _props2.className,
                mapChildProps = _props2.mapChildProps,
                style = _props2.style;
            var _state = this.state,
                isActive = _state.isActive,
                isPositionOutside = _state.isPositionOutside,
                touchPosition = _state.touchPosition;

            var props = Object.assign({}, mapChildProps({
                isActive: isActive,
                isPositionOutside: isPositionOutside,
                touchPosition: touchPosition
            }), this.getPassThroughProps());

            return _react2.default.createElement(
                'div',
                {
                    className: className,
                    ref: function ref(el) {
                        return _this3.el = el;
                    },
                    style: Object.assign({}, style, {
                        WebkitUserSelect: 'none'
                    })
                },
                this.decorateChildren(children, props)
            );
        }
    });
});