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

    it('renders a single div html element', () => {
        expect(touchObserver.type()).to.equal('div');
    });

    it('has correct initial state', () => {
        expect(touchObserver.instance().getInitialState()).to.deep.equal({
            isActive: false,
            isTouchOutside: false,
            touchPosition: {
                x: 0,
                y: 0
            }
        });
    });

    it('has correct default props', () => {
        const defaults = touchObserver.instance().constructor.getDefaultProps();
        expect(defaults.isActivatedOnTouch).to.equal(false);
        expect(defaults.mapPropNames).to.be.a('function');
        expect(defaults.pressDuration).to.equal(500);
        expect(defaults.pressMoveThreshold).to.equal(5);
        expect(defaults.shouldDecorateChildren).to.equal(true);
        expect(defaults.onActivationChanged).to.be.a('function');
        expect(defaults.onPositionChanged).to.be.a('function');
    });

    it('decorates child components with touchPosition prop', () => {
        const renderedTree = getMountedComponentTree({isActivatedOnTouch: true});
        const childComponent = renderedTree.find(GenericSpanComponent);
        const el = renderedTree.find('div');

        el.simulate('touchStart', touchEvent);

        expect(childComponent.props()).to.deep.equal({
            isActive: true,
            isTouchOutside: false,
            touchPosition: {
                x: 1,
                y: 2
            }
        });
    });

    it('does not decorate child DOM nodes with touchPosition prop', () => {
        const renderedTree = getMountedComponentTree({isActivatedOnTouch: true});
        const childComponent = renderedTree.find('hr');
        const el = renderedTree.find('div');

        el.simulate('touchStart', touchEvent);

        expect(childComponent.props()).to.be.empty;
    });

    describe('Optional props API', () => {
        it('supports className', () => {
            const tree = getMountedComponentTree({ className: 'foo' });

            expect(tree.find('div').hasClass('foo')).to.equal(true);
        });

        it('supports style', () => {
            const tree = render(<ReactTouchPosition style={{ width: '100px' }}/>);

            expect(tree.find('div').css('width')).to.equal('100px');
        });

        it('supports onTouchPositionChanged callback', (done) => {
            const tree = getMountedComponentTree({
                isActivatedOnTouch: true,
                onPositionChanged
            });
            const el = tree.find('div');
            el.simulate('touchStart', touchEvent);

            function onPositionChanged(point) {
                expect(point).to.deep.equal({
                    isPositionOutside: true,
                    x: 1,
                    y: 2
                });
                done();
            }
        });

        it('supports onActivationChanged callback', (done) => {
            const tree = getMountedComponentTree({
                isActivatedOnTouch: true,
                onActivationChanged
            });
            const el = tree.find('div');
            el.simulate('touchStart', touchEvent);

            function onActivationChanged({isActive}) {
                expect(isActive).to.be.true;
                done();
            }
        });

        it('supports pressDuration', () => {
            const clock = sinon.useFakeTimers();
            const tree = getMountedComponentTree({ pressDuration: 250 });
            const childComponent = tree.find(GenericSpanComponent);
            childComponent.simulate('touchStart', touchEvent);
            expect(childComponent.props().isActive).to.be.false;

            clock.tick(251);

            expect(childComponent.props().isActive).to.be.true;
            clock.restore();
        });

        it('supports pressMoveThreshold', () => {
            const clock = sinon.useFakeTimers();
            const tree = getMountedComponentTree();
            const childComponent = tree.find(GenericSpanComponent);
            childComponent.simulate('touchStart', touchEvent);

            childComponent.simulate('touchMove', getTouchEvent({ clientX: 10, clientY: 10 }));
            clock.tick(501);

            expect(childComponent.props().isActive).to.be.false
            clock.restore();
        });

        it('supports shouldDecorateChildren, which suppresses decoration of child components when set false', () => {
            const tree = getMountedComponentTree({ shouldDecorateChildren: false });
            const childComponent = tree.find(GenericSpanComponent);
            childComponent.simulate('touchStart', touchEvent);

            childComponent.simulate('touchMove', touchEvent);

            expect(childComponent.props()).to.be.empty;
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
                        top: 1,
                        right: 2,
                        bottom: 3,
                        left: 4
                    }
                }
            },
            touches: [{
                clientX,
                clientY
            }]
        };
    }
});
