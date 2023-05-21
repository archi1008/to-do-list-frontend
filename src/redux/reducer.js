import * as types from './actionsType';

const initialState = {
    tasks : [],
    task:{},
    msg:""
}

const taskReducer = (state=initialState, action)=>{
    switch(action.type){
        case types.GET_TASKS:
            return{
                ...state,
                tasks: action.payload
            }

        case types.ADD_TASK:
            return{
                ...state,
                msg: action.payload
            }  
            
        case types.DELETE_TASK:
            return{
                ...state,
                msg: action.payload
            }   
            
        case types.GET_SINGLE_TASK:
            return{
                ...state,
                task: action.payload
            }   
            
        case types.UPDATE_TASK:
            return{
                ...state,
                msg: action.payload
            }    
        default:
         return state;
    }
}

export default taskReducer;