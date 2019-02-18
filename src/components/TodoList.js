import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodoAction } from '../actions/deleteTodoAction'
import { markTodoAction } from '../actions/markTodoAction'
import { editTodoAction } from '../actions/editTodoAction'

class TodoList extends Component {
    state = {
        todoList: []
    }


    componentDidMount(){
        this.setState({
            todoList: this.props.todoList
        })
    }


    render() {

        function sortTodoList(a,b) {
            if (a.title < b.title)
              return 1;
            if (a.title > b.title)
              return -1;
            return 0;
          }

        return (

            <div className='TodoList'>
                {this.props.todoList && this.props.todoList.sort(sortTodoList).map((el)=>{
                    return(
                        <div>
                            <div>
                                {el.title} 
                                <button id="done">Done</button> 
                                <button id="edit">Edit</button> 
                                <button id="delete">Del</button>
                            </div>
                            <div>
                                {el.text}
                            </div>
                        </div>
                    )
                })}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        todoList: state.todoList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodoAction: (todo) => { dispatch(deleteTodoAction(todo)) },
        markTodoAction: (todo) => { dispatch(markTodoAction(todo)) },
        editTodoAction: (todo) => { dispatch(editTodoAction(todo)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)