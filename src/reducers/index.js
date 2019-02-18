
const initState = {
    todoList:[]
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'ADD_TODO') {
        return {
            todoList: [...state.todoList, action.todo]
        }
    }
    if (action.type === 'MARK_TODO') {
        return {
            todoList: [...state.todoList, action.todo]
        }
    }
    if (action.type === 'EDIT_TODO') {
        return {
            todoList: [...state.todoList, action.todo]
        }
    }
    if (action.type === 'DELETE_TODO') {
        return {
            todoList: [...state.todoList, action.todo]
        }
    }
    return {
        ...state
    }
}

export default rootReducer