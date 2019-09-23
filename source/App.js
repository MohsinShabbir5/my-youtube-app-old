/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { StackNavigator,TabNavigator,DrawerNavigator,SwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Gaming from './screens/Gaming';
import Sports from './screens/Sports';
import Movies from './screens/Movies';
import WView from './screens/WView';
import Sidebar from './screens/Sidebar';
import Subs from './screens/Subs';
import Videos from './screens/Videos';
import Home from './screens/Home';
import Cats from './screens/Cats';
import Splash from './screens/Splash';
import TabView from './screens/TabView';
import Search from './screens/Search';
import { fromLeft,fromTop,fadeIn,zoomIn,zoomOut,flipY,flipX } from 'react-navigation-transitions';

//AIzaSyAeoJnFtKPTajCvIqNr-TyRruzwRZ1qMsY

const Stack = StackNavigator({
  Tabview : {screen : TabView},
  Gaming: {screen : Gaming},
  Sports: {screen : Sports},
  Movies : {screen : Movies},
  webview  : {screen : WView},
  search : {screen  :Search}
  //subs : {screen:Subs},
},

{
  initialRouteName:'Tabview'
})



const Tabs = TabNavigator(
  {
  Sports : {
      screen : Sports,
      navigationOptions: {
          
        headerStyle:{
          backgroundColor:'#030027'
        },
        headerTitleStyle:{
          color:'white'
        },
        //tabBarIcon: ({ tintColor }) => <Icon name="local-movies" size={25} color={tintColor} />
    }
      
  },
  Movies : {
      screen : Movies,
      navigationOptions: {
          
          headerStyle:{
            backgroundColor:'#030027'
          },
          headerTitleStyle:{
            color:'white'
          },
          //tabBarIcon: ({ tintColor }) => <Icon name="local-movies" size={25} color={tintColor} />
      }
  },
  Gaming : { 
      screen : Gaming,
      
      navigationOptions: {
         
          headerStyle:{
            backgroundColor:'#030027'
          },
          headerTitleStyle:{
            color:'white'
          },
          //tabBarIcon: ({ tintColor }) => <Icon name="videogame-asset" size={25} color={tintColor} />
      }
  },
},{
  
  swipeEnabled:true,
  tabBarPosition:"bottom",
  tabBarOptions: {
      indicatorStyle: {
         opacity: 0
        },
      lazy: true,
      //showIcon:true,
      upperCaseLabel:false,
      inactiveTintColor:'white',
      activeTintColor: 'red',
      labelStyle: {
        fontSize:17,
          margin:0,
        color:'white',
        fontWeight:"500",
        //activeTintColor:'#ff0000',
        inactiveTintColor:'#7a7a7a'
        
      },
      style: {
        backgroundColor: '#080027',
        height:50,
        justifyContent:'center'
      },
    }
})


const SemiApp = StackNavigator({
  home : {screen:Home},
  tabs : {screen:Tabs},
  webview :{screen:WView},
  search: {screen : Search},
  Sports :{screen:Sports},
  subs : {screen:Subs},
  vids : {screen:Videos},
  cats : {screen:Cats}

},{
  transitionConfig: () => fadeIn(400),

  initialRouteName:'tabs'
})

 const Final = DrawerNavigator({
  Main : { screen : SemiApp},

//subs : {screen:Subs},
},{
  contentComponent:Sidebar
})

const Homestack = StackNavigator({
  final:{screen:Home}
})




export default App = SwitchNavigator(
  {
    AuthLoading: Splash,
    App: Final,
    Select: Homestack,
  },
  {

    initialRouteName: 'AuthLoading',
  }
);







