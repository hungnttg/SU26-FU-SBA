//npm i @reduxjs/toolkit react-redux
import React from "react";
import { configureStore,createSlice } from "@reduxjs/toolkit";
import { Provider,useDispatch,useSelector } from "react-redux";
//--------------------xu ly gio hang=================
const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items: [], //danh sach san pham
    },
    reducers:{
        addItem: (state,action)=>{
            state.items.push(action.payload);//them san pham vao gio hang
        },
        removeItem: (state,action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload);//xoa
        },
        clearCart: (state) =>{
            state.items = [];//xoa gio hang
        },
    },
});
//nap cac ham vao kho trang thai
const store = configureStore({
    reducer: cartSlice.reducer
});
//khai bao cac hanh dong
const {addItem,removeItem,clearCart}=cartSlice.actions;
//giao dien gio hang
function CartUI(){
    const items = useSelector((state)=> state.items);
    const dispatch = useDispatch();
    //danh sach san pham
    const sampleProducts = [
        {id:1,name:"Tao"},{id:2,name:"Cam"},{id:3,name:"Xoai"},
    ];
    return(
        <div style={{padding:20}}>
            <h1>Gio hang</h1>
            <h2>San pham co san</h2>
            {sampleProducts.map((product)=>(
                <div key={product.id}>
                    {product.name}{" "}
                    <button onClick={()=>dispatch(addItem(product))}>Add to Cart</button>
                </div>
            ))}
            <h2>Gio hang</h2>
            {items.length === 0? (
                <p>Chua cos san pham nao</p>
            ):(
                <ul>
                    {items.map((item)=>(
                        <li key={item.id}>
                            {item.name}{" "}
                            <button onClick={()=>dispatch(removeItem(item.id))}>Xoa</button>
                        </li>
                    ))}
                </ul>
            )}
            {/* xoa toan bo gio hang */}
            {items.length > 0 && (
                <button onClick={()=>dispatch(clearCart())}>Xoa hey gio hang</button>
            )}
        </div>
    );
}
export default function Slot20(){
    return(
        <Provider store={store}>
            <CartUI/>
        </Provider>
    );
}