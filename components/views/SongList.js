import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {ListItem} from 'react-native-elements'
import songs from '../../data/songs.json'
import {SwipeListView} from 'react-native-swipe-list-view'
import {useDispatch} from 'react-redux'

const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
}

const renderHiddenItem = (data, rowMap, dispatch) => {
    
    return (
        <ListItem button onPress={()=>{dispatch({type: "TOGGLE_SETLIST", value: data.item.id}); closeRow(rowMap, data.item.id)}} bottomDivider containerStyle={styles.hiddenRow}>
            <ListItem.Content>
                <ListItem.Title style={styles.btn}>SETLIST</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}

const renderItem = ({item}) => {
    return(
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
}

const SongList = () => {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <SwipeListView
                data={songs}
                renderItem={renderItem}
                renderHiddenItem={(rowData, rowMap)=>renderHiddenItem(rowData, rowMap, dispatch)}
                rightOpenValue={-100}
                previewRowKey={'3'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                keyExtractor={(item) => item.id.toString()}
                disableRightSwipe={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex:1
    },
    title: {
        textTransform:'uppercase'
    },
    btn: {
        textTransform:'uppercase',
        alignSelf:'flex-end',
    },
    hiddenRow:{
        backgroundColor:'#ffef61'
    }
})

export default SongList;