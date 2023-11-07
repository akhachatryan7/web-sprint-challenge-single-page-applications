import React, { useState, useEffect} from "react";
import { Routes, Route, Link } from 'react-router-dom'
import "../src/App.css"
import Home from './Home'
import Pizza from "./Pizza";

import axios from "axios";
import form from './Form'
import * as yup from 'yup'




export default function App() {
   

    const startingformValues = {
  name: '',
  size: '',
  topping1: false,
  topping2: false,
  specialInstructions: '',
  
}
const startingformErrors= {
 name: '',
 size: '',
 specialInstructions:'',
 

}

const initialPizzaOrder = []
const initialDisabled = true


const [pizzaOrder, setPizzaOrder] = useState(initialPizzaOrder)   
const [formValues, setFormValues] = useState(startingformValues)  
const [formErrors, setFormErrors] = useState(startingformErrors)
const [disabled, setDisabled] = useState(initialDisabled)

const validate = (name, value) => {
  yup.reach(form, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: '' }))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
}
useEffect(() => {

  form.isValid(formValues).then(valid => setDisabled(!valid))
}, [formValues])

const postNewOrder = newOrder => {
  axios.post('https://reqres.in/api/orders', newOrder)
  .then(({data}) => {
    setPizzaOrder([data,...pizzaOrder])
    console.log(data)
  })
  .catch(err => console.error(err))
  .finally(() => (setFormValues(startingformValues)))

}

const inputChange = (name, value) => {
  // If the name includes a space, replace it with an underscore
  const updatedName = name.replace(/\s+/g, '_');
  validate(name, value);
  setFormValues({
    ...formValues,
    [updatedName]: value,
  });
};




const submitOrder = () => {
  const newOrder = {
  name: formValues.name.trim(),
  size: formValues.size.trim(),
  toppings: ['peperoni', 'cheese', 'olives', 'onions'].filter(piz => !!formValues[piz]),
  specialInstructions: formValues['specialInstructions'], // Use the correct name with an underscore
};

postNewOrder(newOrder);
}




return (
  <div className="App">
      <nav>
            <h1 className="App-header"> Gold Dust Pizza </h1>
              <div className="nav-links">
                <Link to="/"> Home</Link> 
                <Link to="/pizza"> Order </Link>
                
              </div>
        </nav>
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pizza"
          element={<Pizza 
          values={formValues} 
          submit={submitOrder} 
          change={inputChange} 
          disabled={disabled} 
          errors={formErrors}/>} />
      </Routes>
      
     
     
  </div>
  );
}