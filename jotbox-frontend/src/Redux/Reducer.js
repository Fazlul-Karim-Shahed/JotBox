
import { TEST } from "./ActionTypes"

let initialState = {


}


const Reducer = (state = initialState, action) => {


    // This is test condition
    if (action.type === TEST) {
        return state
    }
    // 


    return state

}


export default Reducer