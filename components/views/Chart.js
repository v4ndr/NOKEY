import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import colors from '../../theme/colors'
import songs from '../../data/songs.json'
import {useRoute} from '@react-navigation/native'

const Chart = () => {
    const route = useRoute()
    return (
        <View style={styles.root}>
            <Text style={styles.title}>{songs.find(song => song.id === route.params.id).chart}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrayPurple,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    }
})

export default Chart