import { useState, useEffect } from "react";


export default function Collection(props){


  const [note,setNote]=useState([])


useEffect(()=>{
  setNote(props.collect[index].name)
  console.log(note);
})

  // const removal = () => {
  //   setNote(current =>
  //     current.filter(exercise => {
  //       // 👇️ remove object that has id equal to 2
  //       return employee.id !== 2;
  //     }),
  //   );
  // };

  const index=props.index
  const exercise=props.exercise

  console.log(props.exercise);
  console.log("Key: "+props.exKey);
  console.log("Row selection: "+props.index);
  console.log("Collection:"+ props.collect[index].key);
  //console.log("Note: "+note);


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
