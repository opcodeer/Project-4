import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import LoadingBar from 'react-top-loading-bar';
import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App = () => {
  const [progress, setProgress] = useState(0);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
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
          <Route path='/signup' element={<SignUp setProgress={updateProgress}/>}/>
          <Route path='/login' element={<Login setProgress={updateProgress}/>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
