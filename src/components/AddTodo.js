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

    render() {
        return (

            <div className='AddTodo'>
                <form type="submit">
                <label>
                    Title: 
                    <input id="title" className="todo__title-input"></input>
                </label>
                <label>
                    Text: 
                    <input id="text" className="todo__text-input"></input>
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
        rmmbrSendedData: (todo) => { dispatch(addTodoAction(todo)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)