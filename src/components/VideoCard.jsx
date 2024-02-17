import { Link } from 'react-router-dom';
import { Typography,Card,CardContent,CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { demoVideoUrl,demoVideoTitle,demoChannelUrl,demoChannelTitle } from '../utils/constants';
const VideoCard = ({video:{id:{videoId},snippet}}) => {
  return (
    <Card sx={{width:{xs:'100%',sm:'100%',md:'320px'},boxShadow:'none',borderRadius:'50px','&:hover': {
      boxShadow:"0 0 15px #fff",transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    },}}>
      <Link to={videoId?`/video/${videoId}`:demoVideoUrl}>
      <CardMedia 
    image={snippet?.thumbnails?.high?.url || 'fallbackImageUrl'} // Provide a fallback image URL if 'url' is undefined
    alt={snippet?.title}
    sx={{width:{xs:'100%', sm:'358px', md:'320px'}, height:180}}
    />
      </Link>
      <CardContent sx={{backgroundColor:'#1e1e1e',height:'106px'}}>
       <Link to={videoId?`/video/${videoId}`:demoVideoUrl}>
        <Typography variant='subtitle1' fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0,60)||demoVideoTitle.slice(0,60)}
        </Typography>
       </Link>
       <Link to={snippet?.channelId?`/channel/${snippet?.channelId}`:demoChannelUrl}>
        <Typography variant='subtitle2' fontWeight="bold" color="gray">
            {snippet?.channelTitle||demoChannelTitle}
            <CheckCircle sx={{fontSize:12,color:'gray',ml:'3px'}}/>
        </Typography>
       </Link>
      </CardContent>
    </Card>
  )
}

export default VideoCard
