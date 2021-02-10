import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Button} from 'react-native'
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
                <Button
                  title={"Setlist ("+this.props.setlist.length+")"}
                  onPress={()=>{RootNavigation.navigate('setlist')}}
                />
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
