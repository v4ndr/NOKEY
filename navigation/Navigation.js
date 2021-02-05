import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import Chart from '../components/views/Chart'
import Player from '../components/views/Player'
import songs from '../data/songs.json'
import { useSelector } from 'react-redux'
import TabNav from './TabNav'
import ToggleButton from '../components/elements/ToggleButton'

const Stack = createStackNavigator();

const Navigation = () => {
  const setlist = useSelector(state=>state.setlist)
  return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="tabNav" component={TabNav} options={{title:'NOKEY'}}/>
          <Stack.Screen name="chartScreen" component={Chart} options={
            ({route})=>({title: songs.find(song => song.id === route.params.id).title,
            headerTitleStyle:{
              textTransform:'uppercase',
            },
            headerRight:()=><ToggleButton toggled={setlist.includes(route.params.id)}/>
          })}/>
          <Stack.Screen name="player" component={Player} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation;

