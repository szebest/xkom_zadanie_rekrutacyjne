import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import React from 'react';
import SelectinonPage from './pages/SelectionPage/SelectionPage';
import SeatsPage from './pages/SeatsPage/SeatsPage';
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={SelectinonPage} />
            </Switch>
            <Switch>
                <Route exact path="/seats" component={SeatsPage} />
            </Switch>
            <Switch>
                <Route exact path="/checkout" component={CheckoutPage} />
            </Switch>
        </Router>
    );
}
