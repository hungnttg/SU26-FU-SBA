import { useEffect,useState } from "react";
function Slot11_1(){
    const [users,setUsers]=useState([]);
    const [name,setName]=useState("");
    const [birthday,setBirthday]=useState("");
    //get user
    const fetchUser = async () => { //dinh nghia ham
        try {
            const res = await fetch("http://localhost:8080/user");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchUser();//goi ham
    },[]);
    //post user
    const createUser = async () =>{
        if(name === "" || birthday === ""){
            alert("Nhap day du thong tin");
            return;
        }
        try {
            const res = await fetch("http://localhost:8080/user",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    name,
                    birthday,
                }),
            });
            const result = await res.text();
            alert(result);
            //reset form
            setName("");
            setBirthday("");
            //load lai user
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    };
    //---------------------giao dien
    return(
        <div style={{padding:20}}>
            <h1>Demo jackson</h1>
            <h2>User hien tai</h2>
            {users.length > 0 ? (
                users.map((u)=>(
                    <div key={u.id}>
                        <p>Ten: {u.name}</p>
                        <p>Ngay sinh: {u.birthday}</p>
                    </div>
                ))
            ):
            (
                <p>Loading....</p>
            )}
            <hr/>
            <h2>Them User</h2>
            <input
                type="text"
                placeholder="Ten"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <br/>
            <br/>
            <input
                type="text"
                placeholder="dd-MM-yyyy"
                value={birthday}
                onChange={(e)=>setBirthday(e.target.value)}
            />
            <br/>
            <br/>
            <button onClick={createUser}>Them</button>
        </div>
    );
}
export default Slot11_1;