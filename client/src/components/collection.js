import { useState, useEffect } from "react";


export default function Collection(props){


  const [note,setNote]=useState([])


useEffect(()=>{
  setNote(props.collect[index].name)
  console.log(note);
})


  const index=props.index
  const exercise=props.exercise




  function LogNum(num,key){
    console.log("Row#: "+num);
    console.log("Exercise key: "+key);
    setNote(props.collect[index].name)
    console.log(note);
  }

  const getName=()=>{
    console.log("From function");
    console.log(props.collect[index].name);
  }

  return(
    <div id="exercise_name" className="exercise_name" onClick={getName}>
    {props.collect[index].name}
  </div>
  )
}
