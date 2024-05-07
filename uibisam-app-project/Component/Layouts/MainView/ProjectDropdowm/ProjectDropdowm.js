import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import ProjectInfoData from '../../../../API/ProjectInfoData';

const ProjectDropdowm = ({setSelected}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [option, setOption] = useState("No Data");
    const [selectedOption, setSelectedOption] = useState("");

    const options = [
        { label: "프로젝트 선택1", value: "프로젝트 선택1" },
        { label: "프로젝트 선택2", value: "프로젝트 선택2" },
        { label: "프로젝트 선택3", value: "프로젝트 선택3" },
        { label: "프로젝트 선택4", value: "프로젝트 선택4" },
    ];

    const loadProjectInfo = async () => {
        try {
            const data = await ProjectInfoData('홍길동');
            const prjName = data.map(item => item.text);
            console.log('prjName 21',prjName);
            setOption(prjName);
        } catch (error) {
            console.error('Failed to fetch project info:', error);
            // 필요하다면 에러 상태를 설정할 수 있습니다
            setSelectedOption('No Data');
            setSelected('No Data');
        }
    };

    useEffect(() => {
        loadProjectInfo();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.buttonText}>
          {selectedOption || "No Data"}
        </Text>
        <Icon name={showDropdown ? "expand-less" : "expand-more"} size={20} />
      </TouchableOpacity>

            {showDropdown && (
                <FlatList
                    data={option}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setSelectedOption(item);
                                setShowDropdown(false);
                                setSelected(item);
                            }}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    dropdownButton: {
        borderColor: "#000",
        borderWidth: 1,
        margin: 5,
        top: 2,
        padding: 10,
        borderRadius: 4,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
    },
    option: {
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        marginStart: 10,
        marginEnd: 10,
        borderWidth: 1,
        padding: 7,
        backgroundColor: "transparent",

    },
    optionText: {
        fontSize: 14,
    },
});

export default ProjectDropdowm
