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

export interface IElement {
    id: number,
    type: string,
    image: string,
    width: number,
    height: number,
    indicator_visible: boolean,
    indicator_x: number,
    indicator_y: number,
    indicator_size: number
}

export interface INewElement {
    id?: number,
    type?: string,
    image?: string,
    width?: number,
    height?: number,
    indicator_visible?: boolean,
    indicator_x?: number,
    indicator_y?: number,
    indicator_size?: number
}

export interface IPlace{
    id: number,
    number_place: number | null,
    can_bron: boolean,
    visible: boolean,
    x: number,
    y: number,
    opt_conditioner: boolean,
    opt_printer: boolean,
    opt_scanner: boolean,
    price: number,

    name: string,
    image: string,
    width: number,
    height: number,
    indicator_visible: boolean,
    indicator_x: number,
    indicator_y: number,
    indicator_size: number
}

export interface IMeetingRoom{
    id: number,
    number_place: number,
    can_bron: boolean,
    visible: boolean,
    x: number,
    y: number,
    opt_conditioner: boolean,
    opt_projector: boolean,
    opt_tv: boolean,
    opt_soundproof: boolean,
    price: number,

    name: string,
    image: string,
    width: number,
    height: number,
    indicator_visible: boolean,
    indicator_x: number,
    indicator_y: number,
    indicator_size: number
}

export interface IOffice{
    id: number,
    number_place: number,
    can_bron: boolean,
    visible: boolean,
    x: number,
    y: number,
    opt_conditioner: boolean,
    opt_printer: boolean,
    opt_scanner: boolean,
    opt_video_control: boolean,
    opt_internet: boolean,
    opt_add_equipment: boolean,
    price: number,

    name: string,
    image: string,
    width: number,
    height: number,
    indicator_visible: boolean,
    indicator_x: number,
    indicator_y: number,
    indicator_size: number
}

export interface IInteractiveMap{
    map: IMap,
    places: IPlace[]
}



export interface IHint{
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number,
    height: number
}

