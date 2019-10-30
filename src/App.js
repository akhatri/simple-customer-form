import React, { Component } from 'react';
import './App.css';
import customerData from './data';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isModalOpen: false,
      customerData: customerData
    }
  }

  componentDidMount() {
    console.log(this.state.customerData);
  }

  addCustomer() {
    
    // show modal
    this.setState({
      isModalOpen: true
    })

    // add fixed class to body
    document.body.classList.add('is-fixed')

  }

  // Sort by Name - this is not efficient I would use lodash library. Referred to online resources due to time constraints
  sortByName(e) {

    // create a copy of customer data
    let sortedData = [...this.state.customerData];

    // using the compare function to sort by name
    const sorted = sortedData.sort((a, b) => {

      switch (e) {
        case 'asc':
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          break;
        case 'desc':
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          break;
      }
    });

    this.setState({
      customerData: sorted
    })

  }

  // Sort by City
  sortByCity(e) {

    // create a copy of customer data
    let sortedData = [...this.state.customerData];

    // using the compare function to sort by name
    const sorted = sortedData.sort((a, b) => {

      switch (e) {
        case 'asc':
          if (a.city.toLowerCase() < b.city.toLowerCase()) {
            return -1;
          }
          break;
        case 'desc':
          if (a.city.toLowerCase() > b.city.toLowerCase()) {
            return -1;
          }
          break;
      }
      
    });

    this.setState({
      customerData: sorted
    })

  }  

  // Form submission - I would try and use controlled forms next time with states for each input. I've used this approach due to time constraints. Also I've used built in HTML5 validation instead of something more custom
  handleSubmit(e) {

    e.preventDefault();

    // get form data
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const city = document.getElementById('city');

    // create a copy of customer data
    let newCustomerData = [...this.state.customerData];

    console.log(newCustomerData);

    let newCustomer = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      age: age.value,
      city: city.value
    }

    newCustomerData.unshift(newCustomer);

    this.setState({
      customerData: newCustomerData
    })

    // reset form data
    name.value = '';
    surname.value = '';
    email.value = '';
    age.value = '';
    city.value = '';

    // close modal
    this.setState({
      isModalOpen: false
    });

    // remove body fixed class
    document.body.classList.remove('is-fixed');

  }


  render() {
    return (
      <div className="site-container">

        <header>
          <span>App Header</span>
        </header>

        <main className="site-content">
          <div className="container">
            
            <div className="button-container">
              <button id="add-customer" onClick={this.addCustomer.bind(this)}>Add Customer</button>
              <button onClick={this.sortByName.bind(this, 'desc')}>Sort by Name</button>
              <button onClick={this.sortByCity.bind(this, 'desc')}>Sort by City</button>
            </div>

            <div className="card-container">
              {
                this.state.customerData.map((item, index) => {
                  return (
                    <div className="card" key={index}>
                      <h3>Name: {item.name} {item.surname}</h3>
                      <p>Email: {item.email}</p>
                      <p>Age: {item.age}</p>
                      <p>City: {item.city}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </main>
        <footer>
          <span>App Footer</span>
        </footer>

        <div className={`modal ${this.state.isModalOpen ? 'is-open' : ''}` }>
          <h1>Add a customer</h1>

          <form className="customer-form" id="add-customer-form" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" name="name" id="name" placeholder="Name (required)" required></input>
            <input type="text" name="surname" id="surname" placeholder="Surname"></input>
            <input type="email" name="email" id="email" placeholder="Email (required)" required></input>
            <input type="number" name="age" id="age" placeholder="Age (required)" required></input>
            <input type="text" name="city" id="city" placeholder="City"></input>
            <input type="submit" value="Add Customer"></input>
          </form>
        </div>


      </div>
    );

  }
}

export default App;
