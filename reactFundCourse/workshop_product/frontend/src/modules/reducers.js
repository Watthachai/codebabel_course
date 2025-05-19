import { combineReducers } from 'redux';

import ui from 'modules/ui/reducer';
import product from 'modules/products/reducer';
import cart from 'modules/products/reducer'

export default combineReducers({
    ui,
    product,
    cart

})
