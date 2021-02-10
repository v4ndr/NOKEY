import * as React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
//import Player from '../components/views/Player'
import Actions from '../demo'
import NestedStack from './NestedStack'
import { navigationRef } from './RootNavigation';


const Stack = createStackNavigator();

const Navigation = () => {

  return(
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name='NestedStack' component={NestedStack} options={{headerShown:false}}/>
          <Stack.Screen name="player" component={Actions} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation;

