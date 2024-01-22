export interface IBurgerList{
    icon?:string;
    name: string;
    link: string;
}

export interface IMap{
    id: number,
    name: string,
    activity: boolean,
    image: string,
    width: number,
    height: number
}

export interface IPlace{
    id: number,
    name: string,
    image: string,
    accaunt_id: null,
    activity: boolean,
    visible: boolean,
    status_bron: boolean,
    x: number,
    y: number,
    width: number,
    height: number
}

export interface IInteractiveMap{
    map: IMap,
    places: IPlace[]
}

export interface IPlaceElement{
    id: number,
    name: string,
    image: string,
    width: number,
    height: number
}