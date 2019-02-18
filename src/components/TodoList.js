import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodoAction } from '../actions/deleteTodoAction'
import { markTodoAction } from '../actions/markTodoAction'
import { editTodoAction } from '../actions/editTodoAction'

class TodoList extends Component {
    state = {
        todo: {
            id: '',
            title: '',
            text: '',
            done: false
        },
        todoList: []
    }


    componentDidMount(){
        this.setState({
            todo: this.props.todo,
            todoList: this.props.todoList
        })
    }

    handleEdit = (e)=>{
        let bufList = this.state.todoList
        bufList.map((el)=>{
            if (el.id===e.currentTarget.pointer){
                this.setState({
                    ...this.state,
                    todo: {
                        id: el.id,
                        title: el.title,
                        text: el.text,
                        done: el.done
                    }
                })
            }
            return null
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
            <ul>
                {this.props.todoList && this.props.todoList.sort(sortTodoList).map((el)=>{
                    return(
                        
                            <li id={el.id} key={el.id} className={el.done ? 'done' : 'not-done'}>
                                {el.title} 
                                <button type="done" pointer={el.id}>Done</button> 
                                <button type="edit" pointer={el.id} onClick={this.handleEdit}>Edit</button> 
                                <button type="delete" pointer={el.id}>Del</button>
                                <div>{el.text}</div>
                                
                            </li>
                            
                                
                            
                        
                    )
                })}
            </ul>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        todo: state.todo,
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