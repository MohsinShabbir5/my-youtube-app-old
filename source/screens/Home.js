//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,TouchableOpacity,Alert,ImageBackground,AsyncStorage,Button,NetInfo } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GridView from 'react-native-super-grid';
import ImageOverlay from "react-native-image-overlay";

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
//import Button from 'react-native-button'
// create a component
class Home extends Component {

    
    static navigationOptions={
        headerTintColor: 'white',
        drawerLockMode: 'locked-closed',
        headerStyle:{
            backgroundColor:'#030027',          
          },
          headerTitleStyle:{
            color:'white',
            flex:1,
            textAlign:'center'
          },
          
          headerTitle:"Select Categories"
    }

    constructor(){
        super()
        this.state={
            list:[],
            ids:[],
            index:0,
            items :[
         { name: 'ENTERTAINMENT ', code: '#2ecc71', id:24, added:false, source:require('../images/enter.jpg') },
          { name: 'MUSIC ', code: '#3498db', id:10, added:false,source:require('../images/music.jpg')  }, { name: 'GAMING ', code: '#9b59b6', id:20, added:false,source:require('../images/gaming.jpg') },
          { name: 'SPORTS', code: '#34495e', id:17, added:false,source:require('../images/sports.jpg') }, { name: 'VEHICLES ', code: '#16a085', id:2, added:false,source:require('../images/vehicles.jpg') },
          { name: 'PETS ANIMALS ', code: '#27ae60', id:15, added:false,source:require('../images/pets.jpg') }, { name: 'SCIENCE & TECH ', code: '#2980b9', id:28, added:false,source:require('../images/science.jpg') },
          { name: 'HOW TOs ', code: '#f1c40f', id:26, added:false,source:require('../images/howto.jpg') }, { name: 'FILM ANIMATION ', code: '#e67e22', id:1, added:false,source:require('../images/film.jpg') },  
          { name: 'COMEDY ', code: '#ED4C67', id:23, added:false,source:require('../images/comedy.jpg') } 
        ],
    
            
        }
    }



    async componentDidMount(){
        this.showAd()

    var res = await AsyncStorage.getItem('categories')
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    var final = JSON.parse(res)
    console.log(final)
        //this.setState({ids:final})
     
    if(final != null)
    {
    var current = this.state.items
    var name =[]
        for(let j=0;j<this.state.items.length;j++){
            if(final.includes(this.state.items[j].id)){
                name.push(capitalize(current[j].name))
                current[j].added = true
            }

        }

        //this.setState({items:current})
        console.log(current)
        console.log(name)
        this.setState({list:name,ids:final})
        console.log(this.state.list)
        console.log(this.state.ids)
    }
   }




    





    async addList(props){
        
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        if(this.state.list.length < 3 )
        
        {
        let array = this.state.items

    var objIndex = array.findIndex((obj => obj.id === props));
    if(array[objIndex].added == false){
    array[objIndex].added = true
    var daname = capitalize(array[objIndex].name)
    console.log(daname)
    this.state.list.push(daname)
    this.state.ids.push(array[objIndex].id)
    this.setState({items:array})

    }
    else if(array[objIndex].added == true){
    array[objIndex].added = false

    this.state.ids.pop() 
    this.state.list.pop()
    }
    console.log('this list'+this.state.list)
    console.log('this ids'+this.state.ids)

    console.log(this.state.items)
    this.setState(prevState => ({index: prevState.index + 1})); 
    }

    else if (this.state.list.length == 3 && this.state.ids.includes(props)){
           
        
        console.log(props)
        let last = this.state.ids[1]
        console.log(last)

       let array = this.state.items
    var objIndex = array.findIndex((obj => obj.id === props));
   
    array[objIndex].added = false
    this.state.ids.pop() 
    this.state.list.pop()

    this.setState(prevState => ({index: prevState.index + 1}));
    console.log('this list'+this.state.list)
    console.log('this ids'+this.state.ids)
} 
    else 
    {
    return Alert.alert('Limit reached','You can select only 3 categories, or try resetting the list. ')
    }
    
}


reset(){
    var list2=[]
    var ids2=[]
    console.log(list2)
    while(this.state.list.length > 0) {
        this.state.list.pop();
        console.log('workin')
        this.setState({list:list2})
        console.log(this.state.list)
    }

    while(this.state.ids.length > 0) {
        this.state.ids.pop();
        console.log('workin')
        this.setState({ids:ids2})
        console.log(this.state.ids)
    }


    var newD = []
    newD = this.state.items
    console.log(newD)
    newD[0].added=false
    newD[1].added=false
    newD[2].added=false
    newD[3].added=false
    newD[4].added=false
    newD[5].added=false
    newD[6].added=false
    newD[7].added=false
    newD[8].added=false
    newD[9].added=false

       this.setState({items:newD})






    console.log(this.state.list)


}

showAd(){
    AdMobInterstitial.setAdUnitID('ca-app-pub-9592011956917491/6699231376');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd())

}

