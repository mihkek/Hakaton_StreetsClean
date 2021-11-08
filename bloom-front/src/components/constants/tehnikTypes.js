
export const tractor = {number: 1, name:"Трактор", image:"/images/tractor.png"}
export const kamaz = {number: 2, name: "Камаз", image: "/images/vehicle1.png"}

export const getByNumber = (num) =>{
    switch(num){
        case tractor.number:
            return tractor
        case kamaz.number:
            return kamaz
        default:
            return {number: num,  name: "Not defined", image: ""}
    }
}