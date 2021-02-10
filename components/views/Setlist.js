import * as React from 'react'
import { View, Button } from 'react-native'
import {StyleSheet} from 'react-native'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import {useDispatch} from 'react-redux'
import SortableList from '../elements/SortableList'

const Setlist = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useFocusEffect(
        React.useCallback(
            ()=>{
                return () => {
                    dispatch({type:'DISABLE_EDITMODE'})
                }
            },[]
        )
    )
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