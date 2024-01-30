import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FeedPickup = () => {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelections: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick images from camera roll" onPress={pickImage} />
      {images.map((uri, index) => (
        <Image
          key={index}
          source={{ uri: uri }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      ))}
    </View>
  );
};

export default FeedPickup;

const styles = StyleSheet.create({});
