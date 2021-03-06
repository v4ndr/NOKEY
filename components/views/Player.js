import * as React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import Swiper from 'react-native-swiper'
import CloseButton from '../elements/CloseButton'
import {useSelector} from 'react-redux'
import songs from '../../data/songs.json'

const generateChart = (id, setlist) => {
    return songs.find(song=>song.id === setlist[id]).chart.map((item, index)=>{
        return(
            <>
            <Text style={styles.sectionTitle} key={index}>{item[0]}</Text>
            <Text style={styles.chart}>{item[1]}</Text>
            </>
        )
    })
}

const generateSwiper = () => {
    const setlist = useSelector(state=>state.setlist)
    let slides= []
    for (let i=0; i < setlist.length ; i++){

        slides.push(
            <View key={i} style={styles.slide}>
                <View style={styles.slideTitle}>
                    <Text style={styles.title}>{songs.find(song => song.id === setlist[i]).title}</Text>
                </View>
                <View style={styles.slideChart}>
                    {generateChart(i, setlist)}
                </View>
                <View style={styles.slideSup}/>
            </View>
        )
    }
    return(
        slides
    )
}

const Player = () => {

    return(
        <View style={styles.container}>
            <Swiper>
                {generateSwiper()}
            </Swiper>
            <CloseButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    slide: {
        flex: 1,
        backgroundColor: '#92BBD9'
    },
    slideTitle:{
        flex:1,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:8
    },
    slideChart : {
        flex:5,
        justifyContent:'center',
        alignItems:'center'
    },
    slideSup:{
        flex:1
    },
    title: {
        textTransform:'uppercase',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center'
    },
    sectionTitle: {
        color: 'gray',
        fontSize: 30,
        textTransform:'uppercase'
    },
    chart: {
        color: '#fff',
        fontSize: 30,
        textAlign:'center'
    }
})

export default Player
