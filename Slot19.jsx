//bai toan gio hang
import React,{useState} from "react";

export default function Slot19(){
    //state gio hang
    const [items,setItems]=useState([]);//khoi tao mang gio hang
    //danh sach san pham mau
    const sanPhamMaus = [
        {id:1,name:"Tao"},{id:2,name:"Cam"},{id:3,name:"Xoai"},
    ];
    //them san pham vao gio hang
    const addItem = (product)=>{
        setItems([...items,product]);//them product vao mang cac items
    };
    //xoa 1 san pham theo Id
    const removeItem = (id) =>{
        setItems(items.filter((item)=>item.id !== id));
    };
    //xoa toan bo gio hang
    const clearCart = () =>{
        setItems([]);
    };
    //-----giao dien
    return(
        <div style={{padding:20,fontFamily:"sans-serif"}}>
            <h1>Gio hang</h1>
            <h2>Danh sach san pham co san</h2>
            {sanPhamMaus.map((product)=>(
                <div key={product.id}>
                    {product.name}{" "}
                    <button onClick={()=>addItem(product)}>Add to Cart</button>
                </div>
            ))}
            {/* gio hang */}
            <h2>Gio hang</h2>
            {items.length === 0 ? (
                <p>Chua co san pham nao</p>
            ):(
                <ul>
                    {items.map((item,index)=>(
                        <li key={index}>
                            {item.name}{" "}
                            <button onClick={()=>removeItem(item.id)}>Xoa</button>
                        </li>
                    ))}
                </ul>
            )}
            {/* xoa toan bo gio hang */}
            {items.length > 0 && (
                <button onClick={clearCart}>Xoa het gio hang</button>
            )}
        </div>
    );
}
