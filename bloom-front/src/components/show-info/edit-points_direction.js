import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import CloseButton from "../library/close-button"


const EditPointsDirection = (props) =>{
    /*
        Props
        1.PointsData(lat, lang, adress)
        2.CloseAction
        3.CloseSaveAction
    */
    return(
        <div className='modalWindow points_directions__container' >
            
                <div className="points_directions">
                    <CloseButton CloseAction={props.CloseAction}/>
                    
                  
                    <PointItem />
                    <PointItem />
                    <PointItem />
                    <PointItem />
                    <PointItem />
                    <PointItem />
                    <PointItem />
                    <PointItem />
                    
                    <div className="points_directions__acitons">
                        <button className="blue-button points_directions__action-button">Сохранить изменения</button>
                        <button className="blue-button points_directions__action-button">Отменить изменения</button>
                        <button className="blue-button points_directions__action-button">Новая контрольная точка</button>
                    </div>
                </div>
            </div>
    )
}
export default EditPointsDirection

const PointItem = (props) =>{
    /*
        Props
        1. Lat
        2. Lng
        3. Adress
    */
    return(
        <div className="points_directions__item">
            <div className="points_directions__item--container">
                <label> Широта</label>
                <input type="text" value="Test"/>
                <br/>

                <label> Долгота</label>
                <input type="text" value="Test"/>
                <br/>

                <label> Адрес</label>
                <input type="text" value="Test"/>

                <button className="blue-button points_directions__item-button">X</button>
                <button className="blue-button points_directions__item-button--save">s</button>
            </div>
        </div>

    )
}