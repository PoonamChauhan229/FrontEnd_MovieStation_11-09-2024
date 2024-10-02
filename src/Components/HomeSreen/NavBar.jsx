import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function NavBar({ mode, setMode, isAuthenticated, setIsAuthenticated }) {
  const token = sessionStorage.getItem('token')
  console.log("token", token)

  const navigate = useNavigate()

  const location = useLocation();
  console.log(location)
  
  const theme = createTheme({
    palette: {
      primary : {
        main:'#424242',
    },
    secondary:{
        main:'#ffc107',
    },
  },
  });
 

  //paths where header should be excpluded
  const includedPaths = ["/", "/allmovies", "/about", "/services", "/contact", "/signup", "/signin"] //2nd option, rount you wanted you mention the all pages that you want to show
  //Check if current path is in the excludedPaths array
  const shouldRenderHeader = includedPaths.includes(location.pathname)
  console.log(shouldRenderHeader)


  //subscribing to the store
  const cartItems = useSelector(store => store.cart.items)
  console.log(cartItems.length)

  //navbar-scrolled
  const navEl = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navEl.classList.add('navbar-scrolled');
    } else if (window.scrollY < 50) {
      navEl.classList.remove('navbar-scrolled');
    }
  })
  const handleSignOut = () => {
    sessionStorage.removeItem('token')
    navigate('/')
  }

  let username = sessionStorage.getItem('username')
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg" >
        <div className="container-fluid" >
          {/* Brand */}
          <span className="ms-3 fs-4 text-warning navbar-brand"><i className="fa-solid fa-couch"></i><i className="fa-solid fa-wine-glass"></i><a className="navbar-brand text-warning fs-4 ms-1" href="#">MovieStation</a></span>

        {/* Toggler Icon */}
          <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-warning">
              {/* <!-- Home --> */}
              <Button variant="text" color="inherit" onClick={() => navigate('/')}>Home</Button>
              {/* <!-- About Us --> */}
              <Button variant="text" color="inherit" onClick={() => navigate('/about')}>ABOUT US</Button>

              {/* Movie */}
              <Button variant="text" color="inherit" onClick={() => navigate('/allmovies')}>All movies</Button>

              {/* AddMovie */}
              <Button variant="text" color="inherit" onClick={() => navigate('/addmovie')}>Add movie</Button>
              {/* Cart */}
              {/* <div><Link to='/addtocart' className="text-secondary text-decoration-none">Add to Cart{cartNavbar}</Link></div> */}
              {/* Redux */}
              <Button variant="text" color="inherit" onClick={() => navigate('/cartpage')}><ShoppingCartIcon />{cartItems.length}</Button>

              {/* <!-- Service --> */}
              <Button variant="text" color="inherit" onClick={() => navigate('/services')}>Service</Button>
              {/* <!-- Contact Us --> */}
              <Button variant="text" color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
   {/* Sign Out */}
   <ThemeProvider theme={theme}>

  
                <div>
                {token ?
                  <>
                    <span className="mx-2">Hi, {username}</span>
                    <Button variant="contained" color="primary"
                    className=" text-nowrap mx-2 text-white" type="submit" onClick={() => handleSignOut()}>Sign out</Button>
                  </>
                  :
                  <>
                    {/* Sign in */}
                    <Button variant="contained" color="primary" className="mx-2" type="submit" onClick={() => { navigate('/signin') }}>Sign in</Button>

                    {/* Sign up */}
                    <Button variant="contained" color="secondary"  type="submit" className=" me-3 py-1 " onClick={() => { navigate('/signup') }}><i className="fa-solid fa-user me-1"></i>Sign up</Button>
                  </>

                }
                
              </div>
              </ThemeProvider>
        
            <div className="me-3"><span
              onClick={() => {
                //setMode("light")
                //true?"truedata":"falsedata"
                setMode(mode == "light" ? "dark" : "light")//setMode(light)
                console.log(mode)
              }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </span>
            </div>
            </ul>
          </div>
        </div>
      </nav>
      {/* {shouldRenderHeader && <Header/>} */}
    </>
  )
}
export default NavBar