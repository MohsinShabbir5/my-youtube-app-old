//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,BackHandler,AppState} from 'react-native';
import { Button } from 'native-base';
import WebView from 'react-native-android-fullscreen-webview-video';
const WEBVIEW_REF = 'webview';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
// create a component
class WView extends Component {

    static navigationOptions ={
        headerTitle:'My Youtube',
        headerTintColor: 'white',
    headerStyle:{
        backgroundColor:"black",

    },
    headerTitleStyle:{
        color:'white'
    },
    
    }

    constructor(props){
        super(props)
        this._handleAppStateChange = this._handleAppStateChange.bind(this)

        this.state={
            appstate: AppState.currentState,
            showad:false,
        vidstate:true
        }
    }

   
    switchad(){
        this.setState({showad:true})
    }


   componentDidMount(){
    setTimeout(() => { this.setState({showad: true}); }, 10000)
          AppState.addEventListener('change', this._handleAppStateChange);

   }
   componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange);

   }
    
   _handleAppStateChange = (nextAppState) => {        
    this.setState({appState: nextAppState});
    if (this.state.appState.match(/inactive|background/)) {
        console.log('App has come to the foreground!')
        this.setState({vidstate:false})
      }
      else if (this.state.appState.match(/active|foreground/)) {
  
        this.setState({vidstate:true})


    }}




    componentWillMount(){
        const { params } = this.props.navigation.state;

        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
          
            
            return false;
          });
          console.log(params.id)
        this.setState({videoid:params.id})
        }

      
      

    render() {
        
        return (
            <View style={styles.container}>
        
        {this.state.vidstate ? 
        (
        <WebView
            ref={WEBVIEW_REF}
        source={{uri: 'https://www.youtube.com/watch?v='+this.state.videoid}}
      />
      
      
     )  :null
        }
      
      {this.state.showad ? 
      (
        <View style={{position:'absolute',alignSelf:'center',justifyContent:'flex-end',bottom:0}}>
        <AdMobBanner
        adSize="smartBannerLandscape"
        adUnitID="ca-app-pub-9592011956917491/8683582684"
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.log(error)}
        />
        </View>
      ) : null
      }
      
      
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
export default WView;
//ca-app-pub-3940256099942544/8691691433