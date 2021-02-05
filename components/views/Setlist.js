import * as React from 'react'
import {StyleSheet} from 'react-native'
import SortableList from '../elements/SortableList'

const Setlist = () => {
    return (
        <SortableList/>
    )
}
        
const styles = StyleSheet.create({
    title: {
        textTransform:'uppercase'
    },
    container: {
        flex:1
    }
})
    
export default Setlist