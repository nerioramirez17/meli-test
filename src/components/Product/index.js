import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './styles.css';

class ProductComponent extends Component {
  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-2" >
            <Link 
              to={{
                pathname: `/items/${ this.props.data.id }`, 
                state:{breadcrumb: this.props.breadcrumb}
              }}
            >
                <img src={ this.props.data.picture } className="item-image " alt="product" />
            </Link>
          </div>
        <div className="col-md-10" style={{paddingLeft: 20}}>
              <div className="price">
                <Link  
                to={{
                  pathname: `/items/${ this.props.data.id }`, 
                  state:{breadcrumb: this.props.breadcrumb}
                }}
                >
                  <span >{ this.props.data.price.amount }</span>
                </Link>
                { this.props.data.free_shipping &&
                  <img className="free_shipping" src="/images/ic_shipping.png" alt=""></img>
                }
                <div className="address">
                  { this.props.data.address }
                </div>
              </div>
              <div className="col-md-8 padding-0">
                <h2 className="title">{ this.props.data.title }</h2>
                <div className="quantity">
                  Completo Unico!
                </div>
              </div>
          </div>  
          </div>
      </li>
    );
  }
}

export default ProductComponent;
