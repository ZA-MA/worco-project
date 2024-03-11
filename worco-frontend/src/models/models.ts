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
    height: number,
    places?: IPlace[]
}

export interface IElement {
    id: number,
    type: string,
    image: string,
    width: number,
    height: number,
    only_indicator: boolean,
    indicator_x: number,
    indicator_y: number,
    indicator_size: number,
    options: string,

    places?: IPlace[]
}

export interface INewElement {
    id?: number,
    type?: string,
    image?: string,
    width?: number,
    height?: number,
    only_indicator?: boolean,
    indicator_x?: number,
    indicator_y?: number,
    indicator_size?: number,
    options: string
}

export interface IPlace{
    id: number,
    number_place: number | null,
    can_bron: boolean,
    visible: boolean,
    x: number,
    y: number,
    price: number,
    map_id: number,

    element_id: number
    element: IElement
    options: IOption[]
}

export interface IOption{
    option: string,
    active: boolean
}

export interface IInteractiveMap{
    map: IMap,
    places: IPlace[],
}



export interface IHint{
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number,
    height: number
}

