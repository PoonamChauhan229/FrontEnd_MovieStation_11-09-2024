import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../utils/constant";
import CartCard from "./CartCard";
import { removeItem } from "../../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";

function CartSummaryPage() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [sum,setSum]=useState(0)
  const cartItems=useSelector(store=>store.cart.items)
  console.log(cartItems)

    useEffect(()=>{
      if(cartItems){
        const total=cartItems.reduce((acc,cv)=>acc+cv.amount,0)
        console.log(total)
        setSum(total)
      }
    },[])

    const token = sessionStorage.getItem('token')
    console.log(token)

    let config = {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    const handleAddOrder=async()=>{
      console.log("OrderPage")
      console.log(cartItems)
      // Buy Now >> Order Page|| Summary Page
        
      let res = await axios.post(`${url}/addorder`,{movies: cartItems},config)      
      console.log(res)
      if(res.status==200){// success response
        await axios.delete(`${url}/clearcart`, config); // delete api call
        //clear the redux store
        dispatch(removeItem());
        navigate('/orderpage')
      }

    }
    
  
  return (
    <>
      <div className="mx-4">
        <div className="text-start py-1 text-secondary">
          Date: <span className="text-white">Feb 16,2022</span>
        </div>
        <div className="border-top border-bottom border-secondary">
          {
            cartItems.map((element)=><CartCard {...element} />)
          }
        
        </div>

        <div
          className="text-end py-3"
          style={{ marginRight: "20%", fontSize: "120%" }}
        >Cart Summary
        </div>
        {/* Dotted underline */}
        <div style={{ borderBottom: "1px dotted grey"}}>
                    </div>

                    <div className="d-flex justify-content-between fs-5" >
                        <div>Total: </div>
                        <div> {sum}</div>
                    </div>  
                    <div className="text-end">
                        <button className="btn btn-warning mt-5 mb-3" style={{width:"45%", fontSize:"2.25vh"}} onClick={() => {handleAddOrder()}} ><BsFillCartCheckFill className="pe-1 fs-2"/>Order Now </button>
                    </div>
        </div>     
              
    </>
  );
}
export default CartSummaryPage;

//Total
//Order ID: Static
//Order date: Static
//order items x 3 : Static
//design remain the same
//material UI
