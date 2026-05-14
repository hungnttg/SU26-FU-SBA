import { useEffect,useState } from "react";
//useEffect: render ma khong reload moi khi co du lieu thay doi
//useState: thiet lap gia tri cua bien thong qua ham set
export default function Slot4_1(){
    //code-----------------------------
    const [sp,setSp]=useState([]);//gia tri khoi tao la 1 mang
    //dinh nghia ham doc du lieu
    const docDuLieu = () =>{
        //doc du lieu tu API
        fetch("http://localhost:8080/api/sanpham/get")
        .then(r=>r.json()) //chuyen ket qua sang json
        .then(setSp) //cap nhat vao bien sp
        .catch(e=>console.error("API loi: ",e));
    }
    //goi ham doc du lieu trong useEffect
    useEffect(()=>{
        docDuLieu();
    },[]);
    //layout-----------------------------
    return(
        <div style={{padding:20, margin:10}}>
            <h1>List Product</h1>
            {!sp.length ? "Dang tai....." : (
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:15}}>
                    {sp.map(s=>(
                        <div key={s.id} style={{border:"1px solid #ddd",padding:10}}>
                            <img src={s.hinhanhsanpham} style={{width:"100%",height:200, objectFit:"cover"}}/>
                            <h3>{s.tensanpham}</h3>
                            <p><b>Gia: </b>{s.giasanpham.toLocaleString()} VND</p>
                            <p>{s.motasanpham.slice(0,100)}...</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}