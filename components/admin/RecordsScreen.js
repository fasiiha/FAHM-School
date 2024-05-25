import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal

} from "react-native"

import { TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from "../layouts/Card";


const RecordsScreen = () => {

    
    const [students, setStudents] = useState([
        {
            regNo: 'fa21-bcs-011', name: 'amna sohaib', fathername: 'sohaib ahmed',
            dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
            residence: 'smth', dateOfAdmission: '13/7/2021'
        },
        {
            regNo: 'fa21-bcs-011', name: 'amna sohaib', fathername: 'sohaib ahmed',
            dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
            residence: 'smth', dateOfAdmission: '13/7/2021'
        },
        {
            regNo: 'fa21-bcs-0024', name: 'fasiha arshad', fathername: 'sohaib ahmed',
            dob: '29/11/2003', gender: 'female', caste: 'smth', occupation: 'smth',
            residence: 'smth', dateOfAdmission: '13/7/2021'
        },
    ]);

    const [list, setList] = useState(students);

    const [index, setIndex] = useState(null);

    const [search, setSearch] = useState("")

    const [modalVisible, setModalVisible] = useState(false);
    const [edit, setEdit] = useState(false);



    const searchItem = (text) => {

        if (text === "") {
            setList(students)
        }
        else {
            setList(() => students.filter((element) => element.name.toLowerCase().includes(text.toLowerCase())))
        }
        setSearch(text)

    }

    handleChangedStudent = () => {
        setModalVisible(!modalVisible); 
        setEdit(false);
    }

    return (
        <View>

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.search}
                    label="Search"
                    onChangeText={(text) => { searchItem(text) }}
                    value={search}
                    onBlur={() => { setSearch(""); setList(students); }}
                />
                <Icon name="magnify" size={30} style={styles.searchIcon}/>
            </View>

            <ScrollView>
                {list.map((element, index) =>
                    <TouchableOpacity onPress={() => { setModalVisible(true); setIndex(index) }}>
                        <Card name={element.name} regNo={element.regNo} cardType="student"></Card>
                    </TouchableOpacity>
                )}

            </ScrollView>

            {index != null && (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.rowStyle}>
                            <Text style={styles.modalHeading}>Student Record</Text>
                            <TouchableOpacity onPress={() => setEdit(true)}>
                            <Icon name="pencil" size={20} style={styles.editIcon} />
                            </TouchableOpacity>
                        </View>

                        
                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Registration Number </Text>
                            <Text style={styles.modalText}>{students[index].regNo}</Text>
                        </View>
                        
                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Name </Text>
                            <TextInput
                                value={students[index].name}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Father Name </Text>
                            <TextInput
                                value={students[index].fathername}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Date of Birth </Text>
                            <TextInput
                                value={students[index].dob}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Gender </Text>
                            <TextInput
                                value={students[index].gender}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Caste </Text>
                            <TextInput
                                value={students[index].caste}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Occupation </Text>
                            <TextInput
                                value={students[index].occupation}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Residence </Text>
                            <TextInput
                                value={students[index].residence}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View>

                        <View style={styles.rowStyle}>
                            <Text style={styles.modalText}>Date of Admission </Text>
                            <TextInput
                                value={students[index].dateOfAdmission}
                                style={styles.TextInput}
                                editable={edit}
                                underlineColor='transparent'
                            />
                        </View> 

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={() => { handleChangedStudent() }}>
                                <Text style={styles.textStyle}>{edit ? 'Done' : 'Close' }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            )}


        </View>


    );
}

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchBar: {
        flexDirection: 'row', 
        margin: 10,
        backgroundColor: 'lavender',
        width: 250,
        padding: 3,
        
        borderRadius: 30
        
    },
    search: {
        height: 40,
        width: 200,
        color: "#000000",
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        paddingHorizontal: 15 
    },
    editIcon: {
        paddingTop: 3,
        color: "#8349EA"
    },

    searchIcon:{
        alignSelf: "center",
        backgroundColor: "#8349EA",
        padding: 5,
        borderRadius: 20
        
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    TextInput: {
        height: 36,
        fontSize: 14,
        color: '#333333',
        fontFamily: 'Poppins-Regular'
    },
    modalView: {
        width: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 45,
        justifyContent: 'center',
        shadowColor: '#8349EA',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: '#FFFFFF'
    },

    
    buttonCancel: {
        marginTop: 10,
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: '#8349EA'

    },

    textStyle: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },

    modalHeading: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        marginBottom: 15,
        textAlign: 'center',
        color: 'black'
    },
    modalText: {
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'left',
        color: 'black',
        fontFamily: 'Poppins-Medium'
    },
})

export default RecordsScreen