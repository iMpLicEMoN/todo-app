export const deleteTodoAction = (todo) => {
    return {
        type: 'DELETE_TODO',
        todo: todo
    }
}