import React, {Component, Suspense} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import Spinner from './shared/components/Spinner';
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