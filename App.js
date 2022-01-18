import React, {useState} from "react";
import { Text, View ,StyleSheet,ScrollView,KeyboardAvoidingView,Keyboard,TextInput,TouchableOpacity} from "react-native";
import Task from "./components/Task";

export default function App(){

  const [task,setTask] = useState();  
  const [taskItems,setTaskItems] = useState([]);

  const handleAddTask = () =>{
    if(task != null) 
    {
      Keyboard.dismiss();
      setTaskItems([...taskItems,task]);
      setTask(null); 
    }
    else{
      alert('Enter task details');
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);

  }

  return(
    <View style={styles.container}>

      {/* Added scroll view to enable scrolling when list gets longer than page */}
      <ScrollView contentContainerStyle={{
          flexGrow:1
        }} 
        keyboardShouldPersistTaps='handled' 
      >
      <View style={styles.tasksWrapper}>

        {/* Task heading */}
        <Text style={styles.sectionTitle}>Amar's Tasks</Text>
        <Text style={styles.quote}>We are developers</Text>

          <View style={styles.tasks}> 
            {/* task list will go here */}  
            {
              taskItems.map((item,index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task key={index} text={item} />
                  </TouchableOpacity>
                )
              })
            }
            
          </View>
        </View>
      </ScrollView>
        
      {/* Write a task section */}
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios"?"padding":"height"}
          style={styles.writeTaskWrapper}
        >
        <TextInput keyboardType="ascii-capable" style={styles.input} value={task} onChangeText={(text) => setTask(text)} placeholder="Write a task" />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#E8EAED",
  
  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20
  },
  sectionTitle:{
    fontSize:24,
    fontWeight:"bold",
  },
  quote:{
    marginBottom:20
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:20,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor:'#fff',
    borderRadius:60,
    borderColor:'#C0C0C0',
    borderWidth:1,
    width: 250,
    fontSize:16
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'#4630eb',
    opacity: 0.8,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems:'center',
    borderColor:'#C0C0C0',
    borderWidth:1,
    
  },
  addText: {
    fontSize:30,
    paddingBottom:4,
    color: '#fff'
  },
});