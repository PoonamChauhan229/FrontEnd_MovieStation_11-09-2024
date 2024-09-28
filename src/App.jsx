import './App.css'
import AboutUs_Section from './Components/AboutUs_page/AboutUs_Section';
import MovieDisplay from './Components/Movie/MovieDisplay';
import NavBar from './Components/NavBar';
import Service_Section from './Components/Service_page/Service_Section';
import ContactUs_Section from './Components/Enquiries/ContactUs_Section';
import Homepage from './Components/Homepage';
import {Route,Routes} from 'react-router-dom';
import Footer from './Components/Footer';
import MovieTrailer from './Components/Movie/MovieTrailer'
import React, {useEffect,useState} from 'react'
import AddMovie from './Components/Movie/AddMovie'
import EditMovie from './Components/Movie/EditMovie';
import cartContext from "./utils/cartContext";
import textContext from './utils/textContext';
import store from './utils/store';
import {Provider} from 'react-redux'; 
import textSlice from './utils/textSlice';
import Cartpage from './Components/Cartpage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SignUp from './Components/SignIn_Up_Out/SignUp';
import SignOut from './Components/SignIn_Up_Out/SignOut';
import SignIn from './Components/SignIn_Up_Out/SignIn';
import {url} from './utils/constant'
import axios from 'axios';
import AllEnquiries from './Components/Enquiries/AllEnquiries';
import Table from './Components/Enquiries/CustomizedTables'

function App() {
  const AboutUs_LastSection = [
    {    
        AboutUs_comment:
        "We work tirelessly to make the experience of using our apps the best that it can be and we love any feedback or suggestions you may have in order for us to improve further."
    },
    {    
        AboutUs_comment:
        "If you would like to find out more about opportunities to work with us, visit our talent page, we are always looking to get more skilled and inspired people on our team."
    },
    {    
        AboutUs_comment:
        " If you are interested in running campaigns with us for your upcoming movie, home entertainment release or VOD service we are happy to hear from you."
    },
]

  const [movieData,setMovieData] = useState([])
  const [cartUCtxt,setCartUtxt] = useState(0)  
  const [textUseContext,setTextUseContext] = useState("Text messaging, or texting, is the act of composing and sending electronic messages, typically consisting of alphabetic and numeric characters, between two or more users of mobile devices, desktops/laptops, or another type of compatible computer.")

// signin part

const [isAuthenticated,setIsAuthenticated]=useState(false)

useEffect(()=>{
   const token = sessionStorage.getItem('token')
  console.log(token)
  setIsAuthenticated(true)
},[])

const getMovieData = async () => {
  const token=sessionStorage.getItem('token')
  let config={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  console.log("Movie data is called....");
  let res = await axios.get(`${url}/movie`,config)//response in res.data >> moviedata
  console.log(res.data.movieData);
  setMovieData(res.data.movieData);
};

  useEffect(()=>{
    getMovieData()
  },[]) //API Call
//initial value is stored as dark
const [mode, setMode]=useState("dark")

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <>
  <ThemeProvider theme={theme}>
  <CssBaseline /> 
  <Provider store={store}>
    <cartContext.Provider value={[cartUCtxt,setCartUtxt]}>
    <textContext.Provider value={[textUseContext,setTextUseContext]}>
    <div>
    <NavBar mode={mode} setMode={setMode} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path="/" element={<Homepage movieData={movieData}/>}/>
      <Route path='/allmovies' element={<MovieDisplay movieData={movieData} setMovieData={setMovieData}/>}/>
      <Route path='/addmovie' element={<AddMovie setMovieData={setMovieData}/>}/>
      <Route path='/about' element={<AboutUs_Section/>}/>
      <Route path='/services' element={<Service_Section/>}/>
      <Route path='/contact' element={<ContactUs_Section/>}/>
      <Route path="/movietrailer/:id" element={<MovieTrailer movieData={movieData} setMovieData={setMovieData}/>}/>
      <Route path="/editmovie/:id" element={<EditMovie movieData={movieData} />}/>
      <Route path="/cartpage" element={<Cartpage/>}></Route>
      <Route path="/signin" element={<SignIn isAuthenticated = {isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/signout" element={<SignOut/>}></Route>
      <Route path="allenquiries" element={<AllEnquiries/>}></Route>
      <Route path="/table" element={<Table/>}></Route>
    </Routes>
    <div style={{position:"relative"}}>
    <Footer />
    </div>
    </div>
    {/* </div> */}
    </textContext.Provider>
    </cartContext.Provider>
  </Provider>
  </ThemeProvider>
  </>
  )
}

export default App
