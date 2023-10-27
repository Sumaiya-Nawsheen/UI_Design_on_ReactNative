import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';

// Data for the horizontal list
const HorizontalListData = [
  { val: 'Add', id: '0', isAddTile: true },
  { val: 'Item_A', id: '1'},
  { val: 'Item_B', id: '2'},
  { val: 'Item_C', id: '3'},
  { val: 'Item_D', id: '4'},
  { val: 'Item_E', id: '5'},
  { val: 'Item_F', id: '6'},
  { val: 'Item_G', id: '7'},
  { val: 'Item_H', id: '8'},
  { val: 'Item_I', id: '9'},
  { val: 'Item_J', id: '10'}
];

const Body_SectionB = () => {
  // Define state variables
  const [horizontalListData, setHorizontalListData] = useState(HorizontalListData);
  const [selectedText, setSelectedText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isEditDeleteModalVisible, setEditDeleteModalVisible] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState(null);

  // Function to handle tile press
  const handleTilePress = (text) => {
    Alert.alert('Tile Pressed', `Pressed on ${text}`);
  };

  // Function to handle long press on a tile
  const handleTileLongPress = (id, text) => {
    setSelectedText(text);
    setEditedText(text);
    setEditDeleteModalVisible(true);
    setSelectedTileId(id);
  };

  // Function to save changes in the modal
  const handleSaveChanges = () => {
    // Handle saving changes here
    const updatedList = horizontalListData.map(item => {
      if (item.id === selectedTileId) {
        return { ...item, val: editedText };
      }
      return item;
    });
    setHorizontalListData(updatedList);
    setEditDeleteModalVisible(false);
  };

  // Function to delete a tile
  const handleDeleteTile = () => {
    const updatedList = horizontalListData.filter((item) => item.id !== selectedTileId);
    setHorizontalListData(updatedList);
    setEditDeleteModalVisible(false);
  };

  // Function to add a new tile
  const handleAddTile = () => {
    const newItem = { val: 'Blank', id: `${Date.now()}`, isAddTile: false };
    setHorizontalListData([...horizontalListData.slice(0, 1), newItem, ...horizontalListData.slice(1)]);
  };

  // Function to handle tile action (either add or long press)
  const handleTileActionPress = (item) => {
    if (item.isAddTile) {
      handleAddTile();
    } else {
      handleTileLongPress(item.id, item.val);
    }
  };

  return (
    <View style={styles.bodySectionB}>
      <FlatList
        data={horizontalListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Tile
            text={item.val}
            isAddTile={item.isAddTile}
            onPress={() => handleTilePress(item.val)}
            onLongPress={() => handleTileLongPress(item.id, item.val)}
            onActionPress={() => handleTileActionPress(item)}
          />
        )}
        horizontal={true}
      />

      <EditDeleteModal
        isVisible={isEditDeleteModalVisible}
        selectedText={selectedText}
        onEdit={handleSaveChanges}
        onDelete={handleDeleteTile}
        onCancel={() => setEditDeleteModalVisible(false)}
        onChangeText={(text) => setEditedText(text)}
        editedText={editedText}
      />
    </View>
  );
};

const Tile = ({ text, isAddTile, onPress, onLongPress, onActionPress }) => {
  return (
    <TouchableOpacity onPress={isAddTile ? onActionPress : onPress} onLongPress={isAddTile ? undefined : () => onLongPress(text)}>
      <View style={styles.tile}>
        <Text style={styles.tileText}>{isAddTile ? 'Add' : text}</Text>
        {isAddTile ? (
          <Image source={require('./add.png')} style={styles.image} />
        ) : (
          <Image source={require('./tree.png')} style={styles.image} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const EditDeleteModal = ({ isVisible, selectedText, onEdit, onDelete, onChangeText, editedText }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Data</Text>
          <TextInput
            style={styles.input}
            placeholder="Edit Text"
            onChangeText={onChangeText}
            value={editedText}
          />
          <TouchableOpacity style={styles.saveButton} onPress={onEdit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpace} />
          <View style={styles.buttonSpace} />
          <TouchableOpacity style={styles.cancelButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bodySectionB: {
    flex: 4 / 14,
    backgroundColor: '#fed700',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: '100%',
  },
  tile: {
    backgroundColor: '#b0dee7',
    height: 190,
    borderRadius: 15,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  tileText: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 30,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
});

export default Body_SectionB;
