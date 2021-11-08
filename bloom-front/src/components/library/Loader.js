const Loader = () =>{
    return(
        <div className="modalWindow">
            <h1 className="loader-message">Загрузка...</h1>
        </div>
    )
}
export const ErrorLoader = (props) =>{
    return(
        <div className="modalWindow">
            <h1 className="loader-message--error">{props.errorMessage}</h1>
        </div>
    )
}
export default Loader