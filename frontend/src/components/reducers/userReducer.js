export function userReducer(state=null,action){
    switch(action.type){
        case 'LOGIN':
            return "logggggggin"
        case 'LOGOUT':
            return "outttttt"
        default:
            return state
    }
}