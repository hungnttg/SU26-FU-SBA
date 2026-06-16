import React,{useState,useEffect} from "react";
export default function Slot22(){
    const [products,setProducts]=useState([]);
    const [message,setMessage]=useState("");
    useEffect(()=>{
        fetch("http://localhost:8080/slot22/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(()=>setMessage("Loi khi tai danh sach san pham"));
    },[]);
    //viet ham tao order san pham
    const createOrder = (id) =>{
        fetch(`http://localhost:8080/slot22/orders/create/${id}`)
        .then(res => res.text())
        .then(text => setMessage(text))
        .catch(()=>setMessage("Loi khi tao don hang"));
    };
    //layout
    return(
        <div style={{padding:20}}>
            <h2>Microservices</h2>
            {products.map(p=>(
                <div key={p.id} style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>
                    <h3>{p.name}</h3>
                    <p>Gia: {p.price}</p>
                    <button onClick={()=>createOrder(p.id)}>Dat hang</button>
                </div>
            ))}
            {message && <p style={{color:"red"}}>{message}</p>}
        </div>
    );
}