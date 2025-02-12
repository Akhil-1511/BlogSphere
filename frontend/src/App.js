import './App.css';
import Auth from './components/Auth';
import Header from './components/header';
import UserBlogs from "./components/UserBlogs"
import Blogs from "./components/Blogs"
import BlogDetail from "./components/BlogDetail"
import AddBlog from "./components/AddBlog"

import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
  const isLoggedIn = useSelector((state)=> state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <div>
      <React.Fragment>
        <header>
          <Header/>
        </header>
        <main>
          <Routes>
            {!isLoggedIn ? <Route path="/auth" element={<Auth/>} /> :
            <>
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/blogs/add" element={<AddBlog/>} />
            <Route path="/myBlogs" element={<UserBlogs/>} />
            <Route path="/myBlogs/:id" element={<BlogDetail/>} />
            </>
            
  }
          </Routes>
        </main>
      </React.Fragment>
    </div>
  );
}

export default App;
