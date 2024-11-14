import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import avatarOptions from '../constants/avatar';
import UserProfile from './UserProfile';
import AboutModal from './AboutModal';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const [userProfileModalVisible, setUserProfileModalVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState({ uri: Image.resolveAssetSource(require('../assets/avatars/user.png')).uri });
    const [userName, setUserName] = useState('');  

    const loadAvatar = async () => {
        try {
          const storedProfileImage = await AsyncStorage.getItem('profileImage');
      
          if (storedProfileImage) {
            const parsedImage = JSON.parse(storedProfileImage);
      
            if (parsedImage.type === 'uploaded') {
              setUploadedImage({ uri: parsedImage.uri });
            } else if (parsedImage.type === 'avatar') {
              setUploadedImage(avatarOptions[parsedImage.index].source);
            } else if (parsedImage.type === 'default') {
              setUploadedImage({ uri: parsedImage.uri });
            }
          } else {
            setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatars/user.png')).uri });
          }
        } catch (error) {
          console.error('Error loading avatar:', error);
        }
      };      
    
      const loadName = async () => {
        try {
          const storedName = await AsyncStorage.getItem('userProfile');
          setUserName(storedName || '');
        } catch (error) {
          console.error('Error loading name:', error);
        }
      };
    
      useFocusEffect(
        useCallback(() => {
            loadAvatar();
            loadName();
        }, [])
    );

      const closeUserProfileModal = async () => {
        setUserProfileModalVisible(false);
        await loadAvatar();
        await loadName();
    };

    return(
        <View style={styles.container}>

            <TouchableOpacity style={styles.userContainer} onPress={() => setUserProfileModalVisible(true)}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={uploadedImage} 
                        style={styles.avatarImage}
                    />
                </View>
                    <View style={styles.nameBox}>
                        <Text style={styles.name}>{userName || "User"}</Text>
                    </View>
            </TouchableOpacity>

            <Image source={require('../assets/decor/home.png')} style={styles.image} />

            <View style={styles.btnContainer}>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('BonusScreen')}>
                <Text style={styles.btnTxt}>Daily bonus</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ArticlesScreen')}>
                <Text style={styles.btnTxt}>Articles</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setAboutModalVisible(true)}>
                <Text style={styles.btnTxt}>About us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SettingsScreen')}>
                <Text style={styles.btnTxt}>Settings</Text>
            </TouchableOpacity>

            </View>

            <UserProfile visible={userProfileModalVisible} onClose={closeUserProfileModal}/>
            <AboutModal visible={aboutModalVisible} onClose={() => setAboutModalVisible(false)}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30,
        paddingTop: height * 0.07,
        backgroundColor: '#FDF3E7'
    },

    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(220, 201, 163, 0.55)',
        zIndex: 10,
        marginBottom: height * 0.02
    },

    imageContainer: {
        padding: 0,
        width: height * 0.07,
        height: height * 0.07,
        alignItems: 'center',
        borderRadius: 100,
        overflow: 'hidden',
        marginRight: 10,
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    nameBox: {
        padding: 5, 
        borderRadius: 10, 
        backgroundColor: '#f9f9f9', 
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 7,
    },

    name: {
        fontSize: 22,
        fontWeight: '600',
        color: '#3C3C3C',
        textAlign: 'center'
    },

    image: {
        width: '100%',
        height: height * 0.48,
        resizeMode: 'contain',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: height * 0.02
    },

    title: {
        fontSize: 23,
        fontWeight: '700',
        color: '#7b4c1c',
        lineHeight: 23,
        textAlign: 'center',
        marginBottom: height * 0.01
    },

    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    btn: {
        padding: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '47%',
        height: height * 0.1,
        borderWidth: 0.5,
        borderColor: '#7b4c1c',
        backgroundColor: '#dcc9a3',
        borderRadius: 12,
        marginBottom: 10,
        zIndex: 10
    },

    btnTxt: {
        fontSize: 18,
        fontWeight: '900',
        color: '#7b4c1c'
    }
});

export default Home;