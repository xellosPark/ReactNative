import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import ProjectInfoData from '../../../../API/ProjectInfoData';
import UpdatePrjStatus from '../../../../API/UpdatePrjStatus';

const ProjectDropdowm = ({selectProject, userInfo, option, handleOption}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    //const {dropdown} = useState(option ? option : "No Data");
    const [selectedOption, setSelectedOption] = useState("");

    const updateImpPrj = (item) => {
        UpdatePrjStatus(item, userInfo.name);
    };

    useEffect(() => {
        setSelectedOption(userInfo.impProject)
    }, [option])

    return (
        <View style={styles.container}>

                    <TouchableOpacity
                        style={styles.dropdownButton}
                        onPress={() => setShowDropdown(!showDropdown)}
                    >
                        <Text style={styles.buttonText}>
                            {selectedOption}
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
                                        updateImpPrj(item);
                                        handleOption(item);
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
