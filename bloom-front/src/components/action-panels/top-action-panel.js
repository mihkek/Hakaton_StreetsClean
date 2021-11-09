import { useState } from "react"
import API from "../../functions/API";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { set_load } from "../../state_container/actions";

const TopPanel = (props) =>{
    /*Props
         1. RefreshAction
    */
    const dispatch = useDispatch()
    const isLoad = useSelector(state => state.isLoad)
    const [pageData, setPageData] = useState({
        name: ''
    })
    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
           };
    const click = () =>{
        dispatch(set_load({
            isLoad: true
        }))
        API({
            method: 'post', 
            url: 'add_route', 
            secure: true,
            headers: {},
            data: {
                'name': pageData.name
            }   
        })
        .then( response => {
            props.RefreshAction()
            dispatch(set_load({
                isLoad: false
            }))
        })
        .catch( err=>{
             console.log(err)
             dispatch(set_load({
                isLoad: false
            }))
        })
    }
    return(
        <div className='modalWindow toppanel' >
            <div className="toppanel-dialog">
                <h3>Название маршрута - <input type="text" name="name" value={pageData.name} onChange={onChangeFormValueAction}/> <button onClick={click}>Добавить</button></h3>
            </div>
        </div>
    )
}
export default TopPanel