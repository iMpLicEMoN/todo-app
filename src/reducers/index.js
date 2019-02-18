
const initState = {
    todo: {
        id: '',
        title: '',
        text: '',
        done: false
    },
    todoList:[]
}

const rootReducer = (state = initState, action) => {

    if (action.type === 'ADD_TODO') {
        return {
            ...state,
            todoList: [...state.todoList, action.todo]
        }
    }
    if (action.type === 'MARK_TODO') {
        state.todoList.map((el)=>{
            if (el.id===action.id){
                el.done=!el.done
            }
            return el
        })
        return {
            ...state
        }
    }
    if (action.type === 'EDIT_TODO') {
        state.todoList.map((el)=>{
            if (el.id===action.id){
                el=action
            }
            return el
        })
        return {
            ...state
        }
    }
    if (action.type === 'DELETE_TODO') {
        state.todoList.filter((el)=>!el.id===action.id)
        return {
            ...state
        }
    }
    return {
        ...state
    }
}

export default rootReducer