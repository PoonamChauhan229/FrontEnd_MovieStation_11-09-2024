import { useFormik } from 'formik'
import * as Yup from "yup";
import { url } from '../../utils/constant';
import axios from 'axios';

function SignUp() {


  const formSchema=Yup.object().shape({
    name:Yup.string().min(5,"Too Short"),
    age:Yup.number().required().positive(),
    gender:Yup.string(),
    phone_number:Yup.number().required(),
    password:Yup.string().required(),
    email:Yup.string().required(),

})

const formik=useFormik({
  initialValues:{
      name:"",
      age:"",
      gender:"",
      phone_number:"",
      email:"",
      password:"",
  },
  validationSchema:formSchema,
  onSubmit:(values)=>{
      // console.log(values) 
      postSignUpUser(values)
  }   
})

// posting the usersignup details to the server dv
const postSignUpUser=async(newUser)=>{
  // console.log(newUser)
  // http://localhost:8000/signup
  const res=await axios.post(`${url}/signup`,newUser)
  console.log(res)  
  
}

  return (
    <>
      <form className="container my-5 w-50" onSubmit={formik.handleSubmit}>
        <div className="row mb-5">
          <div className="col">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
            type="text" 
            className="form-control"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}           
            
            />
          </div>
          <div className="col">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="text" className="form-control" 
             id="age"
             name="age"
             value={formik.values.age}
             onChange={formik.handleChange}  
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col">
            <label htmlFor="gender" className="form-label">Gender</label>
            <input type="text" className="form-control"
             id="gender"
             name="gender"
             value={formik.values.gender}
             onChange={formik.handleChange}   />
          </div>
          <div className="col">
            <label htmlFor="phone_number" className="form-label">Phone Number</label>
            <input type="text" className="form-control" 
             id="phone_number"
             name="phone_number"
             value={formik.values.phone_number}
             onChange={formik.handleChange}  
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" 
             id="email"
             name="email"
             value={formik.values.email}
             onChange={formik.handleChange}  
            />
          </div>
          <div className="col">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" 
             id="password"
             name="password"
             value={formik.values.password}
             onChange={formik.handleChange}  
            />
          </div>
        </div>
        <button className="btn btn-secondary" type="submit">Sign Up</button>
      </form>
    </>
  )
}
export default SignUp

