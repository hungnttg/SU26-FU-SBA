import React,{useState,useEffect} from "react";
export default function Slot17(){
    //code
    const [users,setUsers]=useState([]);
    const [selectedUser,setSelectedUser]=useState(null);
    //load danh sach user
    useEffect(()=>{
        const fetchUsers = async () =>{
            try {
                const res = await fetch("http://localhost:8080/slot17/users");
                const data = await res.json();//chuyen sang json
                setUsers(data);//cap nhat vao trang thai
            } catch (error) {
                console.error("Fetch users error: ",error);
            }
        };
        fetchUsers();//goi ham 
    },[]);
    //ham xem chi tiet user
    const viewDetail = async (user) =>{
        const href = user?._links?.self;
        if(!href){
            console.error("No self link for user: ",user);
            return;
        }
        try {
            const res = await fetch(href);
            if(!res.ok) throw new Error("HTTP error "+res.status);
            const data = await res.json();//lay ket qua dang json
            setSelectedUser(data);//cap nhat vao trang thai
        } catch (error) {
           console.error("Fetch user detail error: ",error); 
        }
    };
    //layout
    return(
        <div>
            <h2>Su dung HATEOAS</h2>
            <button onClick={()=>setSelectedUser(null)}>Load User</button>
            <ul>
                {users.map((u)=>(
                    <li key={u.id}>
                        {u.name} ({u.email}){" "} 
                        <button onClick={()=>viewDetail(u)}>View Detail</button>
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div>
                    <h3>User Details</h3>
                    <p>ID: {selectedUser.id}</p>
                    <p>Name: {selectedUser.name}</p>
                    <p>Email: {selectedUser.email}</p>
                </div>
            )}
        </div>
    );

}