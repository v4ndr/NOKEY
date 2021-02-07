import * as React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import songs from '../../data/songs.json'
import {SwipeListView} from 'react-native-swipe-list-view'
import {useDispatch, useSelector} from 'react-redux'
import {Icon} from 'react-native-elements'

const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
}

const BtnIcon = (id) => {
    const setlist = useSelector(state=>state.setlist)
    if(setlist.includes(id.id)){
        return(
            <Icon
                name="check-circle"
                type="font-awesome-5"
                size={20}
                style={styles.btnIcon}
            />
        )
    }
    else{
        return(
            <Icon
                name="circle"
                type="font-awesome-5"
                size={20}
                style={styles.btnIcon}
            />
        )
    }

}

const renderHiddenItem = (data, rowMap, dispatch) => {
    
    return (
        <ListItem button onPress={()=>{dispatch({type: "TOGGLE_SETLIST", value: data.item.id}); closeRow(rowMap, data.item.id)}} bottomDivider containerStyle={styles.hiddenRow}>
            <ListItem.Content style={styles.btn}>
                    <BtnIcon id={data.item.id}/>
            </ListItem.Content>
        </ListItem>
    )
}

const TitleLabel = (id) => {
    const setlist = useSelector(state=>state.setlist)
    if(setlist.includes(id.id)){
        return(
            <Icon
                name="circle"
                type="font-awesome-5"
                color='#ffef61'
                solid={true}
                size={10}
                style={styles.btnIcon}
            />
        )
    }
    else{
        return(
            <></>
        )
    }
}

const renderItem = ({item}) => {
    return(
        <ListItem bottomDivider>
            <ListItem.Content style={styles.item}>
                <Text style={styles.itemText}>
                    {item.title}
                </Text>
                <TitleLabel id={item.id}/>
            </ListItem.Content>
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
                rightOpenValue={-58}
                previewRowKey={'3'}
                previewOpenValue={-40}
                previewOpenDelay={1000}
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
    btn: {
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'

    },
    btnIcon:{
        marginHorizontal:4
    },
    btnText:{
        fontSize:16,
    },
    hiddenRow:{
        backgroundColor:'#ffef61'
    }
})

export default SongList;