export const getColor = () =>{
    const max = 5
    const min = 1
    var number =  Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("get color - " + number)
    switch(number){
        case 1: return "red"
        case 2: return "green"
        case 3: return "black"
        case 4: return "blue"
        case 5: return "orange"
        default: return "gray"
    }
}