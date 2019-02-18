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

        
        //console.table(this.state)
    }

    handleInputChanged = (e)=>{
        const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
        this.setState({...this.state, todoChanged: {...this.state.todoChanged, [e.currentTarget.name]: value}},
            ()=>{saveState(this.state)}
            )

        
        //console.table(this.state.todoChanged)
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
            }},()=>{
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
            //console.log(e.currentTarget.name)
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

            <div className='TodoList'>

                <form type="submit" onSubmit={this.handleSubmit}>
                <label>
                    Title: 
                    <input name="title" className="todo__title-input" value={this.state.todo.title} onChange={this.handleInput}></input>
                </label>
                <label>
                    Text: 
                    <input name="text" className="todo__text-input" value={this.state.todo.text} onChange={this.handleInput}></input>
                </label>
                <label>
                    is done?: 
                    <input name="done" className="todo__done-checkbox"  type="checkbox" checked={this.state.todo.done} onChange={this.handleInput}/>
                </label>
                <button>ADD</button>
                </form>





            
            
                {this.state.todoList && this.state.todoList.sort(sortTodoList).map((el)=>{
                    
                    let result=null
                    if (el.edit){
                        result = (
                            <form name={el.id} key={el.id} type="submit" onSubmit={(e)=>{e.preventDefault()}}>
                                <input name="title" className={el.done ? 'todo__title-input done' : 'todo__title-input not-done'} value={this.state.todoChanged.title || ''} onChange={this.handleInputChanged}></input>
                                <input name="text" className={el.done ? 'todo__text-input done' : 'todo__text-input not-done'} value={this.state.todoChanged.text || ''} onChange={this.handleInputChanged}></input>
                                <input name="done" className="todo__done-checkbox"  type="checkbox" checked={this.state.todoChanged.done || ''} onChange={this.handleInputChanged}/>
                                <button name={el.id} onClick={this.handleAccept}>Accept</button>
                                <button name={el.id} onClick={this.handleDelete}>Del</button> 
                            </form>
                        )
                    } else {
                        result = (
                            <form name={el.id} key={el.id} type="submit" onSubmit={(e)=>{e.preventDefault()}}>
                                <input disabled={!el.edit} name="title" className={el.done ? 'todo__title-input done' : 'todo__title-input not-done'} value={el.title || ''} onChange={this.handleInputChanged}></input>
                                <input disabled={!el.edit} name="text" className={el.done ? 'todo__text-input done' : 'todo__text-input not-done'} value={el.text || ''} onChange={this.handleInputChanged}></input>
                                <input disabled={!el.edit} name="done" className="todo__done-checkbox"  type="checkbox" checked={el.done || ''} onChange={this.handleInputChanged}/>
                                <button name={el.id} onClick={this.handleEdit}>Edit</button>
                                <button name={el.id} onClick={this.handleDelete}>Del</button> 
                            </form>
                        )
                    }


                    return result

                })}
            
            </div>
        )
    }
}



export default TodoList