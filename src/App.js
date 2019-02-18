import React, { Component } from 'react'
import './App.css'
import TodoList from './components/TodoList'

class App extends Component {
  render() {
    return (
      <div className="App">

        <section className="hero has-background-silver">
          <div className="hero-body">
            <div className="container">
              <figure className="image center is-size-2">
                So what's the plan?
              </figure>
            </div>
          </div>
		    </section>



        <TodoList />
      </div>
    )
  }
}

export default App
