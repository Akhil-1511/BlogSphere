import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs =async (req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find().populate("user");
    }
    catch(err)
    {
        console.log(err);
    }
    if(!blogs)
    {
        return res.status(404).json({message:"Blogs not found"});
    }
    return res.status(200).json({blogs})
}

export const addBlog=async (req,res,next)=>{
    const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching user failed, please try again later." });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user." });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    await blog.save();
    existingUser.blogs.push(blog);
    await existingUser.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Creating blog failed, please try again later." });
  }

  return res.status(200).json({ blog });
}

export const updateBlog=async (req,res,next)=>{
    const {title,description}=req.body;
    const blogId=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogId,{
            title:title,
            description:description,
        })
    }
    catch(err){
        console.log(err);
    }
    if(!blog)
    {
        return res.status(500).json({message:"unable to update"});
    }
    return res.status(200).json({blog});
    
}
export const getById=async (req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog=await Blog.findById(id);
    }
    catch(err){
        console.log(err);
    }
    if(!blog)
    {
        return res.status(404).json({message:"Blog not found"})
    }
    return res.status(200).json({blog});
}

export const deleteBlog=async(req,res,next)=>{
    const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(blogId).populate('user');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching blog failed, please try again later." });
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog not found." });
  }

  try {
    await Blog.findByIdAndDelete(blogId);
    blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Deleting blog failed, please try again later." });
  }

  return res.status(200).json({ message: "Blog deleted successfully." });
};

export const getByUserId =async(req,res)=>{
    const userId=req.params.id
    let userBlogs;
    try{
        userBlogs= await User.findById(userId).populate("blogs");
    }
    catch(err)
    {
        return console.log(err);
    }
    if(!userBlogs)
    {
        return res.status(400).json({messsage:"No Blog Found"});
    }
    return res.status(200).json({user:userBlogs});
}

