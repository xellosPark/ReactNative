import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Assuming you have this import set correctly
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';  // Assuming you have this import set correctly

const SubEventView = ({ visible, events, onClose }) => {
  const [showDetails, setShowDetails] = useState(false); // Controls the display of detailed view
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the currently selected event
  const [selectedEventId, setSelectedEventId] = useState(null); // Stores the ID of the selected event

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setSelectedEventId(event.id);
    setShowDetails(true); // Show details when an event is selected
  };

  const renderDetailsView = () => {
    if (!selectedEvent) return null; // If no event is selected, do not render details
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.textRow}>
          <Text style={styles.labelText}>프로젝트: </Text>
          <Text style={styles.valueText}>{selectedEvent.title}</Text>
        </View>
        <View style={styles.underline} />
        <View style={styles.textRow}>
          <Text style={styles.labelText}>제목: </Text>
          <Text style={styles.valueText}>{selectedEvent.title}</Text>
        </View>
        <View style={styles.underline2} />
        <View style={styles.textRow}>
          <Text style={styles.valueText2}>밑줄을1231232132u329817489479812798471928471928472419871249922342387983257893572398579028375987253980523798235729835798237598023798523798572398759283759823759825379852372359875239823573525329834578954978789345689745367894368907-34528970439807234690846328094623890-=4632980-=4623890-46328903462890-4362-8906342890-2463-89043690-8540934285093428590324803890580923809580923580923850928309829203859082305982350912984902842091824098241091248120948920840921480239589023850928958239058239085290358092939502830958290385902385902389058239058923085902385908239085093289508239082539082359053829028590238230983509238902385902380958209 결합된 -</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>ToDo List</Text>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Icon name="close-circle" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.eventsContainer}>
            {events.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventItem} onPress={() => handleEventSelect(event)}>
                <Icon2 
                  name={selectedEventId === event.id ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'} 
                  size={24} 
                  color={selectedEventId === event.id ? '#153448' : '#153448'}
                  style={{ marginRight: 5 }}  
                />
                <Text style={[styles.eventText, { backgroundColor: event.color }]}>{event.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {showDetails && renderDetailsView()}
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
    maxHeight: '100%',  // Reduce vertical size to half of the screen
    width: '80%',
    backgroundColor: '#AAB',
    padding: 20,
    borderRadius: 10,
    overflow: 'hidden',  // Ensure the ScrollView is contained within the modal
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#8E7AB5', 
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color : 'white'
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start' 
  },
  eventText: {
    padding: 7,
    borderRadius: 5,
    width: 250
  },
  closeIcon: {
    padding: 10,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: '#F6FDC3',
    padding: 10,
    borderRadius: 5,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }, 
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  underline: {
    height: 1,
    backgroundColor: 'red',
    marginBottom: 3,
  },
  underline2: {
    height: 1,
    backgroundColor: '#222',
    marginBottom: 3,
  },
  valueText: {
    fontSize: 13,
    color: 'black',
  },
  valueText2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 13,
    color: 'black',
  },eventsContainer: {
    maxHeight: 170,  
  },
});

export default SubEventView; 