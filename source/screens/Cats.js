//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage,FlatList,TouchableOpacity,Alert,Button } from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'react-native-axios';
import GridView from 'react-native-super-grid';

// create a component
class Cats extends Component {

    constructor(){
        super()
        this.state={
            store:[]
        }
    }


    static navigationOptions={
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor:'#030027',
          },
          headerTitleStyle:{
            color:'white'
          },
          headerTitle:"Categories"
    }

async componentDidMount(){
    var res = await AsyncStorage.getItem('names')
    var final = JSON.parse(res)
    this.setState({data:final})
    console.log(res)
}






    render() {
        return (
            <View style={styles.container}>
        <FlatList
                showsHorizontalScrollIndicator={false}
                //extraData={this.state.index}
            //horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}
            renderItem={({item}) => (
                <View style={{borderColor:'#bb0000',borderWidth:0.5,marginVertical:10,marginHorizontal:6,backgroundColor:'#2f3640',height:100,alignItems:'center',justifyContent:'center'}}>

                <Text style={{alignSelf:'center',color:'white',fontSize:18}}>{item}</Text>
              </View>
      )}/>       
      </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    gridView: {
        
        flex: 1,
        backgroundColor:'black'
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
        
      },
});

//make this component available to the app
export default Cats;
