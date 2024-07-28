import  { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import ReactPlayer from "react-player";
import ChannelInfo from "./ChannelInfo";
import VideoInfo from "./VideoInfo";
import Comments from "./Comments";
import VideoCard from "../../components/VideoCard";

const VideoDetail = () => {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);

  //**  1) Arama parametrelerine erişim icin kullanırız.
  const [searchParams] = useSearchParams();

  //** 2) url'deki "v" ismini verdiğimiz id parametresine eriştik.
  const id = searchParams.get("v");
  

  //** 3) id'si bilinen videonun bilgilerini api'den aldık.
  useEffect(() => {
    
    api.get(`/video/info?id=${id}&extend=1`).then((res) => setVideo(res.data));

    api.get(`/comments?id=${id}`).then((res) => setComments(res.data));
  }, [id]); 

 

  return (
    <div className="detail-page overflow-auto h-screen">

<div>
      {/**video içeriği  */}
      <div className="h-[50vh] lg-h-[60vh] rounded-md overflow-hidden">
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          controls
          url={`https://www.youtube.com/watch?v=${id}`}
        />
      </div>

      {!video && <p>Yukleniyor...</p>  }

     
    {video && (
      <>
      <h1 className="text-xl font-bold my-3">{video.title}</h1>
      
      <ChannelInfo video={video}/>

      <VideoInfo video={video}/>

      <Comments data={comments}/>
      </>
    )}

</div>

    <div className="flex flex-col gap-5 p-1 cursor-pointer">
      {video?.relatedVideos.data.map((item) => 
        item.type === "video" && <VideoCard key={item.videoId} video={item} isRow={true}/>
      )}
    </div>
    </div>
  );
};

export default VideoDetail;