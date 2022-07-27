import { useState, useEffect } from "react";


export default function Collection(props){


  const [note,setNote]=useState([])


useEffect(()=>{
  setNote(props.collect[index].name)

})


  const index=props.index
  const exercise=props.exercise




  function LogNum(num,key){

    setNote(props.collect[index].name)
    console.log(note);
  }



  return(
    <div id="exercise_name" className="exercise_name" >
    <span id="exercise">{props.collect[index].name}</span>
  </div>
  )
}
