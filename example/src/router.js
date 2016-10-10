import React from 'react';
import { Router, Route } from 'react-router';

import Touch from './pages/Touch';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Touch} />
    </Router>
);

export default Routes;
