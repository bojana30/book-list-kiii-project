import React, { Fragment } from 'react';
import './App.css';

// components 
import BookInput from './components/BookInput';
import ListBooks from './components/ListBooks';

function App() {
  return <Fragment>
    <div className="container">
    <BookInput/>
    <ListBooks/>
    </div>
    
  </Fragment>;
}



export default App;
