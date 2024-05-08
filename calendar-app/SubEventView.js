import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SubEventView = ({ visible, events, onClose }) => {
    console.log('여기기요',events);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>이벤트 상세보기</Text>
          {events.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={[styles.eventText, { color: event.color }]}>{event.title}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  eventItem: {
    marginBottom: 10,
  },
  eventText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
});

export default SubEventView;