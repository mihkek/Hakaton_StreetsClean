const CloseButton = (props) =>{
    /*
        Props
        1.CloseAction
    */
    return(
        <div class="cl-btn-2" onClick={props.CloseAction}>
                        <div>
                            <div class="leftright"></div>
                            <div class="rightleft"></div>
                            <span class="close-btn">Close</span> 
                        </div>
        </div>
    )
}
export default CloseButton