//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, } from 'native-base';
import Sports from './Sports';
import Movies from './Movies';

import Gaming from './Gaming';
// create a component
class TabView extends Component {

    static navigationOptions ={
        header:null
      }


      constructor(){
        super()
        this.state={
          ch:[]
        }
        
      }
    
      async componentWillMount(){
        var names = await AsyncStorage.getItem('names')
        var conames =JSON.parse(names)
        this.setState({ch : conames})
        console.log(this.state.ch)
      }
    
    render() {
        return (
            <View style={styles.container}>
        <Tabs>
          <Tab heading="Tab3">
            <Sports />
          </Tab>
          <Tab heading="Tab2">
            <Gaming />
          </Tab>
          <Tab heading="Tab1">
            <Movies />
          </Tab>
         
        </Tabs>           
        
         </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default TabView;
