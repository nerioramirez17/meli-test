import React, { Component } from 'react';

import ProductDetail from '../../components/ProductDetail';

class Product extends Component {

  render() {
    return (
      <>
        <div className="breadcrumb">
          { this.props.location.state && this.props.location.state.breadcrumb }
        </div>
        <ProductDetail params={ this.props.match.params }/>
      </>
    )
  }
}

export default Product;
