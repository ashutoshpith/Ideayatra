
import ReactPlayer from 'react-player';
import video from '../../public/video/robot.webm'

const VideoComp = () => {
  return (
    <ReactPlayer
      url={"./public/video/robot.webm"}
      controls={false} // Disable controls
        playing={true}   // Auto-play video
        loop={true}      // Loop video
        width="400px"     // Player width
        height="400px"    // Player height
        onReady={true}
        onPlay={true} 
        config={{
          youtube: {
            playerVars: {
              showinfo: 0, // Hide video info
              modestbranding: 1, // Use modest branding
            },
          },
        }}
    />
    // <Video src="../../public/landingPage/robot.webm" type="video/webm"  />
    // <video width="320" height="240" controls autoPlay muted loop>
    //   <source src="../../public/landingPage/robot.webm" type="video/webm" />
    //   Your browser does not support the video tag.
    // </video>
  );
};

export default VideoComp;
