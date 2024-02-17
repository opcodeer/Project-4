import axios from "axios";
const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const options = {
  url: BASE_URL,
  params: {
    part: 'snippet',
    videoId: 'M7FIvfx5J10'
  },
  headers: {
    'X-RapidAPI-Key': 'a461e43a0amsh06de2c1245f6126p1ae149jsn45ed1fe38c2c',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};
export const fetchFromAPI = async(url)=>{
   const {data} = await axios.get(`${BASE_URL}/${url}`,options);
   return data;
}