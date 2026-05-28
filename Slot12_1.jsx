import { useState,useEffect } from "react";
export default function Slot12_1(){
    const [users,setUsers]=useState([]);
    const [name,setName]=useState("");
    const [birthday,setBirthday]=useState("");
    const [editingId, setEditingId]=useState(null);
    const API="http://localhost:8080/user";
    //lay tat ca nguoi dung
    const fetchUsers = async () =>{
        try {
            const res = await fetch(API);
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{fetchUsers(); },[]);//load
    //them, cap nhat nguoi dung
    const saveUser = async () =>{
        if(!name || !birthday){
            alert("Name and birthday required");
            return;
        }
        try {
            if(editingId){ //sua
                await fetch(`${API}/${editingId}`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({name,birthday}),
                });
            }
            else { //them moi
                await fetch(API,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({name,birthday}),
                });
            }
            //reset
            setName("");setBirthday(""); setEditingId(null);
            //hien thi laij danh sacgh
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };
    //gan du lieu vao form de sua
    const editUser = (u) =>{
        setName(u.name);
        setBirthday(u.birthday);
        setEditingId(u.id);
    };
    //xoa user
    const deleteUser = async (id) =>{
        if(!window.confirm("Delete???")) return;
        await fetch(`${API}/${id}`,{method:"DELETE"});//thuc hien xoa
        fetchUsers();//reload
    };
    ///---------------layout
    return(
        <div style={{padding:"20px", maxWidth:"600px",margin:"auto"}}>
            <h2>{editingId ? "Edit User" : "Add User"}</h2>
            <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}
            style={{width:"100%",marginBottom:"10px"}}/>
            <input type="date" placeholder="birthday" value={birthday} onChange={e=>setBirthday(e.target.value)}
            style={{width:"100%",marginBottom:"10px"}}/>
            <button onClick={saveUser} style={{width:"100%",marginBottom:"20px"}}>
                {editingId ? "Update":"Add new"}
            </button>
            <h2>User List</h2>
            <table border="1" cellPadding="5" style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u=>(
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.birthday}</td>
                            <td>
                                <button onClick={()=>editUser(u)}>Edit</button>{" "}
                                <button onClick={()=>deleteUser(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && 
                        <tr>
                            <td colSpan="4" style={{textAlign:"center"}}>No Users</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}