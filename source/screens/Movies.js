//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image,AppState,TextInput,ToastAndroid,NetInfo,TouchableOpacity,StatusBar,Alert,AsyncStorage,ActivityIndicator,Button,ScrollView,Platform,Keyboard,TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image'
import { DrawerActions } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import TimeAgo from "react-native-timeago";
var numeral = require('numeral');
searchURL = "http://suggestqueries.google.com/complete/search?client=chrome&q=";
var parseString = require('react-native-xml2js').parseString
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
const Q = 'https://www.googleapis.com/youtube/v3/search?key=[PASTE_KEY_HERE]&part=player,contentDetails,snippet&order=date&type=video&maxResults=50&regionCode=us&q=?'
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SEARCH = 'http://clients1.google.com/complete/search?hl=en&output=toolbar&gl=us&ds=yt&q=?'
var Spinner = require('react-native-spinkit');
const LINK = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&maxResults=10&key=[PASTE_KEY_HERE]&chart=mostPopular&regionCode=us&videoCategoryId='
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
  import { Toolbar } from 'react-native-material-ui';
  import * as Animatable from 'react-native-animatable';

// create a component
class Movies extends Component {

    


    static navigationOptions =({navigation,screenProps})=> ({


 title:typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Loading': navigation.state.params.title,
        tabBarLabel:typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Loading': navigation.state.params.title,
        
        headerMode:'float',
        headerStyle:{
            //elevation:0,
            padding:10


        },
        headerTitleStyle: {textAlign:"center",alignSelf:"center"},
        headerLeft: (
        <View style={{paddingLeft:7}}>
        <Icon name="menu" size={28} color="#fff" onPress={()=>navigation.navigate('DrawerOpen')}/>
        </View>

            ),
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null

            /*headerRight:(
        <View style={{flexDirection:'row',paddingHorizontal:5}}><Icon name="search"  style={{marginHorizontal:5}} size={26} color="#fff" onPress={()=>alert('Locations')} /></View>

            )*/
});


    constructor(props){
        super(props);
        //this.focusTextInput = this.focusTextInput.bind(this);

        this.state={
            showcancel:false,
            showad:true,
            loading:false,
            //sendfunc:undefined,
            searchToggle:false,
            searchRes:[],
            store:[],
            selected:[],
            notified:false,
            index:0,  
            isLoading: false,
            nextPageToken:''

        }
    }

   
    
    toggle(){

        if(this.state.searchToggle==false)
        {
            //this.props.navigation.setParams({ title: "Search" })
            this.setState({searchToggle:true,searchRes:[]})
        }
        else{
            //this.props.navigation.setParams({ title: this.state.headtitle })

            this.setState({searchToggle:false,searchRes:[]})

        }

    }

    clearAds(){
        this.setState({showad:false})
        console.log('clear ads')
        //clearInterval(this.sendfunc);

    }
    
    

   async componentDidMount(){
    /*this.sendfunc = setInterval(()=> this.showAdView(), 40000)

    this.props.navigation.addListener('willBlur', (route) => { 
        //console.log('tab blurred')
        this.clearAds()


    })
    this.props.navigation.addListener('willFocus', (route) => { 
       this.setState({showad:true})
        console.log('tab focued')
    })*/

 
    this.props.navigation.setParams({
        headerRight: (
            <View style={{flexDirection:'row',paddingHorizontal:5}}><Icon name="search"  style={{marginHorizontal:5,paddingHorizontal:15,}} size={26} color="#fff" onPress={()=>this.toggle()} /></View>
        )
      })

    this.setState({isLoading: true})

var names = await AsyncStorage.getItem('names')
var conames =JSON.parse(names)
this.setState({datitle:conames[2]})
var name1 = conames[2]
this.setState({headtitle:name1})
this.props.navigation.setParams({ title: name1 })
    var res = await AsyncStorage.getItem('categories')
    var final = JSON.parse(res)
    
    console.log(final)    
    this.setState({catID:final[2]})
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        if(connectionInfo.type != 'none'){
    axios.get(LINK+final[2])
    .then((response) => {
   
    console.log(response);
    this.setState({store:response.data.items})
        if(response.data.nextPageToken){
            this.setState({nextPageToken:response.data.nextPageToken})
        }
        else{
            this.setState({nextPageToken:'null'})
        }


    this.setState({isLoading: false})
    
  })
  .catch((error) => {
    this.setState({isLoading: false})
    Alert.alert('Ops..','Request failed, please check your internet connection')
    console.log(error);
  });

}


else {
    this.setState({isLoading: false})
    Alert.alert('Ops..','Request failed, please check your internet connection')
  
}
});


