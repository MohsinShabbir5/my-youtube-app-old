//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Alert,TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import axios from 'react-native-axios';
import Moment from 'react-moment';
import TimeAgo from "react-native-timeago";

const Link= 'https://www.googleapis.com/youtube/v3/search?key=[PASTE_KEY_HERE]&part=snippet,id&order=date&maxResults=50&type=video&channelId='
// create a component
class Videos extends Component {

    static navigationOptions={
        drawerLockMode: 'locked-closed',
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor:'#030027',
          },
          headerTitleStyle:{
            color:'white'
          },
          headerTitle:"Channel Feed"
    }

    




    constructor()
    {
        super()
        this.state={
            store:[],
            loading:true
        }
    }


    componentDidMount(){
        const { params } = this.props.navigation.state;
        axios.get(Link+params.channelid)
    .then((response) => {
      console.log(response);
      this.setState({store:response.data.items})

    })
    .catch((error) => {
      console.log(error);
    });

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
                <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('webview',{id:item.id.videoId})} style={{marginVertical:10,}}>
              <Text style={{color:'white',fontWeight:"600"}}>{item.snippet.title}</Text>
              <Text style={{ fontWeight: "100",color:'white' }}>
                        Published : <TimeAgo time={`${item.snippet.publishedAt}`} />
                      </Text>
              <FastImage
    style={{width:400,height:280,alignSelf:'center'}}
    source={{
      uri: item.snippet.thumbnails.high.url,
      priority: FastImage.priority.normal,

    }}
    resizeMode={FastImage.resizeMode.contain}

    
  />

                </TouchableOpacity>
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
export default Videos;
