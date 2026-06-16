//npm i axios bootstrap
import React,{useEffect,useState} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Slot21(){
    //code
    const [products,setProducts]=useState([]);
    const [form,setForm]=useState({id:"",name:"",price:"",description:""});
    const api="http://localhost:8080/slot21/products";
    //load du lieu
    useEffect(()=>{
        const fetchProducts = async () =>{
            try {
                const res = await axios.get(api);
                setProducts(res.data);
            } catch (error) {
                console.error("Fetching error: ",error);
            }
        };
        fetchProducts();
    },[]);//chi chay 1 lan khi load tranhg
    //ham them va cap nhat san pham
    const submit = async e =>{
        e.preventDefault();
        try {
            if(form.id){
                await axios.put(`${api}/${form.id}`,form);
            }
            else {
                await axios.post(api,form);
            }
            const res = await axios.get(api);
            setProducts(res.data); //update state
            //reset form
            setForm({id:"",name:"",price:"",description:""});
        } catch (error) {
            console.error("Loi khi luu: ",error);
        }
    };
    //ham sua, xoa
    const edit = p => setForm(p);
    const del = async id => {
        if(window.confirm("Do you want to delete this product?")){
            try {
                await axios.delete(`${api}/${id}`);
                const res = await axios.get(api);//reload
                setProducts(res.data);//updated
            } catch (error) {
                console.error("Loi khi xoa: ",error);
            }
        }
    }
    //layout
    return(
        <div className="container mt-4">
            <h1 className="mb-3">Quan tri san pham</h1>
            <form onSubmit={submit} className="mb-4">
                <input
                    className="form-control mb-2"
                    placeholder="Ten san pham"
                    value={form.name}
                    onChange={e=>setForm({...form,name: e.target.value})}
                    required
                />
                <input
                    className="form-control mb-2"
                    placeholder="Gia san pham"
                    value={form.price}
                    onChange={e=>setForm({...form,price: e.target.value})}
                    required
                />
                <input
                    className="form-control mb-2"
                    placeholder="Mo ta san pham"
                    value={form.description}
                    onChange={e=>setForm({...form,description: e.target.value})}
                    required
                />
                <button className="btn btn-primary">
                    {form.id? "Update":"Add"}
                </button>
            </form>
            {/* hien thi ket qua */}
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th width="150">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.description}</td>
                            <td>
                                <button onClick={()=>edit(p)} className="btn btn-warning btn-sm me-2">
                                    Sua
                                </button>
                                <button onClick={()=>del(p.id)} className="btn btn-danger btn-sm me-2">
                                    XOa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}