if (Platform.OS === 'android'){
    AndroidKeyboardAdjust.setAdjustPan();
}
    }




    showTime(props) {
        var match = props.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      
        match = match.slice(1).map(function(x) {
          if (x != null) {
              return x.replace(/\D/, '');
          }
        });
      
        var hours = (parseInt(match[0]) || 0);
        var minutes = (parseInt(match[1]) || 0);
        var seconds = (parseInt(match[2]) || 0);
      
        var ans= (hours * 3600 + minutes * 60 + seconds)/60;
        var ddew = ans.toFixed(0);
        return <Text style={{color:'#b2bec3',marginHorizontal:3}}>{ddew} minutes </Text>
      }

      showViews(props){
        var string = numeral(props).format('0,0');
        return <Text style={{color:'#b2bec3',marginHorizontal:3}}> {string} views </Text>

      }


       showAdView(){
        let { routeName } = this.props.navigation.state;
        console.log(routeName)
        
      if(this.state.showad == true) {
        AdMobInterstitial.setAdUnitID('ca-app-pub-9592011956917491/6699231376');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd())
        console.log('ad displayed?')
    
    }
    else if(this.state.showad == false) {
        console.log('Dont show ads')
    }


      }



        async addChannel(props){
        var store =[]
        this.state.selected.push(props)
        console.log(this.state.selected)
        
            let value = await AsyncStorage.getItem('channels');
            if (value != null){
                var arr1 = (JSON.parse(value))
                var arr2 = this.state.selected
                Array.prototype.push.apply(arr1, arr2);
                this.state.selected.pop()
                console.log('after pushing new values')
            console.log(arr1)
            AsyncStorage.setItem('channels',JSON.stringify(arr1))
            console.log('data pushed')
            ToastAndroid.showWithGravityAndOffset(
                'Channel added to the list!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        
            }
            else if(value == null){
                AsyncStorage.setItem('channels',JSON.stringify(this.state.selected))
                console.log('friends store is null')
                console.log('new items pushed')
                this.state.selected.pop()
                let res = await AsyncStorage.getItem('channels');
                var arr = (JSON.parse(res))
                console.log('the result updated : '+arr)
                ToastAndroid.showWithGravityAndOffset(
                    'Channel added to the list!',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
                // do something else
           }

      }


      search(props){

        console.log(props)
        this.setState({currentInput:props})


        if(props.length < 1){
            this.setState({searchRes:[],currentInput:undefined,showcancel:false})
        }

       
        
        if(props.length > 3){
            this.setState({showcancel:true})
            axios.get(SEARCH+props)
            .then((response) => {
                var str = (response.data)
                var temp = []
                //console.log(result)
                parseString(str, (err, result) => {
                    
                    for(let i = 0;i<result.toplevel.CompleteSuggestion.length;i++){
                        temp.push({title:result.toplevel.CompleteSuggestion[i].suggestion[0].$.data})
                    }
                    console.log(temp);
                    this.setState({searchRes:temp})
                    
                });
                console.log(this.state.searchRes)
            })

      .catch((error) => {
        
        console.log(error);
      });
        }
       
      }
      sendnext(props){
        this.setState({searchRes:[]})
        this.props.navigation.navigate('search',{query:JSON.stringify(props)})
      }


      componentWillUnmount(){

        clearInterval(this.sendfunc);
        console.log('left')

      }

      onEndReached() {
        

            console.log('end reached'+this.state.nextPageToken)

            if(this.state.nextPageToken != 'null'){
            
            axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&maxResults=10&key=AIzaSyBzyI8GzavsFfFoxopFLCAApWM2VKRXNeo&chart=mostPopular&regionCode=us&videoCategoryId='+this.state.catID+'&pageToken='+ this.state.nextPageToken)
          .then((response) => {
           
            console.log(response);
            let old = this.state.store
    
            var result = old.concat(response.data.items)
            //response.data.items
            this.setState({store:result,nextPageToken:response.data.nextPageToken})

          })
          .catch((error) => {
             console.log(error);

          });            
        
        }
        else{
            console.log('No next page token found')
        }

        }
       
      
        openWebview(props){
            this.props.navigation.navigate('webview',{id:props})
            clearInterval(this.sendfunc)
        }

        onSubmit(){
            console.log(this.state.currentInput)
            if(this.state.currentInput != undefined){
                this.setState({searchRes:[]})
            this.props.navigation.navigate('search',{query:JSON.stringify(this.state.currentInput)})
        }}
        clearInput(){
            this.textInputRef.clear()
            this.setState({currentInput:undefined,showcancel:false})
        }

    render() {

        return (

            <View style={styles.container}>
    <StatusBar
     backgroundColor="#0b091e"
     barStyle="light-content"
   />

           


   {/*<Toolbar
        leftElement="menu"
        centerElement={this.state.datitle}
        searchable={{
          autoFocus: true,
          placeholder: 'MEnu',
        }}
        rightElement={{
            menu: {
                icon: "more-vert",
                labels: ["item 1", "item 2"]
            }
        }}
        style={{container:{backgroundColor:'#080027',top:0,left:0,right:0}}}
        onRightElementPress={ (label) => { console.log(label) }}
        onLeftElementPress={({navigation}) => this.props.navigation.dispatch(DrawerActions.openDrawer())}
    />*/}
    
    
    
    
    {this.state.searchToggle ?  
    (<Animatable.View   animation="fadeIn" duration={400} easing="ease-in" style={{width:'100%',padding:5,paddingHorizontal:10,position:"relative",alignItems:"center",
           
        height:'10%',flexDirection:'row',borderColor:'transparent',backgroundColor:'#dd0914',}}>
       
       <View style={{justifyContent:'center',paddingHorizontal:2}}>
       <Icon name='youtube-searched-for' color='white' size={25} />

       </View>


       <View style={{flex:1,backgroundColor:'#fff',
           borderRadius:2,height:'75%',justifyContent:'center',}}>
       
       <TextInput  
        ref={ref => this.textInputRef = ref}
        autoFocus={true}
        placeholder="Search"
        onTouchStart={()=> this.setState({searchRes:[]})}
      selectionColor="#a5b1c2"
      returnKeyType="search"
      textBreakStrategy="highQuality"
       underlineColorAndroid='transparent'
       autoCorrect={false}
       blurOnSubmit={true}
       onSubmitEditing={()=>this.onSubmit()}
       //autoCapitalize='none'
       placeholderTextColor="#bfbfbf"
       onChangeText={(text)=>this.search(text)}
       placeholder='Search Youtube..'
       style={{height:100,
       justifyContent:'center',
           textDecorationLine:'none',
           textDecorationColor:'transparent',
           color:'black',
           fontWeight:'400',
           alignItems:'center',
           width:'100%',
           //position:'relative',
           fontStyle:'normal',
           fontSize:14,
              
       }} />
       </View>

      {this.state.showcancel ? ( 
       <View style={{justifyContent:'center',paddingLeft:2}}>
       <Icon name='cancel' color='white' size={25} onPress={()=>this.clearInput()} />

       </View>) : null
       }
       </Animatable.View>) : null
    }


    <View style={{padding:2}}>
    <FlatList        
    style={{borderRadius:2,backgroundColor:'transparent',marginHorizontal:5}}
    showsHorizontalScrollIndicator={false}
    //extraData={this.state.index}
    //horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    data={this.state.searchRes}
    renderItem={({item}) => (
        <View style={{backgroundColor:"white"}}>
    <TouchableOpacity onPress={()=>this.sendnext(item.title)} style={{backgroundColor:'white',height:30,paddingHorizontal:6,justifyContent:"center"}}>
    <Text style={{color:'black',fontWeight:'300',fontSize:15}}>{item.title}</Text>
    </TouchableOpacity>
    </View>
    )}/>
    </View>

   {this.state.isLoading ? (
    <ActivityIndicator
      animating
      color="#e00"
      size="large"
      style={styles.activityIndicator}
    />
  ) : 
  <View> 
  
  <View>

  <FlatList
  showsHorizontalScrollIndicator={false}
  //extraData={this.state.index}
//horizontal={true}

keyExtractor={(item, index) => index.toString()}
data={this.state.store}
onEndReached={this.onEndReached.bind(this)}
//onEndReachedThreshold={0.4}
//onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
//ListFooterComponent={() =>}
//extraData={this.state.index}
renderItem={({item}) => (
  <View style={{marginVertical:10}}>
<Text style={{color:'white',fontWeight:"400",fontSize:16}}>{item.snippet.localized.title}</Text>
<Text style={{color:'white',fontWeight:'500',color:'#b11'}}>{item.snippet.channelTitle}</Text>


<View style={{flexDirection:'row',alignItems:'center'}}>

{/*<Icon name="play-circle-outline" style={{marginLeft:3}} color="#e00" size={16} /> 
{this.showTime(item.contentDetails.duration)}*/}
<Icon name="access-time" style={{marginLeft:3}} color="#e00" size={16} /> 
<Text style={{color:'#b2bec3',marginHorizontal:3}}><TimeAgo time={`${item.snippet.publishedAt}`} /></Text>


<Icon name="remove-red-eye" style={{marginLeft:3}} color="#e00" size={16} /> 

{this.showViews(item.statistics.viewCount)}
</View>
<View style={{flexDirection:'row',alignItems:'center'}}>
<Text style={{color:'white'}}>Add to favourites </Text>
<Icon name="favorite" color='#e00' size={23} onPress={()=>this.addChannel(item.snippet.channelId,item.id)}/>
</View>
<TouchableOpacity activeOpacity={0.9} onPress={()=>this.openWebview(item.id)}>
<View>
    
<FastImage
style={{width:400,height:280,alignSelf:'center'}}
source={{
uri: item.snippet.thumbnails.high.url,
priority: FastImage.priority.normal,

}}
resizeMode={FastImage.resizeMode.contain}
    />
    </View>
</TouchableOpacity>

  </View>
)}/>
    </View> 
{this.state.loading ? 
(<View style={{alignItems:'center',justifyContent:'center',position:'absolute',alignSelf:'center',backgroundColor:'#2f3640',width:'18%',height:'10%',borderRadius:5,borderWidth:1,borderColor:'#bdc3c7'}}>
<ActivityIndicator
      animating
      color="#e00"
      size="large"
      //style={styles.activityIndicator}
    />
    </View>) : null
}

<View style={{position:'absolute',alignSelf:'center',justifyContent:'flex-end',bottom:0}}>
  <AdMobBanner
adSize="smartBannerLandscape"
  adUnitID="ca-app-pub-9592011956917491/8683582684"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.log(error)}
/>
</View>
</View>}
  
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
    },activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
      }
});

//make this component available to the app
export default Movies;



{/*try {
    let value = await AsyncStorage.getItem('channels');
    if (value != null){
        var arr1 = (JSON.parse(value))
        var arr2 = this.state.selectedFruits
        Array.prototype.push.apply(arr1, arr2);
        console.log('after pushing new values')
    console.log(arr1)
    AsyncStorage.setItem('friends',JSON.stringify(arr1))
    this.setState({list:arr1})
        this._toggleModal()               


    }
    else if(value == null){
        AsyncStorage.setItem('friends',JSON.stringify(this.state.selectedFruits))
        console.log('friends store is null')
        console.log('new items pushed')
        this.setState({list:this.state.selectedFruits})

        this._toggleModal()               
        // do something else
   }
 } catch (error) {
   // Error retrieving data
 }
*/}