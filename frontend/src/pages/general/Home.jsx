import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
    const [ videos, setVideos ] = useState([])
    

    useEffect(() => {
        axios.get("https://zomagram.onrender.com/api/food", { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch(err => {
                console.error("Food fetch failed:", err);
            });
    }, [])




    async function likeVideo(item) {
    const response = await axios.post(
        "https://zomagram.onrender.com/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
    );

    if (response.data.message.includes("liked")) {
        setVideos(prev =>
            prev.map(v =>
                v._id === item._id
                    ? { ...v, likeCount: (v.likeCount || 0) + 1 }
                    : v
            )
        );
    } else {
        setVideos(prev =>
            prev.map(v =>
                v._id === item._id
                    ? { ...v, likeCount: Math.max((v.likeCount || 1) - 1, 0) }
                    : v
            )
        );
    }
}




    // async function likeVideo(item) {

    //     const response = await axios.post("https://zomagram.onrender.com/api/food/like", { foodId: item._id }, {withCredentials: true})

    //     if(response.data.like){
    //         console.log("Video liked");
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
    //     }else{
    //         console.log("Video unliked");
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
    //     }
        
    // }

    async function saveVideo(item) {
    const response = await axios.post(
        "https://zomagram.onrender.com/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
    );

    if (response.data.message.includes("saved")) {
        setVideos(prev =>
            prev.map(v =>
                v._id === item._id
                    ? { ...v, savesCount: (v.savesCount || 0) + 1 }
                    : v
            )
        );
    } else {
        setVideos(prev =>
            prev.map(v =>
                v._id === item._id
                    ? { ...v, savesCount: Math.max((v.savesCount || 1) - 1, 0) }
                    : v
            )
        );
    }
}


    // async function saveVideo(item) {
    //     const response = await axios.post("https://zomagram.onrender.com/api/food/save", { foodId: item._id }, { withCredentials: true })
        
    //     if(response.data.save){
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
    //     }else{
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
    //     }
    // }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home
