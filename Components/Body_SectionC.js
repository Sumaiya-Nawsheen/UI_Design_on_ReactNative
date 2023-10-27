// Import the necessary modules and components
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';

// Data for the vertical list
let VerticalListData = [
  { val: 'Item_A', age: '30', id: '1' },
  { val: 'Item_B', age: '35', id: '2' },
  { val: 'Item_C', age: '20', id: '3' },
  { val: 'Item_D', age: '44', id: '4' },
  { val: 'Item_E', age: '22', id: '5' },
  { val: 'Item_F', age: '33', id: '6' },
  { val: 'Item_G', age: '30', id: '7' },
  { val: 'Item_H', age: '40', id: '8' },
  { val: 'Item_I', age: '50', id: '9' },
  { val: 'Item_J', age: '50', id: '10' }
];

// Define the Body_SectionC component
const Body_SectionC = () => {
  // Define state variables
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  // Function to handle box press
  const handleBoxPress = (name) => {
    Alert.alert('Box Pressed', `Pressed on ${name}`);
  };

  // Function to handle long press on a box
  const handleBoxLongPress = (item) => {
    setSelectedItem(item);
    setEditedName(item.val);
    setEditedAge(item.age);
    setModalVisible(true);
  };

  // Function to handle edit and submit
  const handleEditSubmit = () => {
    // Update the data and hide the modal
    if (selectedItem) {
      // Find the index of the selected item
      const itemIndex = VerticalListData.findIndex((item) => item.id === selectedItem.id);
      if (itemIndex !== -1) {
        // Update the data with edited values
        VerticalListData[itemIndex].val = editedName;
        VerticalListData[itemIndex].age = editedAge;
      }

      setModalVisible(false);
    }
  };

  // Function to add a new item
  const handleAddNewItem = () => {
    // Create a new item and add it to the data
    const newItem = {
      val: newName,
      age: newAge,
      id: (VerticalListData.length + 1).toString(),
    };
  
    // Add the new item at the beginning
    VerticalListData.splice(0, 0, newItem);

    // Clear the input fields
    setNewName('');
    setNewAge('');
  };

  // Function to delete an item
  const handleDeleteItem = () => {
    // Delete the selected item and hide the modal
    if (selectedItem) {
      const updatedData = VerticalListData.filter((item) => item.id !== selectedItem.id);
      VerticalListData = updatedData;
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.bodySectionC}>
      {/* Fixed box at the top */}
      <View style={styles.fixedBox}>
        <Text style={styles.fixedBoxTitle}>Name:</Text>
        <TextInput
          style={styles.fixedBoxInput}
          placeholder="Name"
          value={newName}
          onChangeText={setNewName}
        />
        <Text style={styles.fixedBoxTitle}>Age:</Text>
        <TextInput
          style={styles.fixedBoxInput}
          placeholder="00"
          value={newAge}
          onChangeText={setNewAge}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleAddNewItem}>
          <Image source={require('./add.png')} style={styles.actionImage} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={VerticalListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InfoBox
            name={item.val}
            age={item.age}
            onPress={() => handleBoxPress(item.val)}
            onLongPress={() => handleBoxLongPress(item)}
          />
        )}
        vertical={true}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editedName}
              onChangeText={setEditedName}
            />
            <Text style={styles.modalTitle}>Edit Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={editedAge}
              onChangeText={setEditedAge}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleEditSubmit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpace} />
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteItem}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// InfoBox component
const InfoBox = ({ name, age, onPress, onLongPress }) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.infoBox}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{`Name: ${name}`}</Text>
          <Text style={styles.infoText}>{`Age: ${age}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  // Styles for the Body_SectionC component
  bodySectionC: {
    flex: 7 / 14,
    backgroundColor: '#ed83ec',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  // Styles for the InfoBox component
  infoBox: {
    backgroundColor: '#f5f5dd',
    height: 63,
    justifyContent: 'center',
    borderRadius: 15,
    padding: 14,
    margin: 7,
  },
  infoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  // Styles for the Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonSpace: {
    width: '10%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  // Styles for the fixed box
  fixedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5dd',
    borderRadius: 15,
    padding: 9,
    margin: 7,
  },
  fixedBoxTitle: {
    fontSize: 16,
  },
  fixedBoxInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
  },
  actionImage: {
    width: 48,
    height: 48,
  },
});

// Export the Body_SectionC component as the default export
export default Body_SectionC;
