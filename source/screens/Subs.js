//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage,FlatList,TouchableOpacity,Alert,NetInfo } from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Link ='https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,status&key=[PASTE_KEY_HERE]&id='
// create a component
class Subs extends Component {

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
          headerTitle:"Subscriptions"
    }

async componentDidMount(){
    let res = await AsyncStorage.getItem('channels');
    var arr = (JSON.parse(res))
    console.log(arr)
    this.setState({channelarray:arr})
    console.log('the result updated : '+arr)
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type != 'none'){
    axios.get(Link+arr)
    .then((response) => {
      console.log(response);
      this.setState({store:response.data.items})
    })
    .catch((error) => {
      console.log(error);
    });
}
else {

    console.log('No connection')

}
    });

}

 Vidcount(props){

    var num =  Number(props).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return <Text style={{color:'white'}}>{num} videos</Text>

}

Subcount(props){
    var num =  Number(props).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return <Text style={{color:'white'}}>{num} Subscribers</Text>
}



remove(props){
    var forA = this.state.channelarray        
    var index = forA.findIndex(img => img === props)
    if (index !== -1) forA.splice(index, 1);
    console.log(forA)
    this.setState({channelarray:forA})
    AsyncStorage.setItem('channels',JSON.stringify(forA))
    axios.get(Link+forA)
    .then((response) => {
      console.log(response);
      this.setState({store:response.data.items})
    })
    .catch((error) => {
      console.log(error);
    });
    //alert('removed'+props)
}



    render() {
        return (
            <View style={styles.container}>
               <FlatList
                showsHorizontalScrollIndicator={false}
                //extraData={this.state.index}
            //horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.store}
            renderItem={({item}) => (
                <View style={{marginVertical:10,padding:5}}>
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('vids',{channelid:item.id})} activeOpacity={0.9}>
    <FastImage
    style={{width:400,height:280,alignSelf:'center'}}
    source={{
      uri: item.snippet.thumbnails.high.url,
      priority: FastImage.priority.normal,

    }}
    resizeMode={FastImage.resizeMode.contain}
    />
    </TouchableOpacity>
    <View style={{flexDirection:'row',alignItems:'center',marginVertical:3}}>
    <View>
    <Text style={{color:'white',fontWeight:"600"}}>{item.snippet.title}</Text>
     {this.Subcount(item.statistics.subscriberCount)}
    {this.Vidcount(item.statistics.videoCount)}
    </View>

    <View style={{left:5}}>
    <Icon name="delete" size={30} color='#dd0000' onPress={()=>this.remove(item.id)} />
    </View>
    </View>
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
        padding:5,
        backgroundColor: '#000',
    },
});

//make this component available to the app
export default Subs;
