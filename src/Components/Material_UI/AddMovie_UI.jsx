import Stack from "@mui/material/Stack";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function AddMovie_UI({setMovieData}) {
  const navigate = useNavigate();

  const formSchema=Yup.object().shape({
    moviename:Yup.string().min(5,"Too Short"),
    movieposter:Yup.string().min(5,"Too Short").max(20,"Movie Name too long"),
    rating:Yup.number().required().positive(),
    summary:Yup.string().min(5,"Too Short").max(250,"Summary Too long"),
    cast:Yup.string().min(5,"Too Short").max(250,"Too Long"),
    trailer:Yup.string().required(),
    publishYear:Yup.string().required(),
    likeNum:Yup.string().required(),
    disLikeNum:Yup.string().required(),
    genres:Yup.number().required(),
    category:Yup.string().required(),
  })

  const formik=useFormik({
    initialValues:{
        moviename:"",
        movieposter:"",
        rating:"",
        summary:"",
        cast:"",
        trailer:"",
        publishYear:"",
        likeNum:"",
        disLikeNum:"",
        genres:"",
        category:"",
    },
    validationSchema:formSchema,
    onSubmit:(values)=>{
        console.log(values) 
        postMovies(values)
    }   
  })

  const postMovies=async(newMovie)=>{
    console.log("Movie Posted to the DB..")
    console.log("NEW MOVIE:",newMovie)
    let res = await fetch(`https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie`,{
        method:'POST',
        headers:{'content-type':'application/json'}, 
        //send your data in the request body as JSON
        body:JSON.stringify(newMovie)
        //passing a object and sending to the server > string format
    })
    let data = await res.json()
    console.log(data)
    getMovieData()
  }

  const getMovieData=async()=>{
    console.log("Movie data is called....")
    let res = await fetch('https://66760c9da8d2b4d072f24534.mockapi.io/movie/movie')//API call to get all movie data
    let data = await res.json()//responding in string, conver to json format
    console.log(data)
    setMovieData(data)
}
  return (
    <form onSubmit={formik.handleSubmit}>
    <Box style={{ margin: "3% 15%" }}
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "45ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        spacing={{ xs: 2, sm: 4 }}
      >
        {/* MOVIE NAME */}
        <TextField
          required
          label="Movie Name"
          name="moviename"
          id="moviename"
          placeholder="Movie Name"
          onChange={formik.handleChange}
          defaultValue={formik.values.moviename}
        />
          {formik.errors.moviename && formik.touched.moviename ? (
            <div>{formik.errors.moviename}</div>
          ) : null}
        {/* MOVIE POSTER */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Movie Poster"
        />
        <br />

        {/* MOVIE Rating */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Rating"
        />

        {/* Category */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Category"
        />
        <br />

        {/* MOVIE CAST */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Movie Cast"
        />

        {/* MOVIE TRAILER */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Movie Trailer"
        />
        <br />
        {/* Publish Year */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Publish Year"
        />

        {/* Like Num */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Like Number"
        />
        <br />
        {/* DISLIKE NUM */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Dislike Number"
        />

        {/* MOVIE GEnres */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Genres"
        />

        {/* Summary */}
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Summary"
        />
      </Stack>
      <div style={{ marginTop: "2%" }}>
        {/* ADD MOVIE */}
        <Button style={{ marginRight: "2%" }} type="submit" variant="contained">
          ADD MOVIE
        </Button>

        {/* Back */}
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            navigate("/allmovies");
          }}
        >
          BACK
        </Button>
      </div>
    </Box>
    </form>
  );
}
