export const deleteTodoAction = (id) => {
    return {
        type: 'DELETE_TODO',
        id: id
    }
}