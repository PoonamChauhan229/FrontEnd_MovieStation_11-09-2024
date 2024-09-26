import axios from "axios"
import { url } from "../../utils/constant"
import { useEffect, useState } from "react"
import AboutUs_ImageBanner from "../AboutUs_page/AboutUs_ImageBanner"
import { useNavigate } from "react-router-dom"
import CustomizedTables from "./CustomizedTables"

function AllEnquiries() {
    const navigate=useNavigate()
    const [enquiryData, setEnquiryData] = useState([])

    const token = sessionStorage.getItem('token')
    console.log(token)

    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const getEnquiryData = async () => {
        console.log("Enquiry Data is called....")
        let res = await axios.get(`${url}/allenquiry`, config)
        console.log(res.data.enquiryData)
        setEnquiryData(res.data.enquiryData)
    }

    useEffect(() => {
        getEnquiryData()
    }, []) // API call has to be made inside UseEffect () only
    console.log(enquiryData)
    return (
        <>
        <div className="d-flex justify-content-end"
        onClick={()=>navigate('/contact')}
        >
            <button className="btn col-1  d-flex btn-warning justify-content-center align-items-center" style={{width:"120px",marginRight:"10%"}}>
            <i className="fa-solid fa-angles-left fs-5"></i>
            <div className="fs-6 mx-2">Back</div></button>
        </div>

        {
            enquiryData.length ===0?<AboutUs_ImageBanner cardText={"No Enquires Generated So Far !!!!"}/>:      
            <>   
            <CustomizedTables enquiryData={enquiryData}/>
            </>
            
            
        }
        </>
        
    )
}
export default AllEnquiries