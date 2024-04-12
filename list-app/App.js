import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

   useEffect(() => {

    loadItemsFromStorage();

   }, [])
  const loadItemsFromStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items')
      if (storedItems)
      {
        setItems(JSON.parse(storedItems))
      }
    } catch (error ){
      console.error('error', error)      
    }
  }
  const addItem = async () => {

    
    if (newItem.trim() !== '') {
      
      const newItemObj = {
        id: String(Date.now()),
        text: newItem,
      };
      console.log('출력',newItemObj)
      setItems([...items, newItemObj]);
      setNewItem('')
      
      try {
        const updateItems = JSON.stringify([...items, newItemObj]);
        await AsyncStorage.setItem("items", updateItems);
        console.log('updatedItems', updateItems)
      } catch (error) {
        console.error("save faild", error);
      }
    }
  }
  const deleteItem = async (itemId) =>{
    const updatedItems = items.filter((item)=>item.id !== itemId)
    setItems(updatedItems)

    try {
      await AsyncStorage.setItem("items", JSON.stringify(updatedItems))
      console.log('updatedItems', updatedItems)
    } catch (error) {
      console.error("save faild", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>토익 암기장, 간단 메모장</Text>
      <TextInput value= {newItem} placeholder='메모를 입력해주세요.'
        style={styles.input} onChangeText={(text)=>setNewItem(text)}></TextInput>
      <Button title='Save' onPress={addItem} color='green'></Button>
      <FlatList
       data={items}
       renderItem={({item})=>(
        <TouchableOpacity
        onLongPress={()=>setSelectedItemId(item.id)}>
          <Text style={styles.item}>{item.text}</Text>
          {selectedItemId === item.id && (
            <Button
              title="Delete"
              color="red"
              onPress={()=>{
                deleteItem(item.id)
                setSelectedItemId(null)
              }}></Button>
          )
          }
        </TouchableOpacity>
      )}>

      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    width: 300,
    fontSize: 20,
  },
});

export default App;