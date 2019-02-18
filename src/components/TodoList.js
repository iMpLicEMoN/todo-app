import React, { Component } from 'react'

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
        return (

            <div className='TodoList'>
                {this.state.todoList && this.state.todoList.map((el)=>{
                    return(
                        <div>
                            <div>
                                {el.title}
                            </div>
                            <div>
                                {el.title}
                            </div>
                        </div>
                    )
                })}
            </div>

        )
    }
}

export default TodoList