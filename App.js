import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from './components/layout/NavBar';
import Home from './components/home/home';
import Dashboard from './components/layout/Dashboard';
import About from './components/about/about';
import Pokemon from './components/pokemon/Pokemon';
import errorNotFount from './components/notFound';
import LayoutRoute from './LayoutRoute';
import { Provider } from 'react-redux';
import myStore from './reducers/index';


class App extends Component {
  render(){
    return(
        <Provider store={myStore}>
            <Router>
                <div className={'bg-body'}>
                    <NavBar></NavBar>
                    <Container>
                        <Switch>
                            <Route exact path={'/'} component={Home} />
                            <LayoutRoute exact path={'/list'} component={Dashboard} />
                            <LayoutRoute path={'/about'} component={About} />
                            <LayoutRoute path={'/list/pokemon/:pokemonIndex'} component={Pokemon} />

                            <Route component={errorNotFount} />
                        </Switch>
                    </Container>
                </div>
            </Router>
        </Provider>
    )
  }
}

export default App;
