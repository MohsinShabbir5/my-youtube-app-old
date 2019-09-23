//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,AsyncStorage,StatusBar } from 'react-native';


// create a component
class Splash extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }


     


      // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Select');
  };






    render() {
        return (
            <View style={styles.container}>
            <StatusBar
     backgroundColor="#000"
     barStyle="light-content"
   />
            <Image source={require('./yt3.png')} style={{width:120,height:120,resizeMode:'contain'}} />
            <Text style={{fontSize:27,fontWeight:'bold',color:'white'}}>MY YOUTUBE</Text>
          
          
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
});

//make this component available to the app
export default Splash;
