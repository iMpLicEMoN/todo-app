import React, { Component } from 'react'
import { loadState, saveState } from '../localStorage'

class TodoList extends Component {

    state = {
        todo: {
            id: null,
            title: '',
            text: '',
            done: false,
            edit: false
        },
        todoChanged:{
            id: null,
            title: '',
            text: '',
            done: false,
            edit: false
        },
        todoList: []
    }

    componentDidMount(){
        this.setState(loadState())
    }

    handleInput = (e)=>{
        const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
        this.setState({...this.state, todo: {...this.state.todo, [e.currentTarget.name]: value}})
    }

    handleInputChanged = (e)=>{
        const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
        this.setState({
            ...this.state, 
            todoChanged: {
                ...this.state.todoChanged, 
                [e.currentTarget.name]: value}
            },
                ()=>{saveState(this.state)
            })
    }

    handleSubmit = (e)=>{
        e.preventDefault()

        let genID = function () {
            return '_' + Math.random().toString(36).substr(2, 9);
        };

        let unicID = genID()
        this.setState({
            ...this.state, 
            todo: {
                ...this.state.todo, 
                id: unicID
            }},
            ()=>{
                this.setState({
                    ...this.state, 
                    todoList: [
                        ...this.state.todoList,
                        this.state.todo
                    ]
                },
                    ()=>{saveState(this.state)}
                )
        })
    }


    handleEdit = (e)=>{
        e.preventDefault()

        let bufList = this.state.todoList
        bufList.map((el)=>{
            if(el.id===e.currentTarget.parentElement.name){
                el.edit=true
            } else {el.edit=false}
            return el
        })

        let ch = bufList.find((el)=>el.id===e.currentTarget.parentElement.name)
        this.setState({
            ...this.state,
            todoChanged: ch
        }, ()=>{
            this.setState({
                ...this.state,
                todoList:bufList
            },
                ()=>{saveState(this.state)}
            )
        })
    }

    handleAccept = (e)=>{
        e.preventDefault()

        let bufList = this.state.todoList.map((el)=>{
            if (el.id===e.currentTarget.parentElement.name){
                el={...this.state.todoChanged}
                el.edit=false
            }
            return el
        })

        this.setState({
            ...this.state,
            todoList: bufList
        },
            ()=>{saveState(this.state)}
        )
    }

    handleDelete = (e)=>{
        e.preventDefault()

        let bufList = this.state.todoList.filter((el)=>!(el.id===e.currentTarget.parentElement.name))
        this.setState({
            ...this.state,
            todoList: bufList
        },
            ()=>{saveState(this.state)}
        )


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

            <div className="TodoApp">
            <div className="task-container columns is-multiline notification">
        <section className="column is-half is-offset-one-quarter">
        
                <form type="submit" onSubmit={this.handleSubmit}>
                <label className="label">
                    Title: 
                    <input name="title" className="input is-info is-rounded is-small" placeholder="Title" value={this.state.todo.title} onChange={this.handleInput}></input>
                </label>
                <label className="label">
                    Text: 
                    <input name="text" className="input is-rounded is-small" placeholder="Text" value={this.state.todo.text} onChange={this.handleInput}></input>
                </label>
                <label className="label">
                    Completed?: 
                    <input name="done" className="todo__done-checkbox"  type="checkbox" checked={this.state.todo.done} onChange={this.handleInput}/>
                </label>
                <button className="button is-primary">ADD</button>
                </form>
                
                </section>
                
                
                {this.state.todoList && this.state.todoList.sort(sortTodoList).map((el)=>{
                    
                    let result=null
                    if (el.edit){
                        result = (
                            <section className="card column is-half is-offset-one-quarter">
                            <form name={el.id} key={el.id} type="submit" onSubmit={(e)=>{e.preventDefault()}}>
                                <input name="title" className={el.done ? 'input is-rounded is-small done' : 'input is-rounded is-small not-done'} value={this.state.todoChanged.title || ''} onChange={this.handleInputChanged}></input>
                                <input name="text" className={el.done ? 'input is-rounded is-small done' : 'input is-rounded is-small not-done'} value={this.state.todoChanged.text || ''} onChange={this.handleInputChanged}></input>
                                <input name="done" className="todo__done-checkbox"  type="checkbox" checked={this.state.todoChanged.done || ''} onChange={this.handleInputChanged}/>
                                <button className="button is-primary is-outlined is-small" name={el.id} onClick={this.handleAccept}>Accept</button>
                                <button className="button is-danger is-outlined is-small" name={el.id} onClick={this.handleDelete}>Del</button> 
                            </form>
                            </section>
                        )
                    } else {
                        result = (
                            <section className="card column is-half is-offset-one-quarter">
                            <form className="notification" name={el.id} key={el.id} type="submit" onSubmit={(e)=>{e.preventDefault()}}>
                                <input disabled={true} name="title" className={el.done ? 'input is-rounded is-small done' : 'input is-rounded is-small not-done'} value={el.title || ''} onChange={this.handleInputChanged}></input>
                                <input disabled={true} name="text" className={el.done ? 'input is-rounded is-small done' : 'input is-rounded is-small not-done'} value={el.text || ''} onChange={this.handleInputChanged}></input>
                                <input disabled={true} name="done" className="todo__done-checkbox"  type="checkbox" checked={el.done || ''} onChange={this.handleInputChanged}/>
                                <button className="button is-info is-outlined is-small" name={el.id} onClick={this.handleEdit}>Edit</button>
                                <button className="button is-danger is-outlined is-small" name={el.id} onClick={this.handleDelete}>Del</button> 
                            </form>
                            </section>
                        )
                    }

                    return result
                })}
            
            </div>
            </div>
        )
    }
}


export default TodoList