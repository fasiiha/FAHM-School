
import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
 } from "react-native"

 import { viewSyllabus } from '../../api/student';

const StudentSyllabus = ( {student} ) => {
  
  const [syllabusImg, setSyllabusImg] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      fetchSyllabus();
  },);

  const studentClass = student.currentClass;

  const fetchSyllabus = async () => {
    try {
      const syllabusData = await viewSyllabus(studentClass);
      console.log(syllabusData);
      if (syllabusData.syllabus) {
        setSyllabusImg(syllabusData.syllabus);
      } else {
        setSyllabusImg(null);
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching syllabus: ', error);
    }
  };

    return(
      <View>
      {isLoading ? <ActivityIndicator size="large" color='#9C70EA' /> :
        (
          (syllabusImg !=null) ? ( 
            <Image source={{ uri: syllabusImg }} style={styles.pic} />
          ) : (
            <View style={styles.NoImage}>

              <Text style={styles.NoImageText}>No syllabus found</Text>

            </View>
          )
        )
      }
    </View>
        
    );
}

const styles = StyleSheet.create({
    pic: {
        width: 340,
        height: 220,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 7,
        marginTop: 70,
      },
      NoImage: {
        margin: 20,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#9C70EA',
        borderRadius: 24,
        width: 300,
        height: 300,
      },
      NoImageText: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginTop: 140
      }
})

export default StudentSyllabus