import React, {
    Children,
    cloneElement
} from 'react';
import PropTypes from 'prop-types'; // ES6
import omit from 'lodash.omit';

import addEventListener from './utils/addEventListener';

export default React.createClass({

    displayName: 'ReactTouchPosition',

    getInitialState() {
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
        children: PropTypes.any,
        className: PropTypes.string,
        isActivatedOnTouch: PropTypes.bool,
        mapChildProps: PropTypes.func,
        onActivationChanged: PropTypes.func,
        onPositionChanged: PropTypes.func,
        pressDuration: PropTypes.number,
        pressMoveThreshold: PropTypes.number,
        shouldDecorateChildren: PropTypes.bool,
        style: PropTypes.object
    },

    getDefaultProps() {
        const noop = () => {};

        return {
            isActivatedOnTouch: false,
            mapChildProps: props => props,
            onActivationChanged: noop,
            onPositionChanged: noop,
            pressDuration: 500,
            pressMoveThreshold: 5,
            shouldDecorateChildren: true
        };
    },

    onTouchStart(e) {
        const touch0 = e.touches[0];
        const viewportRelativePosition = this.getViewportRelativeTouchPosition(touch0);

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

        this.setPressEventTimer()
    },

    onTouchMove(e) {
        const touch0 = e.touches[0];
        const viewportRelativePosition = this.getViewportRelativeTouchPosition(touch0);

        if (!this.state.isActive) {
            this.setPressEventCriteria(viewportRelativePosition);
            return;
        }

        this.setPosition(viewportRelativePosition);

        e.preventDefault();
    },

    unsetIsActive() {
        this.clearPressDurationTimer();

        this.setState({
            isActive: false,
            isPositionOutside: true
        });

        this.props.onActivationChanged({ isActive: false });
    },

    setPosition(viewportRelativeTouchPosition) {
        const elementOffsetRect = this.elementOffsetRect;
        const touchPosition = this.getElementRelativeTouchPosition(viewportRelativeTouchPosition, elementOffsetRect);
        const isPositionOutside = this.getIsPositionOutside(viewportRelativeTouchPosition, elementOffsetRect);

        this.setState({
            touchPosition,
            isPositionOutside
        });

        this.props.onPositionChanged({ isPositionOutside, touchPosition });
    },

    setPressEventTimer() {
        const {
            onActivationChanged,
            pressDuration,
            pressMoveThreshold
        } = this.props;

        this.pressDurationTimerId = setTimeout(() => {
            if (Math.abs(this.currentElTop - this.initialElTop) < pressMoveThreshold) {
                this.setState({ isActive: true });
                onActivationChanged({ isActive: true });
            }
        }, pressDuration);
    },

    setPressEventCriteria(position) {
        this.currentElTop = position.y;
    },

    initPressEventCriteria(position) {
        const top = position.y
        this.initialElTop = top;
        this.currentElTop = top;
    },

    getViewportRelativeElementRect(el) {
        return el.getBoundingClientRect();
    },

    getIsPositionOutside(viewportRelativeTouchPosition, elementOffsetRect) {
        const { x: viewportRelativeTouchX, y: viewportRelativeTouchY } = viewportRelativeTouchPosition;
        const {
            top: offsetTop,
            right: offsetRight,
            bottom: offsetBottom,
            left: offsetLeft
        } = elementOffsetRect;

        return (
            viewportRelativeTouchX < offsetLeft ||
            viewportRelativeTouchX > offsetRight ||
            viewportRelativeTouchY < offsetTop ||
            viewportRelativeTouchY > offsetBottom
        );
    },

    getViewportRelativeTouchPosition(touch) {
        return {
            x: touch.clientX,
            y: touch.clientY
        }
    },

    getElementRelativeTouchPosition(viewportRelativetouchPosition, elementOffsetRect) {
        const { x: touchX, y: touchY } = viewportRelativetouchPosition;
        const { left: offsetX, top: offsetY } = elementOffsetRect;

        return {
            x: touchX - offsetX,
            y: touchY - offsetY
        };
    },

    isReactComponent(reactElement) {
        return typeof reactElement.type === 'function';
    },

    shouldDecorateChild(child) {
        return this.isReactComponent(child) && this.props.shouldDecorateChildren;
    },

    decorateChild(child, props) {
        return cloneElement(child, props);
    },

    decorateChildren(children, props) {
        return Children.map(children, (child) => {
            return this.shouldDecorateChild(child) ? this.decorateChild(child, props) : child;
        });
    },

    clearPressDurationTimer() {
        clearTimeout(this.pressDurationTimerId);
    },

    eventListeners: [],

    addEventListeners() {
        this.eventListeners.push(
            addEventListener(this.el, 'touchstart', this.onTouchStart, { passive: false }),
            addEventListener(this.el, 'touchmove', this.onTouchMove, { passive: false }),
            addEventListener(this.el, 'touchend', this.unsetIsActive, { passive: true }),
            addEventListener(this.el, 'touchcancel', this.unsetIsActive, { passive: true })
        );
    },

    removeEventListeners() {
        while (this.eventListeners.length) {
            this.eventListeners.pop().removeEventListener();
        }
    },

    componentDidMount() {
        this.addEventListeners();
    },

    componentWillUnmount() {
        this.clearPressDurationTimer();
        this.removeEventListeners();
    },

    getPassThroughProps() {
        const ownPropNames = Object.keys(this.constructor.propTypes);
        return omit(this.props, ownPropNames);
    },

    render() {
        const { children, className, mapChildProps, style } = this.props;
        const { isActive, isPositionOutside, touchPosition } = this.state;
        const props = Object.assign(
            {},
            mapChildProps({
                isActive,
                isPositionOutside,
                touchPosition
            }),
            this.getPassThroughProps()
        );

        return (
            <div { ...{
                className,
                ref: (el) => this.el = el,
                style: Object.assign({}, style, {
                    WebkitUserSelect: 'none'
                })
            }}>
                { this.decorateChildren(children, props) }
            </div>
        );
    }
});
