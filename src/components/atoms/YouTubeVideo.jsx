import React, {useEffect, useState} from "react";
import ReactPlayer from 'react-player/youtube'

export default function YouTubeVideo(urlVideo) {

  const [url, setUrl] = useState('')

  useEffect(() => {
    const videoId = urlVideo.url;
    setUrl(videoId.split("v=")[1].split("&")[0])
  }, [url]);

  return (
    <div className="w-full flex justify-center">
      <ReactPlayer 
        url={`https://www.youtube.com/watch?v=${url}`}
        light={true}
        volume={null}
        controls={true}
      />
    </div>
  );
}