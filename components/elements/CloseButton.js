import * as React from 'react'
import {StyleSheet} from 'react-native'
import {FAB} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'

const CloseButton = () => {
    const navigation = useNavigation()
    return(
        <FAB
            style={styles.fab}
            small
            color="#6b6b6b"
            icon="close"
            onPress={() => navigation.goBack()}
        />
    )
} 

const styles = StyleSheet.create({
    fab:{
        position: 'absolute',
        margin: 5,
        right:0,
        top: 15,
        backgroundColor:"rgba(0,0,0,0)"
    }
})

export default CloseButton