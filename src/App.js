import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import LoadingBar from 'react-top-loading-bar';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed,Auth } from './components';
import io from 'socket.io-client';
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
const socket= io.connect("https://490bj8xz-8080.inc1.devtunnels.ms");

const App = () => {
  const [progress, setProgress] = useState(0);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  }
  
  async function sendOtp(id){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/otpVerification?id="+ id,{
      method: "GET" ,
     })
     const result = await response.text();
     return result;
  }
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000' }}>
        <Navbar />
        <LoadingBar height="3px" color="red" progress={progress}/>
        <Routes>
          <Route exact path='/' element={<Feed setProgress={updateProgress}/>} />
          <Route path='/video/:id' element={<VideoDetail setProgress={updateProgress}/>} />
          <Route path='/channel/:id' element={<ChannelDetail setProgress={updateProgress}/>} />
          <Route path='/search/:searchTerm' element={<SearchFeed setProgress={updateProgress}/>} />
          <Route path="/auth" exact element={<Auth otp={sendOtp}/>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
