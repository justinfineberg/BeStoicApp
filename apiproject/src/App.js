import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import React from 'react'
import {getQuote} from './actions/actions'

function App(props) {

  const handleClick = ()=>{
    props.dispatch(getQuote())
  }

  return (
    <div className="App">
    <h1> A Stoic Reflection</h1>
    <h2>Take a famous stoic quote and turn it into your own words.</h2>
    <button onClick={handleClick}>Get Quote</button>
    <div>
      <h3>
        "{props.quoteObj.text}"
      </h3>
      <h5>
        -{props.quoteObj.author}
      </h5>
    </div>
    {props.isFetching && <h2>Getting You A Quote!</h2>}
    {props.err && <h2>There is an error!</h2>}
    </div>
  );
}

const mapStateToProps = (state)=>{
  return ({
    quoteObj: state.quoteObject,
    isFetching: state.isFetching,
    err: state.err
  })
}

export default connect(mapStateToProps)(App);
