import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {url} from '../../utils/constant'
import axios from "axios";
import EditUpdateMovieForm from "./EditUpdateMovieForm";


function EditMovie(){
const [singleMovie, setSingleMovies]=useState()
const {id}=useParams()
console.log(id)

const token = sessionStorage.getItem('token')
console.log(token)

let config = {
  headers:{
    Authorization:`Bearer ${token}`
  }
}
const getMovieData=async()=>{
    console.log("Movie data is called.........")
    // let res = await fetch (`${url}/movie/${id}`,config)//API call
    // let data =await res.json()//responsing in string so we cant use string so, converting to json format
    // console.log(data[0])
    // setSingleMovies(data[0])

    // axios
    let res=await axios.get(`${url}/movie/${id}`,config)
    console.log(res.data[0])
    setSingleMovies(res.data[0])
}
console.log(singleMovie)

useEffect(()=>{
    getMovieData()
},[])//when your page is loaded

    return(
        <>
        {
        singleMovie?
        <EditUpdateMovieForm singleMovie={singleMovie} id={id}/>//LOAD WHEN API COMPLETED
        :
        <p>Loading..........</p>//When API CALL IS RUNNING
    }        
    </>
    )}
export default EditMovie

// Use the formik

//if you need it, you can create a number of functional components inside another component but, it should be after "export default". and you can re-use it. you cannot write "export default" after the functional components.


    
