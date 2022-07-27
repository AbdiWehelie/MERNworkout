import './App.css';
import 'antd/dist/antd.css';
import { useState, useEffect,useRef } from "react";
import Form from 'react-bootstrap/Form'
import {Divider, Radio,Table,Button} from 'antd'
import { DownloadOutlined } from '@ant-design/icons';
import Collection from "./components/collection"
import Axios from "axios";



function App() {

  const ref = useRef();
  const [listofExercises,setListofExercises]=useState([])
  const [note, setNote]=useState("")
  const [name, setName] = useState("");
  const [type, setType]=useState("");

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

// For local use only
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

//Gets the table data from the list of exercises obtained from the database
const dataSource=[{listofExercises}]

//responable for the structure on function of the table columns
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
       text: 'Back',
       value: 'Back',
     },
     {
       text: 'Biceps',
       value: 'Biceps',
     },
     {
       text: 'Core',
       value: 'Core',
     },
     {
       text: 'Legs',
       value: 'Legs',
     },
     {
       text: 'Triceps',
       value: 'Triceps',
     },
   ],
   onFilter: (value: string, record) => record.type.indexOf(value) === 0,
 },

]

const onSelectChange = (newSelectedRowKeys) => {
  //saves selected rows in state
  setSelectedRowKeys(newSelectedRowKeys);

};

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
const hasSelected = selectedRowKeys.length > 0;




const getNames=()=>{
  console.log(ref.current?.innerText);
  const string=ref.current?.innerText
  //setNote(ref.current?.innerText)
  console.log(string);
  exportExercise(string)
}

//takes the selected exercises and exports them into a .txt file
function exportExercise(exercise) {
  console.log("exportExercise: "+exercise);
  let fileData = JSON.stringify(" "+exercise);
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


<div id='exercise_collection' ref={ref}>
<h2 style={{
  fontWeight: 'bold',
  fontStyle: 'oblique',
  fontSize: "large"
}}>Workout menu:</h2>
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
    pagination={{
          position: ["none","none"],
        }}
        scroll={{
      y: 390,
    }}
    />
    <div>
<br/>
          <Button onClick={getNames}  type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
       Get Workout menu
     </Button>
    </div>
</div>
  );
}

export default App;
