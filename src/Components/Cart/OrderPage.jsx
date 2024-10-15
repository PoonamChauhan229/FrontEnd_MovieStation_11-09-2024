import { useSelector } from "react-redux";
import ShoppingCard from "./ShoppingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../utils/constant";

function OrderPage() {
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
    }
    
  
  return (
    <>
      <div className="mx-4">
        <div className="text-start py-1 text-secondary">
          Date: <span className="text-white">Feb 16,2022</span>
        </div>
        <div className="border-top border-bottom border-secondary">
          {
            cartItems.map((element)=><ShoppingCard {...element} />)
          }
        
        </div>

        <div
          className="text-end py-3"
          style={{ marginRight: "20%", fontSize: "120%" }}
        >Cart Summary
        </div>
        {/* Dotted underline */}
        <div
          style={{
            borderBottom: "1px dotted grey",
            width: "50%",
            marginLeft: "50%",
          }}
        ></div>
        <div className="text-end" style={{ marginRight: "41%" }}>
          Total {sum}
          <button
          onClick={()=>handleAddOrder()}
          >Buy Now</button>
        </div>
      </div>
    </>
  );
}
export default OrderPage;

//Total
//Order ID: Static
//Order date: Static
//order items x 3 : Static
//design remain the same
//material UI
