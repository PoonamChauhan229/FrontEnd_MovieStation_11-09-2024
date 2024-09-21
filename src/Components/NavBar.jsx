import { Link, useLocation, useNavigate } from "react-router-dom"
import cartContext from "../utils/cartContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";

function NavBar({ mode, setMode,isAuthenticated,setIsAuthenticated }) {
  const token=sessionStorage.getItem('token')
  console.log("token",token)
  const location = useLocation();
  console.log(location)

  const navigate=useNavigate()

  // const excludedPaths = [`/movie/in/The%20Godfather`]; //paths where header should be excpluded
  const includedPaths = ["/", "/allmovies", "/about", "/services", "/contact", "/signup", "/signin"] //2nd option, rount you wanted you mention the all pages that you want to show
  //Check if current path is in the excludedPaths array
  const shouldRenderHeader = includedPaths.includes(location.pathname)
  console.log(shouldRenderHeader)

  const cartNavbar = useContext(cartContext)
  console.log(cartNavbar)
  console.log(useContext(cartContext))

  //subscribing to the store
  const cartItems = useSelector(store => store.cart.items)
  console.log(cartItems.length)

  //navbar-scrolled
  const navEl = document.querySelector('.navbar');

  window.addEventListener('scroll',() => {
    if (window.scrollY > 100 ) {
      navEl.classList.add('navbar-scrolled');
    }else if(window.scrollY < 50 ){
      navEl.classList.remove('navbar-scrolled');
    }
  })

  const handleSignOut=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    navigate('/')

  }
  let username=sessionStorage.getItem('username')
  return (
    <>
      <nav className="navbar navbarStyle sticky-top navbar-expand-lg">
        <div className="container-fluid">
          <span className="ms-3 fs-4 text-warning navbar-brand"><i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass"></i><a className="navbar-brand text-white fs-5 ms-1" href="#">MovieStation</a></span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <!-- Home --> */}
              <Button variant="text" onClick={()=>navigate('/')}>Home</Button>
              {/* <!-- About Us --> */}
              <Button variant="text" onClick={()=>navigate('/about')}>About Us</Button>
              {/* Movie */}
              <Button variant="text" onClick={()=>navigate('/allmovies')}>All Movies</Button>
              {/* AddMovie */}
              <Button variant="text" onClick={()=>navigate('/addmovie')}>Add Movie</Button>
              {/* Cart */}
              
              {/* Redux */}
              <Button variant="text" onClick={()=>navigate('/cartpage')}><ShoppingCartIcon />{cartItems.length}</Button>
              {/* <!-- Service --> */}
              <Button variant="text" onClick={()=>navigate('/services')}>Service</Button>
              {/* <!-- Contact Us --> */}
              <Button variant="text" onClick={()=>navigate('/contact')}>Contact</Button>
            </ul>
           
            
            <div>
            {token ?
            <>
            <span  className="  me-2 ">Hi , {username}</span>
            <button type="submit" className="btn btn-secondary me-3 text-nowrap " onClick={()=>handleSignOut()}>SignOut</button>
            
            </>
            :
            <>           
            <button className="btn text-white text-nowrap mx-2" type="submit"
            onClick={()=>{navigate('/signin')}}
            >SignIn</button>
            <button type="submit" className="btn btn-secondary me-3 text-nowrap "
             onClick={()=>{navigate('/signup')}}
            >SignUp</button>
            </>          
          }  
            </div>
            <div className="me-3"><span
              onClick={() => {
                //setMode("light")
                //true?"truedata":"falsedata"
                setMode(mode == "light" ? "dark" : "light")//setMode(light)
                console.log(mode)
              }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </span></div>
          </div>
        </div>
      </nav>
      {/* {shouldRenderHeader && <Header/>} */}
    </>
  )
}
export default NavBar