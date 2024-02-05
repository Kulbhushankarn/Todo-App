import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const TodoListScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { id: tasks.length + 1, text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View>
      <Text>Add Task:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setTask(text)}
        value={task}
      />
      <Button title="Add" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox value={item.completed} onValueChange={() => toggleTask(item.id)} />
            <Text style={{ marginLeft: 10, textDecorationLine: item.completed ? 'line-through' : 'none' }}>
              {item.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TodoListScreen;
