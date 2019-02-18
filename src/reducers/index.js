
const initState = {
    TodoList:[]
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'ADD_TODO') {
        return {
            ...state
        }
    }
    return {
        ...state
    }
}

export default rootReducer