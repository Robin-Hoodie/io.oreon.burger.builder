import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}}/>);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ingredients: {}
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should not render <BuildControls /> when not receiving ingredients', () => {
        wrapper.setProps({
            ingredients: null
        });
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});