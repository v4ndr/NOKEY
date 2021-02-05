import * as React from 'react'
import {StyleSheet} from 'react-native'
import {FAB} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'

const PlayButton = () => {
    const navigation = useNavigation()
    return (
        <FAB
            style={styles.fab}
            icon="play"
            onPress={() => navigation.navigate('player')}
        />
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        alignSelf:'center',
        bottom: 0,
    }
})
    
export default PlayButton