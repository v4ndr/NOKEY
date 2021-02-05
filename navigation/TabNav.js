import * as React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import colors from '../theme/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Setlist from '../components/views/Setlist'
import SongList from '../components/views/SongList'
import { View, StyleSheet} from 'react-native'
import PlayButton from '../components/elements/PlayButton'


const Tab = createBottomTabNavigator();

function TabNav(){
  return(
    <View style={styles.container}>
        <Tab.Navigator tabBarOptions={{activeTintColor: colors.lightPurple,inactiveTintColor: colors.gray,}}initialRouteName="Home">
            <Tab.Screen 
                name="Home" 
                component={SongList} 
                options={{
                    tabBarLabel:'HOME',
                    tabBarIcon:({focused})=>(
                    <FontAwesome5
                        name={'home'}
                        color={focused ? colors.lightPurple : colors.gray}
                        size={20}
                    />
                    )
                }} 
            />
            <Tab.Screen 
                name="Setlist" 
                component={Setlist} 
                options={{
                    tabBarLabel:'SETLIST',
                    tabBarIcon:({focused})=>(
                    <FontAwesome5
                        name={'list'}
                        color={focused ? colors.lightPurple : colors.gray}
                        size={20}
                    />
                    )
                }}
            />
        </Tab.Navigator>
        <PlayButton/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default TabNav