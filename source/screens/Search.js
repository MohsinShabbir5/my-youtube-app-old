//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image,TextInput,ToastAndroid,NetInfo,TouchableOpacity,StatusBar,Alert,AsyncStorage,ActivityIndicator,Button,ScrollView,Platform } from 'react-native';
import FastImage from 'react-native-fast-image'
import { DrawerActions } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import TimeAgo from "react-native-timeago";
const Q = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCEnFIC4sQYCrsL03GufcD1xw2JHaQmxUs&part=snippet&type=video&maxResults=50&regionCode=US&q=?'
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
// create a component
class Search extends Component {


    static navigationOptions ={
        headerTitle:'Search Results',
        //headerTintColor: 'white',
    headerStyle:{
        backgroundColor:"black",

    },
    headerTintColor:'white',
    headerTitleStyle:{
        color:'white'
    },
    
    }

        constructor(props){
            super(props)
            this.state={
                store:[],
                isLoading:true
            }
        }


        componentWillMount(){
       
        const { params } = this.props.navigation.state;
        console.log(params.query)
        
        axios.get(Q+params.query)
        .then((response) => {
   
        console.log(response);
        this.setState({store:response.data.items})
        this.setState({isLoading:false})

    
        })
        .catch((error) => {
            this.setState({isLoading:false})

        console.log(error);
        });
    
    
        }
    
showTitle(props){
    if(props.length <= 40){
        return <Text style={{flexWrap:'wrap',fontSize:14,fontWeight:'400',color:'black'}}>{props}</Text>

    }
    else if(props.length >= 40){
        var final = props.slice(0,38)
        return <Text style={{flexWrap:'wrap',fontSize:14,fontWeight:'400',color:'black'}}>{final}..</Text>

    }
}


    render() {
        return (
            <View style={styles.container}>
            {this.state.isLoading ? (
    <ActivityIndicator
      animating
      color="#e00"
      size="large"
      style={styles.activityIndicator}
    />
  ) : 
    <FlatList
    style={{width:'100%',height:'100%'}}
  showsHorizontalScrollIndicator={false}
  //extraData={this.state.index}
//horizontal={true}
keyExtractor={(item, index) => index.toString()}
data={this.state.store}
//extraData={this.state.index}
renderItem={({item}) => (
<TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('webview',{id:item.id.videoId})}>

<View style={{marginHorizontal:5,top:8,flexDirection:'row',height:110,backgroundColor:'#fff',}}>

<FastImage
style={{width:'45%',height:'95%',left:0,borderRadius:1,borderColor:''}}
source={{
uri: 'https://i1.ytimg.com/vi/'+item.id.videoId+'/mqdefault.jpg',
priority: FastImage.priority.normal,

}}
resizeMode={FastImage.resizeMode.stretch}
/>

<View style={{flexDirection:'column',flexWrap:'wrap',flex:1,width:'100%',marginHorizontal:4}}>
    {this.showTitle(item.snippet.title)}
<View>
    <Text style={{flexWrap:'wrap',color:'grey',fontSize:13}}>{item.snippet.channelTitle}</Text>
</View>
<View>
    <Text style={{flexWrap:'wrap',color:'grey',fontSize:13}}><TimeAgo time={item.snippet.publishedAt} /></Text>
</View>

</View>

  </View>
  </TouchableOpacity>

)

}

/>            

            }

</View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',width:'100%',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Search;
/*<TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('webview',{id:item.id.videoId})}>
<FastImage
style={{width:400,height:280,alignSelf:'center'}}
source={{
uri: item.snippet.thumbnails.high.url,
priority: FastImage.priority.normal,

}}
resizeMode={FastImage.resizeMode.contain}
/>
</TouchableOpacity>*/