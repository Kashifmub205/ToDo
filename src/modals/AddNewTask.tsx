import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const AddNewTask = (props: any) => {
  const [inputValue, setInputValue] = useState('');

  const handleClose = () => {
    setInputValue('');
    props.closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.openModal}
      onRequestClose={() => props.closeModal()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Your Text</Text>
          <TextInput
            value={inputValue}
            onChangeText={text => setInputValue(text)}
            placeholder="Type here..."
            multiline={true}
            style={styles.textInput}
          />

          <Button title="Save" onPress={() => props.addTodo} />
        </View>
      </View>
    </Modal>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    maxHeight: 200,
  },
});
