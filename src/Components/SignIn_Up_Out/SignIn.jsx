import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from "axios";
import { url } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

//Signin > Sigin with a token + Signout option should be visible
function SignIn({isAuthenticated,setIsAuthenticated}) {
  const navigate=useNavigate()
  const formSchema=Yup.object().shape({
    phone_number:Yup.number().required(),
    password:Yup.string().required(),
    email:Yup.string().required(),
})
const formik=useFormik({
  initialValues:{
      phone_number:"",
      email:"",
      password:"",
  },
  validationSchema:formSchema,
  onSubmit:(values)=>{
      console.log(values) // >> req.body 
      postSignInUser(values)
  }   
})
const postSignInUser=async(loginuser)=>{
  console.log(loginuser)
  const res=await axios.post(`${url}/signin`,loginuser)
  console.log(res.data)
  sessionStorage.setItem('token',res.data.token)
  sessionStorage.setItem('username',res.data.user.name)
  if(res.data.token){
    setIsAuthenticated(true)
  }  
  navigate('/allmovies')  
}

  return (
    <Form style={{width:"50%",border:"1px solid grey",borderRadius:"2%"}} className="mx-auto my-5 p-4" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h1 className="mb-3">Sign in</h1>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
         name="email"
         value={formik.values.email}
         onChange={formik.handleChange}          
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="phone_number" placeholder="phone_number" 
         name="phone_number"
         value={formik.values.phone_number}
         onChange={formik.handleChange} 
        />
      </Form.Group>
     

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
         name="password"
         value={formik.values.password}
         onChange={formik.handleChange} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignIn;

