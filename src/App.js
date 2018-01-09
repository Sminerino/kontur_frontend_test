import React, { Component } from 'react';
import './styles/styles.css';
import { StartPage } from "./ViewComponents/StartPage/StartPage";
import PlayFieldContainer from './redux/Containers/PlayFieldContainer/PlayFieldContainer';
import { Nothing } from "./ViewComponents/404/Nothing";
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={ StartPage } />
                    <Route path='/game' component={() => <PlayFieldContainer size={9}/>} />
                    <Route component={Nothing} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
