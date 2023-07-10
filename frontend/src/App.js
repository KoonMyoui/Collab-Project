import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
//page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
import { Counter } from "./components/pages/Couter";
import  Chat  from "./components/pages/Chat";
import  NewChat  from "./components/pages/NewChat"

//layout
import Navbar from "./components/layouts/Navbar";
import NewNavBar from "./components/layouts/NewNavBar";
import { Routes, Route } from "react-router-dom";
//pages user
import UserHome from './components/pages/user/Home'
import OpportForm from "./components/pages/user/OpportForm";
import ProjectDetail from './components/pages/user/ProjectDetail'
import ChatPage from "./components/pages/user/ChatPage"
import MyRequest from "./components/pages/user/MyRequest";
import Profile from "./components/pages/user/Profile"
import ManageOpport from "./components/pages/user/ManageOpport";
//page admin
import AddminHome from './components/pages/admin/Home'
import ManageUser from "./components/pages/admin/ManageUser";

//functions
import { currentUser } from './components/functions/auth'
//reducers
import { login, logout } from './components/reducers/userSlice'

//routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";


function App() {
  const dispatch = useDispatch()
  const idtoken = localStorage.token
  const navigate = useNavigate();

  if(idtoken){
    currentUser(idtoken)
    .then(res=>{
      console.log(res.data)
      if(res.data.status === "error"){
        alert("Token expired Please login again")
        dispatch(logout({
          payload: null
        }))
        navigate("/login")
      }

      dispatch(login({
        payload:{
          token: idtoken,
          id: res.data._id,
          username: res.data.username,
          role: res.data.role,
          pic:res.data.pic
        }
      }));
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className="App">
      {/* <Navbar/> */}
      <NewNavBar/>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/couter" element={<Counter/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/newchat" element={<NewChat/>}/>
        <Route path="/detail/:id" element={<ProjectDetail/>}/>

        <Route path="/admin/index" element={<AdminRoute> <AddminHome/> </AdminRoute>}/>
        <Route path="/admin/manage-user" element={<AdminRoute> <ManageUser/> </AdminRoute>}/>

        <Route path="/user/index" element={ <UserRoute> <UserHome/> </UserRoute> }/>
        <Route path="/user/opport-form" element={ <UserRoute> <OpportForm/> </UserRoute> }/>
        <Route path="/user/my-request" element={ <UserRoute> <MyRequest/> </UserRoute> }/>
        <Route path="/user/profile" element={ <UserRoute> <Profile/> </UserRoute> }/>
        <Route path="/user/manage-opport" element={ <UserRoute> <ManageOpport/> </UserRoute> }/>

      </Routes>
    </div>
  );
}

export default App;
