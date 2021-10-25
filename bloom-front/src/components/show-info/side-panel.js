import { useState } from "react"
import * as tehTypes from '../constants/tehnikTypes'

const SidePanel = (props) =>{
    /*
        Props
        1.Route
        2.SaveAction
        3.CloseAction
    */
   var t = props.route.points[0]
   
   const [pageData, setPageData] = useState({
        route: {
            name: props.route.name,
            timeWork: props.route.timeWork,
            typeTeh: props.route.typeTeh,
            tehCount: props.route.tehCount
        }
   })
   const save = () =>{
        props.SaveAction({route: pageData.route})
   }
   const onChangeFormValueAction = e => {
    setPageData({
           ...pageData,
           route: {
               ...pageData.route,
               [e.target.name]: e.target.value
            }
         });
       };
    const onChangeSelectvalue = e =>{
        // var type = {}
        // if(e.target.value === tehTypes.tractor.number)
        //     type = tehTypes.tractor
        // if(e.target.value === tehTypes.kamaz.number)
        //     type = tehTypes.kamaz
        // setPageData({
        //     ...pageData,
        //     route:{
        //         ...pageData.route,
        //         typeTeh: type
        //     }
        // })
    }
    return(
        <div className='modalWindow backpanel' >
            <div className="backpanel-dialog">
                <h3>Подробная информация о маршруте</h3>
                
                <div className="myContainer">
                   
                   <div>
                        <label for="routeName" class="placeholder">Название маршрута</label>
                        <input name="name" type="text" value={pageData.route.name} onChange={onChangeFormValueAction}/>
                    </div>

                    <div>
                        <label for="routeName" class="placeholder">Время работ</label>
                        <input name="timeWork" type="text" value={pageData.route.timeWork} onChange={onChangeFormValueAction} />
                    </div>
                    <div>
                        <label for="routeName" class="placeholder">Начальная точка</label>
                        <input name="startPoint" type="text" value={props.route.points[0]} onChange={onChangeFormValueAction}/>
                    </div>

                    <div>
                        <label for="routeName" class="placeholder">Конечная точка</label>
                        <input name="endPoint" type="text" value={props.route.points[props.route.points.length-1]} onChange={onChangeFormValueAction}/>
                    </div>
              
                    <div>
                       <label for="routeName" class="placeholder">Вид техники</label>
                        <select name="typeTeh" value={pageData.typeTeh} onChange={onChangeSelectvalue}>
                            <option value={tehTypes.tractor.number}>{tehTypes.tractor.name}</option>
                            <option value={tehTypes.kamaz.number}>{tehTypes.kamaz.name}</option>
                        </select>
                    </div>
                    <div>
                        <label for="routeName" class="placeholder">Количество единиц техники</label>
                        <input name="tehCount" type="number" value={pageData.route.tehCount} onChange={onChangeFormValueAction}/>
                    </div>
                </div>

                <button className="blue-button" onClick={save}>Сохранить</button>
                <button className="blue-button" onClick={props.CloseAction}>Закрыть</button>
            </div>
     </div>
    )
}
export default SidePanel