import { useSelector } from "react-redux"
import React, { useEffect } from "react"
import { useState } from "react"
import CloseButton from "../library/close-button"
import LoaderSpinner from "../library/loader-spinner"
import L, { point } from "leaflet";

var itemIndex = 0

const EditPointsDirection = (props) =>{
    /*
        Props
        1.PointsData(lat, lang, adress)
        2.CloseAction
        3.CloseSaveAction
    */
   const currentRouteCopy = useSelector(state => state.currentRouteCopy)
   const [pageData, setPageData] = useState({
        points: props.Points
   })
   
   const closeSave = () =>{
       props.CloseSaveAction(pageData.points)
   }
   const addPoint = () =>{
      var points = pageData.points
      points.push(L.latLng(50.0, 50.0))
      setPageData({
          ...pageData, 
          points: points
      })
   }
   const removePoint = (lat, lng) =>{
        var points = []
        pageData.points.forEach(element => {
            if((element.lat === lat) && (element.lng === lng)){

            }
            else
               points.push(element)
        });
        setPageData({
            ...pageData, 
            points: points
        })
   }
   const search = () =>{

   }
   const elementChagne = (element) =>{
      var points = pageData.points
      points[element.id].lat = element.lat   
      points[element.id].lng = element.lng
      setPageData({
          ...pageData,
          points: points
      })
   }
    itemIndex = 0
    return(
        <div className='modalWindow points_directions__container' >
            
                <div className="points_directions">
                    <CloseButton CloseAction={props.CloseAction}/>
                    <div className="points_directions__scroll">
                        {pageData.points.map((e, index) =>
                            <PointItem id={index} lat={e.lat} lng={e.lng} adress={e.adress} DeleteAction={removePoint} ChangeAction={elementChagne}/>,
                        )} 
                        
                        <div className="points_directions__acitons">
                            <button className="blue-button points_directions__action-button" onClick={closeSave} >Сохранить изменения</button>
                            <button className="blue-button points_directions__action-button" onClick={props.CloseAction}>Отменить изменения</button>
                            <button className="blue-button points_directions__action-button" onClick={addPoint}>Новая контрольная точка</button>
                        </div>
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
        4. SearchAction
        5. DeleteAction
        6. ChangeAction
    */
   const [elementData, setElementData] = useState({
       isLoad: false,
       isEdit: false,
       lat: props.lat,
       lng: props.lng,
       adress: props.adress,
       id: props.id,
       oldLat: '',
       oldLng: ''
   })

   const deletePoint = () =>{
        props.DeleteAction(elementData.lat, elementData.lng)
   }
   const onChangeFormValueAction = e => {
    setElementData({
           ...elementData,
           [e.target.name]: e.target.value
         });
       };
   const editElement = () =>{
        setElementData({
            ...elementData,
            isEdit: true,
            oldLat: elementData.lat,
            oldLng: elementData.lng
        })
   }
   const cancelEdit = () =>{
        setElementData({
            ...elementData,
            isEdit: false,
            lat: elementData.oldLat,
            lng: elementData.oldLng
        })
   }
   const saveElementData = () =>{
        props.ChangeAction(elementData)
        setElementData({
            ...elementData,
            isEdit: false
        })
   }

   var mainDivClass = elementData.isLoad ? "points_directions__item loading" : "points_directions__item "
   var containerDivClas = !elementData.isEdit ? 
                                            "points_directions__item--container noedit_container" : 
                                            "points_directions__item--container"
    return(
        
       <div className={mainDivClass}> 

            {elementData.isLoad && <LoaderSpinner />}
            <div className={containerDivClas}>
                <label> Широта</label>
                <input type="text" name="lat" type="number" value={elementData.lat} onChange={onChangeFormValueAction} readOnly={!elementData.isEdit}/>
                <br/>

                <label> Долгота</label>
                <input type="text" name="lng" type="number" step="0.00001" value={elementData.lng} onChange={onChangeFormValueAction} readOnly={!elementData.isEdit}/>
                <br/>

                <button className="blue-button points_directions__item-button" onClick={deletePoint}>X</button>
               {elementData.isEdit && <button className="blue-button points_directions__item-button--cancel" onClick={cancelEdit} >Отмена</button>}
               {!elementData.isEdit && <button className="blue-button points_directions__item-button--save" onClick={editElement}>Редактировать</button>}
               {elementData.isEdit && <button className="blue-button points_directions__item-button--save" onClick={saveElementData}>Сохранить</button>}
            </div>
        </div>

    )
}