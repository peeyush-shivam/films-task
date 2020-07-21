import React, { Component } from 'react';
import Films from '../Films';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css';

class App extends Component {
  
  render() {
    return <Router>
      <div>
        <p className="films-analysis-service">Films Analysis Service </p>
        {/* 
           TODO Navigate to the Films component, passing in the director name that was entered into the director name input box.
           This must be implemented as a Form. 
           The id of the form must be "input-form".
           The id of the director name input box must be "input-box".
           Note we use <div> below for display purposes only.
          */}

        <Route path="/" component={Form}/>



        <Route exact path='/films' component={Films}/> 
      </div>
    </Router>
  }

}

class Form extends React.Component{
  state = {
    name: ''
  }
  handleChange = (e) => {
    const name = e.target.value
    this.setState({ name })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push(`/films?directorName=${this.state.name}`)
  }
  render(){
    return(
      <form id="input-form" >
          <input id="input-box" className="director-name-input-box" placeholder="Enter director name" onChange={(e) => this.handleChange(e)}
            value={this.state.name}
          />
          
          <button type="submit" onClick={(e) => this.handleSubmit(e)} className="submit-button" >SUBMIT</button>
        </form>
    )
  }
}

export default App;