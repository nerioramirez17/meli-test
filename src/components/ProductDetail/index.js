import React, { Component } from 'react';

import './styles.css';

class ProductDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      products: {},
      dataIsReturned: false
    }
  }

  componentDidMount() {
    if (this.props.params.id) {
      fetch('/api/items/' + this.props.params.id)
        .then(response => {
          if(response.status === 200){
            return response.json()
          } else {
            window.alert(response.statusText);
          }})
        .then(response => {
          this.setState({ products: response.product, dataIsReturned: true });
        })
        .catch((error) => {
          console.log('error',error);
        })
    }
  }

  render() {
    const description = this.state.products.items && this.state.products.items.description.split('\n')
      .map((item, key) => <span key={key}>{item}<br/></span>)
    return (
        <div className="container product-container">
        { this.state.dataIsReturned
          ?
          <>
            <div className="row">
              <div className="col-md-8">
                  <img className="img-detail" src={this.state.products.items.picture} alt="producto-imagen" />
              </div>
              <div className="col-4">
                <div className="card-body">
                  <small className="card-text font-size-14 padding-top-32">
                    {this.state.products.items.condition === 'new' ? 'Nuevo' : 'Usado'} - {this.state.products.items.sold_quantity} vendidos
                  </small>
                  <h5 className="card-title font-size-24 padding-bottom-35">
                    {this.state.products.items.title}
                  </h5>
                  <h2 className="card-title font-size-24 padding-bottom-35">
                    {this.state.products.items.price.amount}
                  </h2>
                  <div className="purchase">
                      <button className="button"> 
                        Comprar
                      </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='padding-top-32 bg-transparent'>
                  <h2 className="margin-bottom-50">Descripcion del producto</h2>
                <p className='card-text'>
                  <p className="font-size-16">{description}</p>
                </p>
                </div>
              </div>
            </div> 
          </>
           : null
        }
        </div> 
    ) 
  }
}

export default ProductDetail;
