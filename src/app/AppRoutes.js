import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Spinner from './shared/components/spinner/Spinner';
import routes from "./shared/objects/routes";


class AppRoutes extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    {routes.map((r) => (
                        <Route key={r.to} exact path={r.to} component={r.component} />
                    ))}
                    <Redirect to="/stocks"/>
                </Switch>
            </Suspense>
        );
    }
}

export default AppRoutes;
