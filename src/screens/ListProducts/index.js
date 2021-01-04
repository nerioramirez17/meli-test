import React, { Component } from 'react';
import { parse } from 'qs'
import NavBar from '../../components/NavBar';
import Product from '../../components/Product';
import './styles.css'

class ListProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      breadcrumb: ""
    };
  }

  componentDidMount() {
    const query = parse(this.props.location.search.substr(1));
    query.search && this.getProducts(query.search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search.substr(1) !== this.props.location.search.substr(1)) {
      const query = parse(this.props.location.search.substr(1));
      console.log(query);
      this.getProducts(query.search)
    }
  }

  /**
   * @function getProducts
   * @param {string} search search string
   * @returns {function} return products from api meli
   */
  getProducts(search){
    fetch('/api/items?q=' + search)
    .then(response => response.json())
    .then(response => {
      this.setState({ products: response.items, breadcrumb: response.categories })
    })
    .catch(error => console.log(error));
  }

  /**
   * @function breadcrumb
   * @param {Array} categories an array of categories for search
   * @returns {function} return breadcrum
   */
  breadcrumb = (categories) => {
    var breadcrumb;
    (categories.length > 0) 
      ? breadcrumb = categories.join(" > ") 
      : breadcrumb= null;
    return breadcrumb
  }

  render() {
    return (
      <>
        <div className="breadcrumb">
          { this.breadcrumb(this.state.breadcrumb) }
        </div>
        <ol className="list-group container search-results">
          { this.state.products.map((product, key) => 
            <Product 
              key={key} 
              data={ product } 
              breadcrumb={this.breadcrumb(this.state.breadcrumb)} 
            />) 
          }
        </ol>
      </>
    );
  }
}

export default ListProducts;