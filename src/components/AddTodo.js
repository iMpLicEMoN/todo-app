import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodoAction } from '../actions/addTodoAction'

class AddTodo extends Component {

    state = {
        todo: {
            title: '',
            text: ''
        }
    }

    handleInput = (e)=>{
        this.setState({...this.state, todo: {...this.state.todo, [e.currentTarget.id]: e.currentTarget.value}})
        //console.table(this.state)
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.addTodoAction(this.state.todo)
    }

    render() {
        return (

            <div className='AddTodo'>
                <form type="submit" onSubmit={this.handleSubmit}>
                <label>
                    Title: 
                    <input id="title" className="todo__title-input" onChange={this.handleInput}></input>
                </label>
                <label>
                    Text: 
                    <input id="text" className="todo__text-input" onChange={this.handleInput}></input>
                </label>
                <button>ADD</button>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        todo: state.todo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoAction: (todo) => { dispatch(addTodoAction(todo)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)