import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Button} from 'react-native'
import SongList from '../components/views/SongList'
import Setlist from '../components/views/Setlist'
import * as RootNavigation from './RootNavigation'
import PlayButton from '../components/elements/PlayButton'
import { useSelector } from 'react-redux'

const NestedStack = () => {
    const Stack = createStackNavigator()
    const setlist = useSelector(state=>state.setlist)
    return(
        <>
        <Stack.Navigator>
            <Stack.Screen name="songList" component={SongList} options={{
            title:'NOKEY',
            headerRight:()=>{
              return(
              <Button
                title={"Setlist ("+setlist.length+")"}
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

export default NestedStack
