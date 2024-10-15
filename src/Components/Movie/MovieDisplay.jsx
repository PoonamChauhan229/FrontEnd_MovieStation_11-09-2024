import { useEffect, useState } from "react";
import MovieCard from "./MovieCard"
import axios from "axios";
import { url } from "../../utils/constant";
import { addItem, removeItem } from '../../utils/cartSlice';
import { useDispatch } from 'react-redux';

function MovieDisplay() {
    const [movieData,setMovieData] = useState([]) // movie value
    const[searchTerm,setSearchTerm]=useState("")// hold serach value
    const [filterMovieData,setFilterMovieData] = useState([]) // filtered movie Value
    const dispatch=useDispatch()
    const filterData=(searchText,allmovies)=>{
        // console.log(searchText,allmovies)
        let fData=allmovies.filter((element)=>element.moviename.toLowerCase().includes(searchTerm.toLowerCase()))
        return fData
    }
    
    let displayStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "2.7%",
        margin: "1% 4% 1% 4%",
        // backgroundColor: "black",
        position: "relative",
        //    border:"1px solid red",
        cursor: "pointer",
    }
    const token=sessionStorage.getItem('token')
    let config={
        headers:{
        Authorization:`Bearer ${token}`
    }
    }
    const getMovieData = async () => {  
        console.log("Movie data is called....");
        let res = await axios.get(`${url}/movie`,config)//response in res.data >> moviedata
        console.log(res.data.movieData);
        setMovieData(res.data.movieData);
        setFilterMovieData(res.data.movieData)
      };
      useEffect(()=>{
        getMovieData()
      },[])
      //console.log(searchTerm)

      const deleteMovie=async(_id)=>{
        console.log("Movie Deleted from the DB..")
        let res = await axios.delete(`${url}/deletemovie/${_id}`,config)
       console.log(res)   
       getMovieData()
      }
      const handleAdditem=async(movieItem)=>{
        console.log(movieItem)    
        // >> api call for updating the backend >> saving to the DB
        let res=await axios.post(`${url}/addcart`, movieItem,config)
        console.log(res)    
        getCartData()
      }

      const getCartData=async()=>{            
        let res = await axios.get(`${url}/cart`,config)//response in res.data >> moviedata
        console.log(res.data.cartData);
        if (res.data && res.data.cartData) {
          dispatch(removeItem()); // Clear existing cart items
      
            res.data.cartData.map((element)=>dispatch(addItem(element)))
            // dispatch(addItem(res.data.cartData))
            
        }
      }
      
        // useEffect(()=>{
        //   getCartData()
        // },[]) //API Call

    return (
        <>        
    <div className="mt-1 mb-1" >
                {/* Search*/}
                <div className="d-flex justify-content-end me-5 pe-3">
                    <div className="iput-icons d-flex flex-row">
                        {/* <i className="fas fa-search icon fs-5 pt-2 px-3 "></i> */}
                        <input className="form-control me-2 ps-4 bg-dark text-secondary" type="search" aria-label="Search" name="" id="" placeholder="  Search movie"
                            onChange={(e) => {
                                //console.log(e.target.value)
                                setSearchTerm(e.target.value)
                            }} />
                        <button className="btn px-3 mx-1 btn-outline-secondary" type="submit" onClick={()=>{
                            console.log("Btn is clicked",searchTerm)
                            const data=filterData(searchTerm,movieData)// passing the data
                            // console.log(data)
                            setFilterMovieData(data)

                        }}>Search</button>
                    </div>
                </div>
                {/* each movie card */}
                <div style={displayStyle} >

                    {
                        !searchTerm  ? movieData?.map((element, index) => (
                            <MovieCard {...element} key={index} setMovieData={setMovieData} element={element} 
                            deleteBtn={
                                <button className="btn px-2" onClick={()=>deleteMovie(element._id)}><i className="fa-solid fa-trash text-white"></i></button>   
                            }
                            reduxAddcartBtn={
                                <button className="btn px-w text-white" onClick={()=>{handleAdditem(element)}}><i className="fa-solid fa-cart-shopping text-white"></i></button>
                            }
                            />   //spread operator
                        )):filterMovieData?.map((element, index) => (
                            <MovieCard {...element} key={index} setMovieData={setMovieData} element={element} 
                            deleteBtn={
                                <button className="btn px-2" onClick={()=>deleteMovie(element._id)}><i className="fa-solid fa-trash text-white"></i></button>
                            }
                            reduxAddcartBtn={
                                <button className="btn px-w text-white" onClick={()=>{handleAdditem(element)}}><i className="fa-solid fa-cart-shopping text-white"></i></button>
                            }
                            />   //spread operator
                        ))
                        
                    }
                </div>
            </div>
        </>
    )
}
export default MovieDisplay