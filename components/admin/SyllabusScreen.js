/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadSyllabus, viewSpecificSyllabus } from '../../api/admin';
const SyllabusScreen = () => {
  // for dropdown
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);

  const [isUploaded, setIsUploaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [syllabusImg, setSyllabusImg] = useState(null);
  useEffect(() => {
    if (value) {
      fetchSyllabus();
    }
  }, [value]);

  const fetchSyllabus = async () => {
    try {
      setIsLoading(true)
      const syllabusData = await viewSpecificSyllabus(value);
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

  //image selection
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        setIsLoading(true)
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        setSyllabusImg(imageUri)
        setIsUploaded(true);
        setIsLoading(false)
      }
    });
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      console.log('Please select an image first');
      return;
    }

    try {
      await uploadSyllabus({ id: value, syllabus: selectedImage });
      console.log('Timetable uploaded successfully');
    } catch (error) {
      console.error('Error uploading timetable: ', error);
    }
    setIsUploaded(false);
  };
  return (
    <View>
      <DropDownPicker
        textStyle={styles.dropdownText}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdown}
        open={open}
        value={value}
        items={[
          { label: 'Nursery', value: '01' },
          { label: 'Prep', value: '02' },
          { label: 'Class 1', value: '03' },
          { label: 'Class 2', value: '04' },
          { label: 'Class 3', value: '05' },
          { label: 'Class 4', value: '06' },
        ]}
        setOpen={setOpen}
        setValue={setValue}
      />

      <View>
      {isLoading ? <ActivityIndicator size="large" color='#9C70EA' /> :
        syllabusImg && (
          <Image source={{ uri: syllabusImg }} style={styles.pic} />
        ) }

        <TouchableOpacity style={styles.buttonUpload} onPress={openImagePicker}>
          <Text style={styles.uploadText}>{isUploaded ? 'Upload Again' : 'Upload'}</Text>
        </TouchableOpacity>

        {isUploaded ? (<TouchableOpacity style={styles.buttonUpload} onPress={handleUpload}>
          <Text style={styles.uploadText}>Done</Text>
        </TouchableOpacity>) : (<></>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Poppins-Light',
  },

  pic: {
    width: 340,
    height: 220,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 7,
    marginTop: 70,
  },
  uploadText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },

  buttonUpload: {
    borderRadius: 17,
    paddingHorizontal: 22,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: '#9C70EA',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 60,
  },

  dropdown: {
    width: 320,
    alignSelf: 'center',
    backgroundColor: '#F4F4F4',
    borderColor: '#9C70EA',
    marginTop: 20,
  },

  dropdownText: {
    fontFamily: 'Poppins-Medium',
  },
});

export default SyllabusScreen;
