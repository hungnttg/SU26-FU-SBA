import {React, useState} from "react";
const UsersVer1 = () =>{
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    //ham doc du lieu Ver1
    const fetchUsersVer1 = async () =>{
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080/slot14/users",{
                headers: {"X-API-VERSION":"2"},
            });
            if(!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();//chuyen ket qua sang json
            setUsers(data);
        } catch (error) {
            console.error("Fetch error: ",error);
        }
        finally {
            setLoading(false);
        }
    };
    //giao dien
    return(
        <div>
            <h2>Users Version 1</h2>
            <button onClick={fetchUsersVer1} disabled={loading}>
                {loading ? "Loading...": "Load Users"}
            </button>
            {users.length > 0 ? (
                <table border="1" cellPadding="5" style={{marginTop:"10px"}}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>      
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ):(
                !loading && <p>No users loaded yet.</p>
            )}
        </div>
    );
}
export default UsersVer1;