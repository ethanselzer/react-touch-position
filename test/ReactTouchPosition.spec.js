import React from 'react';
import { noop, omit } from 'lodash';
import { shallow, mount, render } from 'enzyme';
import { expect, match } from 'chai';
import sinon from 'sinon';

import ReactTouchPosition from '../src/ReactTouchPosition';
import GenericSpanComponent from './support/GenericSpanComponent';

describe('ReactTouchPosition', () => {
    let touchObserver;
    const touchEvent = getTouchEvent();

    beforeEach(() => {
        touchObserver = shallow(<ReactTouchPosition/>);
    });

    it('has the display name ReactTouchPosition', () => {
        expect(touchObserver.instance().constructor.displayName).to.equal('ReactTouchPosition');
    });

    it('renders a single div HTML element', () => {
        expect(touchObserver.type()).to.equal('div');
    });

    it('has correct initial state', () => {
        expect(touchObserver.instance().getInitialState()).to.deep.equal({
            isActive: false,
            isPositionOutside: true,
            touchPosition: {
                x: 0,
                y: 0
            }
        });
    });

    it('has correct default props', () => {
        const defaults = touchObserver.instance().constructor.getDefaultProps();
        expect(defaults.isActivatedOnTouch).to.equal(false);
        expect(defaults.mapChildProps).to.be.a('function');
        expect(defaults.pressDuration).to.equal(500);
        expect(defaults.pressMoveThreshold).to.equal(5);
        expect(defaults.shouldDecorateChildren).to.equal(true);
        expect(defaults.onActivationChanged).to.be.a('function');
        expect(defaults.onPositionChanged).to.be.a('function');
    });

    it('decorates child components with props', () => {
        const renderedTree = getMountedComponentTree({ isActivatedOnTouch: true });
        const childComponent = renderedTree.find(GenericSpanComponent);

        renderedTree.instance().onTouchStart(getTouchEvent({ clientX: 5, clientY: 6 }));

        expect(childComponent.props()).to.deep.equal({
            isActive: true,
            isPositionOutside: true,
            touchPosition: {
                x: 5,
                y: 6
            }
        });
    });

    it('does not decorate child DOM nodes with props', () => {
        const renderedTree = getMountedComponentTree({isActivatedOnTouch: true});
        const childComponent = renderedTree.find('hr');

        renderedTree.instance().onTouchStart(touchEvent);

        expect(childComponent.props()).to.be.empty;
    });

    it('calls clearPressDurationTimer on componentWillUnmount', () => {
        const instance = touchObserver.instance();
        sinon.spy(instance, 'clearPressDurationTimer');

        instance.componentWillUnmount();

        expect(instance.clearPressDurationTimer).to.have.been.called;
    });

    it('calls removeEventListeners on componentWillUnmount', () => {
        const instance = touchObserver.instance();
        sinon.spy(instance, 'removeEventListeners');

        instance.componentWillUnmount();

        expect(instance.removeEventListeners).to.have.been.called;
    });

    it('calls removeEventListener on each item in eventListeners collection on componentWillUnmount', () => {
        const instance = touchObserver.instance();
        const removeEventListener = sinon.spy();
        const eventListener = { removeEventListener };
        instance.eventListeners.push(eventListener, eventListener);

        instance.componentWillUnmount();

        expect(removeEventListener.calledTwice).to.be.true;
    });

    it('drains eventListeners collection on componentWillUnmount', () => {
        const instance = touchObserver.instance();
        const removeEventListener = sinon.spy();
        const eventListener = { removeEventListener };
        instance.eventListeners.push(eventListener, eventListener);

        instance.componentWillUnmount();

        expect(instance.eventListeners.length).to.equal(0);
    });

    describe('Props Passed to Child Components', () => {
        it('supports isActive prop', () => {
            const renderedTree = getMountedComponentTree({ isActivatedOnTouch: true });
            const childComponent = renderedTree.find(GenericSpanComponent);
            const instance = renderedTree.instance();
            expect(childComponent.props().isActive).to.be.false;

            instance.onTouchStart(touchEvent);
            expect(childComponent.props().isActive).to.be.true;

            instance.unsetIsActive();
            expect(childComponent.props().isActive).to.be.false;

            instance.onTouchStart(touchEvent);
            expect(childComponent.props().isActive).to.be.true;

            instance.unsetIsActive();
            expect(childComponent.props().isActive).to.be.false;
        });

        it('supports isPositionOutside prop', () => {
            const renderedTree = getMountedComponentTree({ isActivatedOnTouch: true });
            const childComponent = renderedTree.find(GenericSpanComponent);
            const instance = renderedTree.instance();
            expect(childComponent.props().isPositionOutside).to.be.true;

            instance.onTouchStart(touchEvent);

            instance.onTouchMove(getTouchEvent({ clientX: 2, clientY: 3 }));
            expect(childComponent.props().isPositionOutside).to.be.false;

            instance.onTouchMove(getTouchEvent({ clientX: 5, clientY: 5 }));
            expect(childComponent.props().isPositionOutside).to.be.true;

            instance.onTouchMove(getTouchEvent({ clientX: 2, clientY: 3 }));
            expect(childComponent.props().isPositionOutside).to.be.false;

            instance.unsetIsActive();
            expect(childComponent.props().isPositionOutside).to.be.true;

            instance.onTouchStart(touchEvent);
            instance.onTouchMove(getTouchEvent({ clientX: 2, clientY: 3 }));
            expect(childComponent.props().isPositionOutside).to.be.false;

            instance.unsetIsActive();
            expect(childComponent.props().isPositionOutside).to.be.true;
        });

        it('supports touchPosition prop', () => {
            const renderedTree = getMountedComponentTree({ isActivatedOnTouch: true });
            const childComponent = renderedTree.find(GenericSpanComponent);
            const instance = renderedTree.instance();
            instance.onTouchStart(touchEvent);

            instance.onTouchMove(getTouchEvent({ clientX: 1, clientY: 2 }));
            expect(childComponent.props().touchPosition).to.deep.equal({
                x: 1,
                y: 2
            });

            instance.onTouchMove(getTouchEvent({ clientX: 2, clientY: 3 }));
            expect(childComponent.props().touchPosition).to.deep.equal({
                x: 2,
                y: 3
            });
        });
    });

    describe('Props API', () => {
        it('supports className', () => {
            const tree = getMountedComponentTree({ className: 'foo' });

            expect(tree.find('div').hasClass('foo')).to.equal(true);
        });

        it('supports style', () => {
            const tree = render(<ReactTouchPosition style={{ width: '100px' }}/>);

            expect(tree.find('div').css('width')).to.equal('100px');
        });

        it('supports isActivatedOnTouch', () => {
            const tree = getMountedComponentTree({ isActivatedOnTouch: true });
            const childComponent = tree.find(GenericSpanComponent);
            expect(childComponent.props().isActive).to.be.false;

            tree.instance().onTouchStart(touchEvent);

            expect(childComponent.props().isActive).to.be.true;
        });

        it('supports mapChildProps', () => {
            function mapChildProps({ isActive, isPositionOutside, touchPosition }) {
                return {
                    isOperative: isActive,
                    isAlfresco: isPositionOutside,
                    point: touchPosition
                };
            }
            const tree = getMountedComponentTree({
                mapChildProps,
                isActivatedOnTouch: true
            });
            const childComponent = tree.find(GenericSpanComponent);

            tree.instance().onTouchStart(touchEvent);

            expect(childComponent.props()).to.deep.equal({
                isOperative: true,
                isAlfresco: false,
                point: {
                    x: 1,
                    y: 2
                }
            });
        });

        it('supports onPositionChanged callback', (done) => {
            const tree = getMountedComponentTree({
                isActivatedOnTouch: true,
                onPositionChanged
            });
            tree.instance().onTouchStart(touchEvent);

            tree.instance().onTouchMove(touchEvent({ clientX: 2, clientY: 3}));

            function onPositionChanged(point) {
                expect(point).to.deep.equal({
                    isPositionOutside: false,
                    touchPosition: {
                        x: 1,
                        y: 2
                    }
                });
                done();
            }
        });

        it('supports onActivationChanged callback', (done) => {
            const tree = getMountedComponentTree({
                isActivatedOnTouch: true,
                onActivationChanged
            });
            tree.instance().onTouchStart(touchEvent);

            function onActivationChanged({isActive}) {
                expect(isActive).to.be.true;
                done();
            }
        });

        it('supports shouldDecorateChildren', () => {
            const tree = getMountedComponentTree({
                isActivatedOnTouch: true,
                shouldDecorateChildren: false
            });
            const childComponent = tree.find(GenericSpanComponent);
            const instance = tree.instance();
            instance.onTouchStart(touchEvent);

            instance.onTouchMove(getTouchEvent({ clientX: 3, clientY: 4 }));

            expect(childComponent.props()).to.be.empty;
        });

        describe('Support for pressDuration', () => {
            it('sets isActive if pressThreshold is not exceeded for duration', () => {
                const clock = sinon.useFakeTimers();
                const tree = getMountedComponentTree({
                    pressDuration: 100,
                    pressMoveThreshold: 5
                });
                const childComponent = tree.find(GenericSpanComponent);
                tree.instance().onTouchStart(touchEvent);
                tree.instance().onTouchMove(getTouchEvent({ clientX: 3, clientY: 4 }));
                expect(childComponent.props().isActive).to.be.false;

                clock.tick(101);

                expect(childComponent.props().isActive).to.be.true;
                clock.restore();
            });

            it('does not set isActive before duration elapses', () => {
                const clock = sinon.useFakeTimers();
                const tree = getMountedComponentTree({
                    pressDuration: 100
                });
                const childComponent = tree.find(GenericSpanComponent);
                tree.instance().onTouchStart(touchEvent);
                expect(childComponent.props().isActive).to.be.false;

                clock.tick(99);

                expect(childComponent.props().isActive).to.be.false
                clock.restore();
            });
        });

        describe('Support for pressMoveThreshold', () => {
            it('sets isActive if movement is constrained to the threshold within the specified duration ', () => {
                const clock = sinon.useFakeTimers();
                const tree = getMountedComponentTree({
                    pressDuration: 100,
                    pressMoveThreshold: 5
                });
                const childComponent = tree.find(GenericSpanComponent);
                tree.instance().onTouchStart(touchEvent);

                tree.instance().onTouchMove(getTouchEvent({ clientX: 3, clientY: 4 }));
                clock.tick(101);

                expect(childComponent.props().isActive).to.be.true;
                clock.restore();
            });

            it('does not set isActive if movement exceeds threshold within the specified duration', () => {
                const clock = sinon.useFakeTimers();
                const tree = getMountedComponentTree({
                    pressDuration: 100,
                    pressMoveThreshold: 5
                });
                const childComponent = tree.find(GenericSpanComponent);
                tree.instance().onTouchStart(touchEvent);

                tree.instance().onTouchMove(getTouchEvent({ clientX: 10, clientY: 10 }));
                clock.tick(101);

                expect(childComponent.props().isActive).to.be.false
                clock.restore();
            });
        });
    });

    function getMountedComponentTree(props = {}) {
        return mount(
            <ReactTouchPosition { ...props }>
                <GenericSpanComponent />
                <hr />
            </ReactTouchPosition>
        );
    }

    function getTouchEvent({clientX = 1, clientY = 2} = {}) {
        return {
            currentTarget: {
                getBoundingClientRect() {
                    return {
                        top: 0,
                        right: 4,
                        bottom: 4,
                        left: 0,
                        heigth: 4,
                        width: 4
                    }
                }
            },
            preventDefault: noop,
            touches: [{
                clientX,
                clientY
            }]
        };
    }
});
