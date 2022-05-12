import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { Task } from "./TasksList";

import trashIcon from '../assets/icons/trash/trash.png'
import pen from '../assets/icons/pen/editPen.png'
import divider from '../assets/icons/pen/Rectangle.png'





interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  index: number
  task: Task
  editTask: (taskId: number, taskNewTitle: string)=> void;
}



export function TaskItem({ removeTask,toggleTaskDone,index,task,editTask}:TaskItemProps){

 const [isEditing, setIsEditing] = useState(false)

 const [edit, setEdit] = useState(task.title)
 const textInputRef = useRef<TextInput>(null)


 function handleStartEditing (){
   setIsEditing(true)
 }

 function handleCancelEditing(){
  setIsEditing(false)
  setEdit(task.title)
 }

 function handleSubmitEditing (){
   editTask(task.id,edit)
   setIsEditing(false)
 }

 useEffect(()=>{
   if (textInputRef.current) {
    if (isEditing) {
      textInputRef.current.focus();
    } else {
      textInputRef.current.blur();
    }
  }
 },[isEditing])
 

  return(
    <>
    <View>
    <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={task.done === true? styles.taskMarkerDone : styles.taskMarker}
    
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
  ref={textInputRef}
  style={ task.done ? styles.taskTextDone : styles.taskText}
  value={edit}
  editable={isEditing}
  onChangeText={setEdit}
  maxLength = {27}
  onSubmitEditing={handleSubmitEditing}
/>
              </TouchableOpacity>
                </View>

            <View
            testID={`trash-${index}`}
            style={styles.iconContainer}
            
          >
            
              {isEditing?
               (
                <TouchableOpacity
                onPress={handleCancelEditing}>
                <Icon name="x" size={24} color="#b2b2b2"/>
                </TouchableOpacity>
              )
              :
              (
                <TouchableOpacity
                onPress={handleStartEditing}>
                  <Image  source={pen}/>
                  
                </TouchableOpacity>
              )
            
            }

              <Image  source={divider} style={{marginHorizontal: 15 }}/>
            <TouchableOpacity
            disabled={isEditing}
            onPress={()=>removeTask(task.id)}
            >
            <Image source={trashIcon} style={{opacity: isEditing? 0.2 : 1}}/>
            </TouchableOpacity>
          </View>
            </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer:{
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    right: 20,
    
   },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})