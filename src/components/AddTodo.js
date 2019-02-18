import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodoAction } from '../actions/addTodoAction'

class AddTodo extends Component {

    state = {
        todo: {
            id: '',
            title: '',
            text: '',
            done: false
        }
    }

    handleInput = (e)=>{
        const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
        this.setState({...this.state, todo: {...this.state.todo, [e.currentTarget.id]: value}})

        
        //console.table(this.state)
    }

    handleSubmit = (e)=>{
        e.preventDefault()

        var genID = function () {
            return '_' + Math.random().toString(36).substr(2, 9);
        };
        this.setState({...this.state, todo: {...this.state.todo, id: !this.state.todo.id ? genID() : this.state.todo.id}})
        this.props.addTodoAction(this.state.todo)
    }

    render() {
        return (

            <div className='AddTodo'>
                <form type="submit" onSubmit={this.handleSubmit}>
                <label>
                    Title: 
                    <input id="title" className="todo__title-input" value={this.state.todo.title} onChange={this.handleInput}></input>
                </label>
                <label>
                    Text: 
                    <input id="text" className="todo__text-input" value={this.state.todo.text} onChange={this.handleInput}></input>
                </label>
                <label>
                    is done?: 
                    <input id="done" className="todo__done-checkbox"  type="checkbox" checked={this.state.todo.done} onChange={this.handleInput}/>
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