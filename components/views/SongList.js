import * as React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import songs from '../../data/songs.json'
import {SwipeListView} from 'react-native-swipe-list-view'
import {useDispatch, useSelector} from 'react-redux'
import {Icon} from 'react-native-elements'

let toggle = []
for(var i=0; i<songs.length;i++){
    toggle.push(false)
}

const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
}

const BtnIcon = (props) => {
    if(props.setlist.includes(props.id)){
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
const Actions = (props) => {
    return(
        <View style={[
            styles.btn, 
            toggle[props.id-1] && {backgroundColor:'lightgreen'},
            !toggle[props.id-1] && {backgroundColor:'#ffef61'},
            ]}>
                <Icon
                    name={toggle[props.id-1] ? 'check-circle' : 'circle'}
                    type="font-awesome-5"
                    size={20}
                />
        </View>
    )
    
}
const renderHiddenItem = (item, romMap, setlist) => {
    return (
        <Actions id={item.id} setlist={setlist}/>
    )
}

const TitleLabel = (props) => {
    if(props.setlist.includes(props.id)){
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

const renderItem = ({item}, setlist) => {
    return(
        <ListItem bottomDivider>
            <ListItem.Content style={styles.item}>
                <Text style={styles.itemText}>
                    {item.title}
                </Text>
                <TitleLabel id={item.id} setlist={setlist}/>
            </ListItem.Content>
        </ListItem>
    )
}
const SongList = () => {
    const dispatch = useDispatch()
    const setlist = useSelector(state=>state.setlist)
    return (
        <View style={styles.container}>
            <SwipeListView
                data={songs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => renderItem(item, setlist)}
                renderHiddenItem={({item, index}, romMap)=>renderHiddenItem(item, romMap, setlist)}
                previewRowKey={'3'}
                previewOpenValue={-40}
                previewOpenDelay={1000}
                disableRightSwipe={true}
                rightOpenValue={0}
                rightActivationValue={-80}
                rightActionValue={0}
                onRightAction={(rowKey)=>dispatch({type:'TOGGLE_SETLIST', value:parseInt(rowKey)})}
                onRightActionStatusChange={({key, isActivated})=>{
                    isActivated ? toggle[key-1] = !toggle[key-1] : null
                }}
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
        alignItems:'center',
        paddingHorizontal:8,
        flex:1,
        backgroundColor:'#ffef61'

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