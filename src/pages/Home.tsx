import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameName = tasks.find(task => task.title === newTaskTitle)
    if (taskWithSameName) {
      Alert.alert('Task já cadastrada' , 'Você não pode cadastrar uma task com o mesmo nome' )
    } else {
      setTasks([
        ...tasks,
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false
        }
      ])
    }
  }
  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToChange = updatedTasks.find(task => task.id === id)

    if (!taskToChange) {
      return
    }
    taskToChange.done = !taskToChange.done
    setTasks(updatedTasks)
  }
  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            const tasksFiltered = tasks.filter(task => task.id !== id)
            setTasks(tasksFiltered)
          },
          style: "cancel"
        },
        { text: "Não", onPress: () => {return}}
      ]
    );  
  }

  function handleEditTask(taskId:number,taskNewTitle: string){
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToChange = updatedTasks.find(task => task.id === taskId)

    if (!taskToChange) {
      return
    }
    taskToChange.title = taskNewTitle
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask = {handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
