import * as React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import songs from '../../data/songs.json'
import {useDispatch, useSelector} from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'


const DisplayChevron = (props) => {
    if (props.setlist.includes(props.id)){
        return (
            <ListItem.Chevron name='check' type='font-awesome-5' color='#A3E4D7'/>
        )
    }
    else{
        return (
            <></>
        )
    }
}
const renderItem = ({item}, setlist, dispatch) => {
    return(
        <ListItem button bottomDivider onPress={()=>{dispatch({type:'TOGGLE_SETLIST', value:item.id})}}>
            <ListItem.Content style={styles.item}>
                <Text style={styles.itemText}>
                    {item.title}
                </Text>
            </ListItem.Content>
            <DisplayChevron setlist={setlist} id={item.id}/>
        </ListItem>
    )
}
const SongList = () => {
    const dispatch = useDispatch()
    const setlist = useSelector(state=>state.setlist)
    return (
        <View style={styles.container}>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => renderItem(item, setlist, dispatch)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex:1
    },
    item: {
        textTransform:'uppercase',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'

    },
    itemText:{
        textTransform:'uppercase',
        fontSize:17
    },
})

export default SongList;