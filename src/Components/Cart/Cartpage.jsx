import { useDispatch, useSelector } from "react-redux"
import CartCard from "./CartCard"
import { removeItem, removeLastItem,removeFirstItem } from "../../utils/cartSlice"
import { useNavigate } from "react-router-dom"
import OrderPage from "./CartSummaryPage"
import { url } from "../../utils/constant"
import axios from "axios"
import CartSummaryPage from "./CartSummaryPage"

function Cartpage(){
    const cartItems=useSelector(store=>store.cart.items)
    console.log(cartItems)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token=sessionStorage.getItem('token')
    let config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    const handleClearitem=async()=>{
        let res=await axios.delete(`${url}/deletecart`,config)
        console.log(res)
        if(res.data){
             dispatch(removeItem())
        }
       
    }
    
    const handleRemoveLastItem=()=>{
        dispatch(removeLastItem())
    }
    const handleRemoveFirstItem=()=>{
        dispatch(removeFirstItem())
    }

    return(
        <>
        <div style={{border:"2px solid grey",padding:"1%",textAlign:"center",width:"70%",margin:"5% 15%",borderRadius:"2%"}}>
        <h2><i className="fa-solid fa-bag-shopping me-1 text-warning fs-1"></i>Your Shopping Cart</h2>

        {/* Back */}
        <button onClick={() => navigate('/allmovies')} className="btn btn-secondary">Back to All Movies</button>

        {/* Clear Cart */}
        <button onClick={()=>{
            handleClearitem()
        }} className="btn btn-primary">Clear Cart</button>

        {/*Remove 1 item from last  */}
        <button className="btn btn-secondary" onClick={()=>{
            handleRemoveLastItem()
        }} >Remove 1 item from last</button>

        {/* Remove 1 item from beginning */}
        <button className="btn btn-secondary" onClick={()=>{
            handleRemoveFirstItem()
        }}>Remove 1 item from beginning</button>

         <CartSummaryPage/>
        </div>
         </>
    )
}
export default Cartpage