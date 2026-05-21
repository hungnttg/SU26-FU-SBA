import React,{useEffect,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, Card, Col, Container, Form, ListGroup, Nav, Navbar, Row, Spinner } from "react-bootstrap";
import { FaHeart, FaHome, FaSearch, FaShoppingBag } from "react-icons/fa";
// atoms===========================================
//logo nho
function Logo(){
    return(
        <h4 className="fw-bold text-primary m-0">ShoeStore</h4>
    );
}
//Item menu trai
function MenuItem({icon,text}){
    return(
        <ListGroup.Item className="border-0 py-3" style={{cursor:"pointer"}}>
            <span className="me-2">{icon}</span>
        </ListGroup.Item>
    );
}
//gia tien
function ProductPrice({price}){
    return(
        <h5 className="text-danger fw-bold">${price}</h5>
    );
}
//anh san pham
function ProductImage({src}){
    return(
        <img src={src} alt="" className="img-fluid rounded"
        style={{height:"200px",width:"100%",objectFit:"cover"}} />
    );
}
//-------------------------------------------------------- Phan tu
//search box
function SearchBox(){
    return(
        <Form className="d-flex">
            <Form.Control type="text" placeholder="Search shoes..."/>
            <Button variant="primary" className="ms-2">
                <FaSearch/>
            </Button>
        </Form>
    );
}
//
function BrandBadge({brand}){
    return(
        <Badge bg="dark">{brand}</Badge>
    );
}
//-----------------------------sinh vat-----------------------
//navbar trn
function TopNavBar(){
    return(
        <Navbar bg="white" className="shadow-sm px-4 py-3">
            <Container fluid>
                <Logo />
                <SearchBox />
            </Container>
        </Navbar>
    );
}
//sidebar trai
function Sidebar(){
    return(
        <div className="bg-light border-end vh-100" style={{width: "250px"}}>
            <h5 className="p-4 fw-bold">MENU</h5>
            <ListGroup variant="flush">
                <MenuItem icon={<FaHome/>} text="Home" />
                <MenuItem icon={<FaShoppingBag />} text="Products" />
                <MenuItem icon={<FaHeart />} text="Wishlist" />
            </ListGroup>
        </div>
    );
}
//product card
function ProductCard({product}){
    return(
        <Card className="shawdow-sm border-0 h-100">
            <Card.Body>
                <ProductImage src={product.search_image} />
                <div className="mt-3">
                    <BrandBadge brand={product.brands_filter_facet} />
                </div>
                <h6 className="mt-2">
                    {product.product_additional_info}
                </h6>
                <small className="text-muted">Style ID: {product.styleid}</small>
                <ProductPrice price={product.price} />
            </Card.Body>
        </Card>
    );
}
//product grid
function ProductGrid(){
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch("https://hungnttg.github.io/shopgiay.json").then((res)=>res.json())
        .then((data)=>{
            setProducts(data.products);
            setLoading(false);
        });
    },[]);
    if(loading){
        return(
            <div className="text-center py-5">
                <Spinner animation="border" />
                <h5 className="mt-3">Loading products...</h5>
            </div>
        );
    }
    return(
        <Row className="g-4">
            {products.map(
                (product)=>(
                    <Col md={4} lg={3} key={product.styleid}>
                        <ProductCard product={product} />
                    </Col>
                )
            )}
        </Row>
    );
}
//======================= template
function MainLayout({navbar,sidebar,children}){
    return(
        <div>
            {navbar}
            <div className="d-flex">
                {sidebar}
                <div className="flex-grow-1 p-4 bg-light min-vh-100">
                    {children}
                </div>
            </div>
        </div>
    );
}
//-----------------------page
function HomePage(){
    return(
        <>
            <h2 className="fw-bold mb-4">Shoe Collection</h2>
            <ProductGrid/>
        </>
    );
}
//------------
export default function Slot8_1(){
    return(
        <MainLayout navbar={<TopNavBar/>} sidebar={<Sidebar/>}>
            <HomePage/>
        </MainLayout>
    );
}
