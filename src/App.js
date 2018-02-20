import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from './Firebase.js';
import ProductListItem from './ProductListItem.js';
import './App.css';

class App extends Component {
  constructor() {
    console.log('constructor() Called');
    super();
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    console.log('componentDidMount() called');
    const productsReference = firebase.database().ref('products');
    productsReference.on('value', (snapshot) => {
      let products = snapshot.val();
      console.log('Products from Firebase: ', products);
      let newState = [];
      for (let product in products) {
        newState.push({
          name: products[product].name,
          price: products[product]['price']['cost'],
          onSale: products[product].price.sale
        })
      }
      this.setState({
        products: newState
      })
    });
  }
  createProductsList() {
    let productsList = this.state.products.map((product) => {
      console.log(product)
      if (product.onSale === true) {
        product.sale = 'ON SALE';
      }
      console.log('Current App State:', this.state);
      console.log('Current Products in JSX:', productsList);
      return (
        <ProductListItem product={product} />
      )
    });
    return productsList;
  }
  render() {
    console.log('render() called');
    let productList = this.createProductsList();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <h4 className="App-intro">List of Products</h4>
         <ul>
           {productList}
         </ul>
        </div>
    );
  }
}

export default App;
