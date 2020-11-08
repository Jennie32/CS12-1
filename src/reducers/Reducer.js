const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXECUTIONS':
            return {
                ...state,
                executions: action.payload
            };
        case 'ADD_EXECUTION':
            return {
                ...state,
                executions: state.executions.concat(action.payload)
            };
        case 'REMOVE_EXECUTION':
            return {
                ...state,
                executions: state.executions.filter(post => post.id !== action.payload)
            };
        case 'SET_HASLOADED':
                return {
                    ...state,
                    hasloaded: action.payload
                };
        case 'SET_NEXTTOKEN':
            return {
                ...state,
                nexttoken: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;