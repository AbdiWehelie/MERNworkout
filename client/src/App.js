import './App.css';
import 'antd/dist/antd.css';
import { useState, useEffect,useRef } from "react";
import Form from 'react-bootstrap/Form'
import {Divider, Radio,Table,Button} from 'antd'
import Collection from "./components/collection"
import Axios from "axios";

// TODO: Make the app look presentable

function App() {

  const ref = useRef();
  const [listofExercises,setListofExercises]=useState([])
  const [note, setNote]=useState("")
  const [name, setName] = useState("");
  const [type, setType]=useState("");
  //const [exerciseType, setExerciseType]=useState("")
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  useEffect(() => {
   Axios.get("https://mernworkoutdata.herokuapp.com/getExercise").then((response) => {
     setListofExercises( response.data.map((row,index) => ({
            name: row.name,
            type: row.type,
            key: index
          }
        )
      )
    );

   });
 }, []);


 const createExecise=()=>{
   Axios.post("http://localhost:3001/createExecise",{
     name,
     type,
   }).then((response)=>{
     setListofExercises([
              ...listofExercises,
              {
                name,
                type
              },
        ]);
      })
   }


const dataSource=[{listofExercises}]

const columns=[
  {
   title: 'Name',
   dataIndex: 'name',
   key: 'name',
   sorter: (a, b) => a.name.localeCompare(b.name)
 },
 {
   title: 'Type',
   dataIndex: 'type',
   key: 'type',
   sorter:(a,b)=>a.type.localeCompare(b.type),
   filters: [
     {
       text: 'Arms',
       value: 'Arms',
     },
     {
       text: 'Core',
       value: 'Core',
     },
   ],
   onFilter: (value: string, record) => record.type.indexOf(value) === 0,
 },

]

const onSelectChange = (newSelectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  console.log(selectedRowKeys[newSelectedRowKeys]);
  setSelectedRowKeys(newSelectedRowKeys);

};

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
const hasSelected = selectedRowKeys.length > 0;

// const text=document.getElementById("exercise_collection")
// console.log(text);


const getNames=()=>{
  console.log(ref.current?.innerText);
  const string=ref.current?.innerText
  //setNote(ref.current?.innerText)
  console.log(string);
  exportExercise(string)
}


function exportExercise(exercise) {
  console.log("exportExercise: "+exercise);
  let fileData = JSON.stringify("Workout menu: "+exercise);
  fileData = fileData.replace(/\\n/g, ' ');
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "Exercise_List";
  link.href = url;
  link.click();
}



  return (
    <div className="App">

<div>
      <Button onClick={getNames}>Generate list</Button>

</div>
<div id='exercise_collection' ref={ref}>
<br/>
<br/>
{listofExercises.map((exercise,index) =>
{
  if(selectedRowKeys[index]!=undefined){
    return(
      <Collection collect={listofExercises} index={selectedRowKeys[index]} exKey={exercise.key} exercise={exercise.name}/>
    )}
}
 )}
</div>
    <Table
    dataSource={listofExercises}
    columns={columns}
    rowSelection={rowSelection}
    />
            <div>
                {<h3 onClick={getNames}>{note}</h3>}
                {note !="" && note!= undefined &&

                <Button style={{backgorundColor:"rgb(103, 115, 215)"}} onClick={exportExercise}>Get workout menu</Button>
                }
            </div>
</div>
  );
}

export default App;
