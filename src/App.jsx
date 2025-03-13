import { useEffect, useState } from "react";
import RouteConfig from "./components/RouteConfig";
import backgroundMusic from './assets/soft-birds.mp3';

function App(){
  // const [audio] = useState(new Audio(backgroundMusic));
  // const [isPlaying, setIsPlaying] = useState(true);

  // useEffect(() => {
  //   if (isPlaying) {
  //     audio.loop = true;
  //     audio.play();
  //     audio.volume= 0.5;
  //   } else {
  //     audio.pause();
  //   }

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, [isPlaying, audio]);
    return<>
      <RouteConfig/>
    </>
}
export default App;