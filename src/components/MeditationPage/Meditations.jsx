
import Sidebar from "../User/SideBar";
import { useState } from "react";
import MeditationType from "./Type";

function MeditationPage(){
  const[Type,setType] = useState()
  return<>
  <div style={{display:"flex"}}>
      <Sidebar/>
      <MeditationType/>
  </div>
  </>
}
export default MeditationPage;