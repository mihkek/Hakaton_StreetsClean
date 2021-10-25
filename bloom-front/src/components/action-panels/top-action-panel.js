import { useState } from "react"

const TopPanel = (props) =>{
    /*Props
        1.ButtonAction
    */
    const [pageData, setPageData] = useState({
        adress: ''
    })
    const onChangeFormValueAction = e => {
        setPageData({
               ...pageData,
               [e.target.name]: e.target.value
             });
           };
    const click = () =>{
        props.ButtonAction(pageData.adress)
    }
    return(
        <div className='modalWindow toppanel' >
            <div className="toppanel-dialog">
                <h3>Адрес - <input type="text" name="adress" value={pageData.adress} onChange={onChangeFormValueAction}/> <button onClick={click}>Найти</button></h3>
            </div>
     </div>
    )
}
export default TopPanel