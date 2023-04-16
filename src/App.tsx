import React, {useReducer, useState} from 'react';
import './App.css';
import {ShoppingList} from "./components/ShoppingList";
import {FilterValue, GoodType} from "./Typisation";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {
    addGoodsAC,
    AddShopListAC,
    ChangeGoodsStatusAC,
    DeleteGodsAC,
    DeleteShopListAC,
    shoplistReducer, UpdateGoodTitleAC, UpdateShoplistTitleAC
} from "./reducer/shoplistReducer";

export type NewShopListType = {
    title: string
    filter: FilterValue
    goods: GoodType[]
}
function App() {

    // const shoplist1 = v1()
    // const shoplist2 = v1()
    //
    // const [shoplists, setShoplists] = useState<ShoplistsType[]>([
    //     {id: shoplist1, title: "What to buy", filter: "All"},
    //     {id: shoplist2, title: "What to buy today", filter: "All"},
    // ])
    //
    // const [goods, setGoods] = useState<GoodsType>({
    //     [shoplist1]: [
    //         {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
    //         {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
    //         {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
    //         {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    //     ],
    //     [shoplist2]: [
    //         {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
    //         {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
    //         {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
    //         {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    //     ],
    // })


    const [shoplist, dispatchShoplist] = useReducer(shoplistReducer,[
        {
            title: "What to buy",
            filter: "All",
            goods: [
                {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
                {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
                {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
                {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            ]
        },
        {
            title: "What to buy today",
            filter: "All",
            goods: [
                {id: v1(), title: 'Tomato', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
                {id: v1(), title: 'Potato', expectedPrice: '$0.99', realPrice: '$0.89', inCart: false},
                {id: v1(), title: 'Cucumber', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
                {id: v1(), title: 'Sugar', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
            ]
        }
    ])

    const addGoods = (shoplistId: number, title: string) => {
        const getRandomNumberForExpectedPrice = Math.floor((Math.random() * 10) + 1)
        const getRandomNumberForRealPrice = Math.floor((Math.random() * 10) + 1)
        const addNewGoods = {
            id: v1(),
            title: title,
            expectedPrice: `$${getRandomNumberForExpectedPrice}`,
            realPrice: '$' + getRandomNumberForRealPrice,
            inCart: false
        }
        dispatchShoplist(addGoodsAC(shoplistId,addNewGoods))
        // setShoplist(shoplist.map((el, index) => index === shoplistId ? {...el, goods: [...el.goods, addNewGoods]} : el))
    }
    const changeFilterValue = (shoplistId: number, filter: FilterValue) => {
        // setShoplist(shoplist.map((el, index) => index === shoplistId ? {...el, filter: filter} : el))
        // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, filter: filter} : el))
    }
    const deleteGoods = (shoplistId: number, id: string) => {
        dispatchShoplist(DeleteGodsAC(shoplistId, id))

    }
    //
    const changeGoodsStatus = (shoplistId: number, goodsId: string, inChecked: boolean) => {
        dispatchShoplist(ChangeGoodsStatusAC(shoplistId, goodsId, inChecked))

        // setShoplist(shoplist.map((el, index) => index === shoplistId ? {...el, goods: el.goods.map(g => g.id === goodsId ? {...g, inCart: inChecked} : g)} : el))
        // setGoods({
        //     ...goods,
        //     [shoplistId]: goods[shoplistId].map(el => el.id === goodsId ? {...el, inCart: inChecked} : el)
        // })
    }
    //
    const deleteShopList = (shoplistId: number) => {
        dispatchShoplist(DeleteShopListAC(shoplistId))
        // setShoplist(shoplist.filter((el, index) => index !== shoplistId))
        // setShoplists(shoplists.filter(el => el.id !== shoplistId))
        // delete goods[shoplistId]
        // setGoods({...goods})
    }
    //
    const AddShopList = (shoplistTitle: string) => {
        // const newShoplistId = v1()
        const newShopList: NewShopListType = {title: shoplistTitle, filter: "All", goods: []}

        dispatchShoplist(AddShopListAC(newShopList))

    }
    //
    const updateGoodTitle = (shoplistId: number, goodId: string, newTitle: string) => {
        // setShoplist(shoplist.map((el, index) => index === shoplistId ? {...el, goods: el.goods.map(g => g.id === goodId ? {...g, title: newTitle} : g)} : el))
        // setGoods({
        //     ...goods,
        //     [shoplistId]: goods[shoplistId].map(el => el.id === goodId ? {...el, title: newTitle} : el)
        // })
        dispatchShoplist(UpdateGoodTitleAC(shoplistId, goodId, newTitle))

    }
    const updateShoplistTitle = (shoplistId: number, newTitle: string) => {
        // setShoplist(shoplist.map((el, index) => index === shoplistId ? {...el, title: newTitle} : el))
        // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, title: newTitle} : el))
        dispatchShoplist(UpdateShoplistTitleAC(shoplistId, newTitle))
    }

    const mappedShoplists = shoplist.map((el, index) => {

        let filteredGoods: Array<GoodType> = []
        if (el.filter === 'All') {
            filteredGoods = el.goods
        }
        if (el.filter === 'Not to buy') {
            filteredGoods = el.goods.filter(el => el.inCart !== true)
        }
        if (el.filter === 'Bought') {
            filteredGoods = el.goods.filter(el => el.inCart === true)
        }

        return (
            <ShoppingList
                key={index}
                title={el.title}
                goods={filteredGoods}
                addGoods={addGoods}
                changeFilterValue={changeFilterValue}
                deleteGoods={deleteGoods}
                changeGoodsStatus={changeGoodsStatus}
                filter={el.filter}
                deleteTodoList={deleteShopList}
                shoplistId={index}
                updateGoodTitle={updateGoodTitle}
                updateShoplistTitle={updateShoplistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm callback={AddShopList}/>
            {/*<span><input type="text" value={title} onChange={onChangeHadler}/><button onClick={AddShopList}>send new todo</button></span>*/}
            {mappedShoplists}
        </div>
    );
}

export default App;
