import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {TouchableOpacity, Text} from 'react-native'
import SongList from '../components/views/SongList'
import Setlist from '../components/views/Setlist'
import * as RootNavigation from './RootNavigation'
import PlayButton from '../components/elements/PlayButton'
import {connect} from 'react-redux'

class NestedStack extends React.Component {

    constructor(props){
      super(props)
    }

    render(){

      const Stack = createStackNavigator()

      return(
          <>
          <Stack.Navigator>
              <Stack.Screen name="songList" component={SongList} options={{
              title:'NOKEY',
              headerRight:()=>{
                return(
                  <TouchableOpacity
                    style={{padding:10, alignItems:'center', backgroundColor:'white'}}
                    onPress={()=>{RootNavigation.navigate('setlist')}}
                  >
                    <Text style={{color:'#007AFF', fontSize:18}}>{"Setlist ("+this.props.setlist.length+")"}</Text>
                  </TouchableOpacity>
                )
              }
              }}/>
            <Stack.Screen name="setlist" component={Setlist} options={{headerTitle:'SETLIST'}}/>
          </Stack.Navigator>
          <PlayButton/>
          </>
      )
    }
}

const mapStateToPops = (state) => {
  return{
    setlist: state.setlist,
    checkedItem: state.checkedItem,
    editMode: state.editMode,
  }
}

export default connect(mapStateToPops)(NestedStack)
