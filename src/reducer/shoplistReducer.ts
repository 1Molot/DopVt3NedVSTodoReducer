import {NewShopListType} from "../App"

export let shoplistReducer = (state: NewShopListType[], action: actionType) => {
    switch (action.type) {
        case 'ADD-GOODS': {
            return state.map((el, index) => index === action.payload.shoplistId ? {...el, goods: [...el.goods, action.payload.addNewGoods]} : el)
        }
        case "ADD-SHOPLIST":{
            return [...state,action.payload.newShopList]
        }
        case 'DELETE-GOODS':{
            return state.map((el, index) => index === action.payload.shoplistId ? {...el, goods: el.goods.filter(g => g.id !== action.payload.id)} : el)
        }
        case 'DELETE-SHOPLIST':{
            return state.filter((el, index) => index !== action.payload.shoplistId)
        }
        case 'CHANGE-GOODS-STATUS':{
            return state.map((el, index) => index === action.payload.shoplistId ? {...el, goods: el.goods.map(g => g.id === action.payload.goodsId ? {...g, inCart: action.payload.inChecked} : g)} : el)
        }
        case 'UPDATE-GOOD-TITLE':{
            return state.map((el, index) => index === action.payload.shoplistId ? {...el, goods: el.goods.map(g => g.id === action.payload.goodId ? {...g, title: action.payload.newTitle} : g)} : el)
        }
        case 'UPDATE-SHOPLIST-TITLE':{
            return state.map((el, index) => index === action.payload.shoplistId ? {...el, title: action.payload.newTitle} : el)
        }
        default:
            return state
    }
}
type actionType = addGoodsACType|AddShopListACType|DeleteGodsACType|DeleteShopListACType|ChangeGoodsStatusACType|UpdateGoodTitleACType|UpdateShoplistTitleACType

type addGoodsACType = ReturnType<typeof addGoodsAC>
export const addGoodsAC = (shoplistId: number, addNewGoods: {
    id: string,
    title: string,
    expectedPrice: string,
    realPrice: string,
    inCart: boolean
}) => {
    return {
        type: 'ADD-GOODS',
        payload: {
            shoplistId, addNewGoods
        }
    } as const
}

type AddShopListACType=ReturnType<typeof AddShopListAC>
export const AddShopListAC=(newShopList: NewShopListType)=>{
    return{
        type:'ADD-SHOPLIST',
        payload:{newShopList}
    }as const
}
type DeleteGodsACType = ReturnType<typeof DeleteGodsAC>
export const DeleteGodsAC = (shoplistId: number, id: string)=>{
    return{
        type: 'DELETE-GOODS',
        payload:{
            shoplistId,
            id
        }
    }as const
}
type DeleteShopListACType = ReturnType<typeof DeleteShopListAC>
export const DeleteShopListAC = (shoplistId: number)=>{
    return{
        type: 'DELETE-SHOPLIST',
        payload:{
            shoplistId
        }
    }as const
}

type ChangeGoodsStatusACType = ReturnType<typeof ChangeGoodsStatusAC>
export const ChangeGoodsStatusAC = (shoplistId: number, goodsId: string, inChecked: boolean)=>{
    return{
        type: 'CHANGE-GOODS-STATUS',
        payload:{
            shoplistId,
            goodsId,
            inChecked
        }
    }as const
}
type UpdateGoodTitleACType = ReturnType<typeof UpdateGoodTitleAC>
export const UpdateGoodTitleAC = (shoplistId: number, goodId: string, newTitle: string)=>{
    return{
        type: 'UPDATE-GOOD-TITLE',
        payload:{
            shoplistId,
            goodId,
            newTitle
        }
    }as const
}
type UpdateShoplistTitleACType = ReturnType<typeof UpdateShoplistTitleAC>
export const UpdateShoplistTitleAC = (shoplistId: number, newTitle: string)=>{
    return{
        type: 'UPDATE-SHOPLIST-TITLE',
        payload:{
            shoplistId,
            newTitle
        }
    }as const
}