import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";



import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
const Blog = ({title,description,imageURL,username,isUser,id})=>{

  const navigate= useNavigate();
  const handleEdit =(e) =>{
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest= async()=>{
    const res= axios.delete(`http://localhost:5000/api/blog/${id}`)
    .catch(err=>console.log(err));

    const data =await res.data;
    return data;
  }
  const handleDelete= (e)=>{
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"));

  }
  
  
   console.log(title,isUser)
    return(
        <Card sx={{ width: "40%",margin:'auto',mt:2,padding:2,boxShadow: "5px 5px 10px #ccc",":hover":{
            boxShadow:"10px 10px 20px #ccc"
        } }}>

          {
            isUser && (
              <Box>
                <IconButton onClick={handleEdit}sx={{marginLeft:'auto' }}><EditIcon color="warning"/></IconButton>
                <IconButton onClick={handleDelete}><DeleteIcon color="warning"/></IconButton>
              </Box>
            )
          }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:'red' }} aria-label="recipe">
            {username}
          </Avatar>
        }
       
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      
      <CardContent>
      <hr/>
      <br/>
        <Typography variant="body2" color="text.secondary">
          <b>{username}</b> : {description}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default Blog