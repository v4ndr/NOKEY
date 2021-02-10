import * as React from 'react'
import {StyleSheet} from 'react-native'
import {FAB} from 'react-native-paper'
import * as RootNavigation from '../../navigation/RootNavigation';
import {useSelector, useDispatch} from 'react-redux'

const PlayButton = () => {
    const editMode = useSelector(state=>state.editMode)
    const dispatch = useDispatch()
    if(!editMode){
        return (
            <FAB
                style={styles.fab}
                icon="play"
                onPress={() => RootNavigation.navigate('player')}
            />
        )
    }
    else{
        return (
            <FAB
                style={[styles.fab, styles.del]}
                icon="delete"
                onPress={() => {
                    dispatch({type: 'DELETE_ITEMS'})
                    dispatch({type:'DISABLE_EDITMODE'})
            }}
            />
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        alignSelf:'center',
        bottom: 0,
    },
    del:{
        backgroundColor:'red'
    }
})
    
export default PlayButton