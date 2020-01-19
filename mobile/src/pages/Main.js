import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });
                const { latitude, longitude } = coords
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
        loadInitialPosition();
    }, [])




    if (!currentRegion) {
        return null;
    }

    return (<>
        <MapView initialRegion={currentRegion} style={style.map}>
            <Marker coordinate={{ latitude: -15.6331278, longitude: -47.8450168 }}>
                <Image style={style.avatar} source={{ uri: 'https://pngimage.net/wp-content/uploads/2018/06/react-logo-png-6.png' }} />
                <Callout onPress={() => navigation.navigate('Profile', { github_username: 'santosdanilo' })}>
                    <View style={style.callout}>
                        <Text style={style.devName}>Danilo</Text>
                        <Text style={style.devBio}>bio</Text>
                        <Text style={style.devTechs}>Techs</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        <View style={style.searchForm}>
            <TextInput
                style={style.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false} />
            <TouchableOpacity onPress={() => { }} style={style.submitButton} >
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    </>)
}

const style = StyleSheet.create({
    map: { flex: 1 },
    avatar: {
        width: 54,
        height: 54,
        borderWidth: 4,
        borderRadius: 4,
        borderColor: '#FFF',
        backgroundColor: '#FFF'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    submitButton: {
        width: 50,
        height: 50,
        backgroundColor: "#8E4DFF",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: "center",
        marginLeft: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    }
})

export default Main;