import * as CREATORS from './action_creator'
export const set_load = (params) =>{
    return{
        type: CREATORS.SET_LOAD,
        params
    }
}
export const set_routs = (params) =>{
    return {
        type: CREATORS.SET_ROUTS,
        params
    }
}
export const unset_routs = (params) =>{
    return{
        type: CREATORS.UNSET_ROUTS,
        params
    }
}
export const select_route = (params) =>{
    return{
        type: CREATORS.SELECT_ROUTE,
        params
    }
}
export const change_route = (params) =>{
    return{
        type: CREATORS.CHANGE_ROUTE,
        params 
    }
} 
export const edit_selected_route = (params) =>{
    return{
        type: CREATORS.EDIT_SELECTED_ROUTE,
        params
    }
}
