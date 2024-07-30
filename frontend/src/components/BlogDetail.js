import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const labStyles= {mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}
const BlogDetail =()=>
{
    const navigate= useNavigate();
    const[blog,setBlog]=useState();
    const id =useParams().id;
    const [inputs,setInputs] =useState({});

    const handleChange = (e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,

        }))

    }
    const fetchDetails= async ()=>{
        const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=> console.log(err));
        const data=await res.data;
        return data;
    }
    useEffect(()=>{
        fetchDetails().then((data)=>{
            setBlog(data.blog);
            setInputs({title:data.blog.title,
                description:data.blog.description,
            })
        });
    },[id]);

    const sendRequest =async ()=>{
        const res=axios.put(`http://localhost:5000/api/blog/update/${id}`,{
            title:inputs.title,
            description:inputs.description,
        }).catch(err=>console.log(err));

        const data= await res.data;
        return data;

    }
    console.log(blog);

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data=> console.log(data)).then(()=>
        navigate("/myblogs"));
    }
    return (
        
        <div>
        {inputs && 
            <form onSubmit={handleSubmit}>
                <Box border={3} 
                borderColor="green" 
                borderRadius={10} 
                boxShadow="10px 10px 20px #ccc" 
                padding={3} 
                margin={"auto"}
                marginTop={3} 
                display="flex" 
                flexDirection={"column"}
                 width={"50%"}>
                    <Typography fontWeight={"bold"} padding={3} variant="h4" color="grey" textAlign={"center"} >Post Your Blog</Typography>
                    <InputLabel sx={labStyles}>Title</InputLabel>
                    <TextField name="title" onChange={handleChange} value={inputs.title} margin=" normal" variant="outlined"/>
                    <InputLabel sx={labStyles}>Description</InputLabel>
                    <TextField name="description" onChange={handleChange} value={inputs.description} margin=" normal" variant="outlined"/>
                    <InputLabel sx={labStyles}>ImageUrl</InputLabel>
                    <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL}margin=" normal" variant="outlined"/>
                    <Button sx={{mt:2,borderRadius:4}} variant="contained"  color="warning" type="submit">Submit</Button>
                </Box>
            </form>
        }

        </div>
    )
}


export default BlogDetail