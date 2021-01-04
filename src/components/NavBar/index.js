import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


import './styles.css';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.submitSearch = this.submitSearch.bind(this);
    this.changueSearch = this.changueSearch.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  changueSearch(event) {
    const target = event.target;
    this.setState({
      search: target.value,
    });
  }

  submitSearch = () => {
    if (this.state.search) {
      this.props.history.push(`/items?search=${this.state.search}`);
    }
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.submitSearch();
    }
  }

  render() {
    return (
      <div>    
        <nav className="d-flex justify-content-center navbar navbar-expand-lg nav-background">
          <div className="container">
              <Link className="navbar-brand" to='/'>
                <img 
                className="logo" src='images/Logo_ML.png' alt='logo' title='logo' />
              </Link>
              <div className="input-group">
                <input type="text"
                  onSubmit={this.submitSearch}
                  onChange={this.changueSearch}
                  onKeyDown={this.keyPress}
                  placeholder='Nunca Dejes de buscar'
                  className="form-control input-lg" />
                <div className="input-group-prepend">
                  <button onClick={this.submitSearch} className="input-group-text" alt="search">
                    <img  src='images/ic_Search.png' alt='' />
                  </button>
                </div>
              </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
