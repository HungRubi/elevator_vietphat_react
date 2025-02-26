import actionType from "../actions/actionTypes";

const initState = {
    homeData: [],
    test: 'Helo',
    name: 'huyhung',
}

const appReducer = (state = initState, action) => {
    switch (action.type){
        case actionType.GET_HOME:
            return state
        default:
            return state
    }
}

export default appReducer