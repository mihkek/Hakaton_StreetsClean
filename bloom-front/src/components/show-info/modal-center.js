
import arrow_back from '../../styles/images/arrow_back.png'

const ModalCenter = (props) =>{
    /*
        Props
        1.CloseAction
        2.TargetAction
        3.Text
        4.Header
    */
    return(
        <div className='modalWindow modalMessage' >
        <div className='modalWindow-dialog' >
        
            <div className='modalWindow-header'>
            <img className="arrow" src={arrow_back} onClick={props.TargetAction}/>
            <h3 className='modalWindow-title'></h3>
            <span className='modalWindow-close' >
            </span>
            </div>
          
            <div className='modalWindow-body'>
                <h1>{props.route.name}</h1>
            <div className='modalWindow-content'>Время работы -  {props.route.timeWork}</div>
            <div className='modalWindow-content'>Вид техники - {props.route.typeTeh.name}</div>
            <div className='modalWindow-content'>Количество единиц техники - {props.route.tehCount}</div>
            </div>
            
            <div className='modalWindow-footer'>
                <button className="blue-button" onClick={props.CloseAction}>Закрыть</button>
            </div>
            
        </div>
     </div>
    )
}
export default ModalCenter