async submit(){
    
    this.showAd()

    const { navigate } = this.props.navigation;

    if(this.state.ids.length == 3){
        AsyncStorage.setItem('categories',JSON.stringify(this.state.ids))
        AsyncStorage.setItem('names',JSON.stringify(this.state.list))
        await AsyncStorage.setItem('userToken', 'LoggedIn');

         navigate('App');
    }
    else {
        Alert.alert('A moment','Select at least 3 categories')
    }
}


    count(){
       if(this.state.list.length > 0){
       return <Text style={{color:'#2ed573',alignSelf:'center',fontWeight:"500"}}>{this.state.list.length} out of 3</Text>
       }
    }

    
    render() {
        
        return (

       
    <View style={styles.container}>
      <View>
          {this.count()}
    </View>      

    <GridView
        extraData={this.state.index}
        itemDimension={120}
        items={this.state.items}
        style={styles.gridView}
        //itemWidth={120}
        renderItem={item => (
          
          <View style={{borderWidth:1.5,borderRadius:4,borderColor:item.added ?  '#00b33c' : 'transparent' ,flexDirection:'column'}}>
         
          
          <TouchableOpacity  activeOpacity={1.0} style={[styles.itemContainer, { backgroundColor: 'black'}]} onPress={()=>this.addList(item.id)}>
          <ImageOverlay source={item.source} overlayColor="#000" overlayAlpha={0.4} 
          containerStyle={{width:'100%',display:'flex',position:'relative',
          height:'100%',borderRadius:2,justifyContent:'center',alignItems:'center'
          }} resizeMode="cover">


          <View style={{position:'absolute',bottom:5,right:5}}>
            <Icon name="done" size={27} color={item.added ?  '#00b33c' : 'transparent' } />
            </View>
            <Text style={styles.itemName}>{item.name}</Text>

            </ImageOverlay> 

          </TouchableOpacity>
          
          </View>
        )}
      />
      <View style={{alignContent:'stretch',alignItems:'stretch',alignSelf:'center'}}>
  <AdMobBanner
adSize="smartBannerLandscape"
  adUnitID="ca-app-pub-9592011956917491/8683582684"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.log(error)}
/></View>

        
     






    <View style={{flexDirection:'row',}}>
        

            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.reset()} style={{backgroundColor:'#4b6584',borderRadius:3,width:'50%',height:50,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'rgba(0, 22, 0, 0.3)'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#fff'}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.submit()} style={{backgroundColor:'#009432',borderRadius:3,width:'50%',height:50,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'rgba(0, 22, 0, 0.3)'}}>
                <Text style={{fontWeight:"700",fontSize:15,includeFontPadding:true,color:'#fff'}}>Done</Text>
            </TouchableOpacity>
</View>

      </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight:2,
        paddingLeft:2,
        backgroundColor: '#000',
    },
    gridView: {
        
        flex: 1,
        backgroundColor:'black'
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        borderColor:'transparent',
        //opacity:0.9,
        padding: 0,
        height: 150,
      },
      itemName: {
        left:4,
        alignSelf:"center",
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: 'white',
        
      },
});

//make this component available to the app
export default Home;
//ca-app-pub-6147506808396069/4428130567