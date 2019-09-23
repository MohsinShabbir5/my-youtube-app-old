//import liraries
import React, { Component } from 'react';
import { View, StyleSheet,ScrollView,Image,Text,ImageBackground,AsyncStorage,BackHandler,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import { Container, Header, Content, List, Button, ListItem,H3,H2,Left, Body, Right, Switch } from 'native-base';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
import { RNChipView } from 'react-native-chip-view'

// create a component
class Sidebar extends Component {



  constructor(){
    super()
    this.state={
      ch:[]
    }
    
  }
  

   async componentDidMount(){
    var names = await AsyncStorage.getItem('names')
    var conames =JSON.parse(names)
    this.setState({ch : conames})
  }


  exit(){
    Alert.alert(
      'Exit',
      'Are you sure.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()  
      },
      ],
      { cancelable: true }
    )

  }


  logout(){
    AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Select');
  }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                 
                <Content>
<ImageBackground style={{width:'100%',height:150}} source={require('./bg.jpg')} >
<View style={{backgroundColor:'transparent',width:'100%',height:150,flexDirection:'row',padding:10,alignItems:'center',opacity:0.2}}>

<View style={{justifyContent:'center',left:10}}>
{/*<Text style={{color:'white',fontSize:24,fontWeight:"700"}}>Dashboard</Text>
<Text style={{color:'white',fontSize:15}}>Choose preferences</Text>
*/}
</View>
</View>
</ImageBackground>

          <List style={{marginRight:6,top:8}}>
            <ListItem onPress={()=>this.props.navigation.pop()} icon>
              <Left>
                <Icon name="home" size={21} color="#ff0000"/>
              </Left>
              <Body>
                <Text style={{color:'white'}}>Home</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>



            <ListItem onPress={()=>this.props.navigation.navigate('subs')}  icon>
              <Left>
                <Icon name="tv" size={21} color="#ff0000"/>
              </Left>
              <Body>
                <Text style={{color:'white'}}>My Favourites</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>



             <ListItem onPress={()=>this.logout()} icon>
              <Left>
                <Icon name="radio"  size={21} color="#ff0000" />
              </Left>
              <Body>
                <Text style={{color:'white'}}>Choose Categories</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>


 <ListItem  onPress={()=>this.exit()} icon>
              <Left>
                <Icon name="x-circle" size={21} color="#ff0000" />
              </Left>
              <Body>
                <Text style={{color:'white'}}>Exit</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>


         {/*<Text style={{color:'#ff0000',left:10,marginVertical:5,fontSize:20,fontWeight:'500'}}>Selections</Text>*/}
          <View style={{marginVertical:15}}>
          <View style={{flexDirection:'row',alignSelf:'center',alignContent:'space-between'}}>
          <View style={{width:'38%',borderColor:"#fff",borderWidth:1,borderRadius:40,marginHorizontal:4}}>
    <RNChipView
      backgroundColor="#2f3640"
  title={this.state.ch[0]}
  titleStyle={{flex:1,textAlign:'center',textWrap:'wrap',color:'#fff',fontWeight:'400',fontSize:13}}
  avatar={false}
/>
</View>

<View style={{width:'38%',borderColor:"#fff",borderWidth:1,borderRadius:40}}>
<RNChipView
backgroundColor="#2f3640"
  title={this.state.ch[1]}
  titleStyle={{flex:1,textAlign:'center',textWrap:'wrap',color:'#fff',fontWeight:'400',fontSize:13}}
  avatar={false}
/>
</View>

</View>
<View style={{marginVertical:2}}>
<View style={{width:'38%',borderColor:"#fff",borderWidth:1,borderRadius:40,alignSelf:'center',margin:3}}>
<RNChipView
backgroundColor="#2f3640"
  title={this.state.ch[2]}
  titleStyle={{flex:1,textAlign:'center',textWrap:'wrap',color:'#fff',fontWeight:'400',fontSize:13}}
  avatar={false}
/>
</View>
</View>
</View>



              {/*<ListItem icon>
              <Left>
              <Icon name="monitor" size={21} color="#ff0000"/>

              </Left>
              <Body>
              <Text style={{color:'white'}}>{this.state.ch[0]}</Text>

              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>


            <ListItem icon>
              <Left>
              <Icon name="monitor" size={21} color="#ff0000"/>

              </Left>
              <Body>
              <Text style={{color:'white'}}>{this.state.ch[1]}</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
            </ListItem>


            <ListItem icon>
              <Left>
              <Icon name="monitor" size={21} color="#ff0000"/>

              </Left>
              <Body>
              <Text style={{color:'white'}}>{this.state.ch[2]}</Text>
              </Body>
              <Right>
                  <View></View>
              </Right>
              </ListItem>*/}
            </List>
            </Content>
            
                </ScrollView>
                <View style={{bottom:0}}>
  <AdMobBanner
adSize="banner"
  adUnitID="ca-app-pub-9592011956917491/8683582684"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.log(error)}
/></View>
                <View style={{position:'absolute',bottom:5,left:10}}>
                <Text style={{textAlign:'left',fontSize:10,color:'#ddc'}}>Version : 2.8.1</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

//make this component available to the app
export default Sidebar;
