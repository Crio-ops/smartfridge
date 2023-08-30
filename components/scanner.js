import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [scanned, setScanned] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [foundProduct , setFoundProduct ] = useState()

  if (!permission) {
  
    return <View />;
  }

  if (!permission.granted) {
    
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getProduct(data)
  };

  // function toggleCameraType() {
  //   setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  // }

  function getProduct(barCodeScanned) {

    let product = { 
      scannedNum : barCodeScanned
     }

    //créer un objet requete pour l'envoie vers l'Api, attribut type permet de dispatch lors de l'arrivée à l'Api, data [] contient les données du user
    let scannedProduct = {
      request: { type: 3, name: "scannedProductNum", data: [] },
    };

    scannedProduct.request.data.push(product);
    let jsonRequest = JSON.stringify(scannedProduct);

    console.log(jsonRequest);

    try {
      fetch(
        "http://192.168.1.34:3000/api/next_api_connection/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonRequest,
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setFoundProduct(json.productFromApi.product.product_name);
          alert(json.productFromApi.product.product_name);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
      onBarCodeScanned={scanned ? false : handleBarCodeScanned}
      ratio='5:4'>
        <View style={styles.buttonContainer}>
        
        </View>
        {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
      </Camera>
      {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    justifyContent: 'center',
  },
  camera: {
    height:'25%',
    width:'100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
