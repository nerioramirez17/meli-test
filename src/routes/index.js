import React, { Component } from 'react';
import { Switch, BrowserRouter, Route,} from "react-router-dom";

import Home from "../screens/Home";
import ListProducts from "../screens/ListProducts";
import Product from "../screens/Product";

import NavBar from '../components/NavBar';


class Routes extends Component {

  render(){
    return (
      <BrowserRouter>
        <NavBar history={this.props.history} />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/items" component={ListProducts} />
            <Route exact path="/items/:id" component={Product} />
          </Switch> 
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes;