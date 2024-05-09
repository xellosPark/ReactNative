import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const SubEventView = ({ visible, events, onClose }) => {
  const [showDetails, setShowDetails] = useState(false); // 상세정보 표시 여부
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트 객체
  const [selectedEventId, setSelectedEventId] = useState(null); // 선택된 이벤트 ID

  // 이벤트 선택 핸들러
  const handleEventSelect = (event) => {
    setSelectedEvent(event); // 선택된 이벤트로 상태 업데이트
    console.log('ID 상태 13',event.id);
    setSelectedEventId(event.id); // 선택된 이벤트 ID로 상태 업데이트
    setShowDetails(true); // 상세정보 보기 활성화
  };

  // 선택된 이벤트의 상세정보를 렌더링
  const renderDetailsView = () => {
    if (!selectedEvent) return null; // 선택된 이벤트가 없다면 렌더링하지 않음
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.textRow}>
          <Text style={styles.labelText}>프로젝트: </Text>
          <Text style={styles.valueText}> {selectedEvent.title}</Text>
        </View>
        <View style={styles.underline} />
        <View style={styles.textRow}>
          <Text style={styles.labelText}>제목: </Text>
          <Text style={styles.valueText}> {selectedEvent.title}</Text>
        </View>
        <View style={styles.underline2} />
        <View style={styles.textRow}>
          <Text style={styles.valueText2}> 밑줄을 결합된 텍스트(레이블 + 값)의 너비와 일치시키려면 컨테이너 스타일을 조정하거나 다른 레이아웃 전략을 사용해야 할 수 있습니다. 밑줄이 여전히 텍스트와 같은 줄에 나타나는 경우 flexDirection: 'row'가 잘못 적용되지 않았는지 또는 스타일이 같은 줄에 강제로 적용되지 않는지 확인하세요. 위와 같이 텍스트 내용과 밑줄을 고유한 보기로 올바르게 분리했는지 확인하세요.</Text>
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
    width: '80%',
    backgroundColor: '#AAB',
    padding: 20,
    borderRadius: 10,
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
    // marginLeft: 10, // Spacing between the icon and text
    // fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderRadius: 5,
    width: 250
  },
  closeButton: {
    backgroundColor: '#6CC3D5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
  detailsHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsDescription: {
    fontSize: 14,
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
    textAlign: 'right',
    top: 1,
  },
  valueText2: {
    fontSize: 13,
    color: 'black',
    textAlign: 'left',
    top: 1,
  }
  
});

export default SubEventView;