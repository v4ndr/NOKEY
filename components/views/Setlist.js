import * as React from 'react'
import { View, Button } from 'react-native'
import {StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import SortableList from '../elements/SortableList'

const Setlist = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <SortableList nav={navigation}/>
        </View>
    )
}
        
const styles = StyleSheet.create({
    container: {
        flex:1
    }
})
    
export default Setlist