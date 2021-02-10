import React, {Component} from 'react'
import {Dimensions, StyleSheet, ScrollView, View } from 'react-native'
import {DragSortableView} from 'react-native-drag-sort'
import {connect} from 'react-redux'
import {ListItem} from 'react-native-elements'
import {Icon} from 'react-native-elements'
import songs from '../../data/songs.json'
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width} = Dimensions.get('window')
const parentWidth = width
const childrenWidth = width
const childrenHeight = 48


class SortableList extends Component{

    constructor(props) {
        super()

        this.state = {
            scrollEnabled: true,
        }
    }

    displayCheck(item) {
        if(this.props.checkedItem.includes(item)){
            return(
                <Icon
                    name="check-circle"
                    type="font-awesome-5"
                    size={20}
                    style={styles.checkbox}
                />
            )
        }
        else{
            return(
                <Icon
                    name="circle"
                    type="font-awesome-5"
                    size={20}
                    style={styles.checkbox}
                />
            )
        }
    }

    checkItem(item) {
            this.props.dispatch({type: 'TOGGLE_CHECK_ITEM', value: item})
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff',flex: 1}}>
                <ScrollView
                ref={(scrollView)=> this.scrollView = scrollView}
                scrollEnabled = {this.state.scrollEnabled}
                style={styles.container}>
                <DragSortableView
                    sortable={this.props.editMode}
                    dataSource={this.props.setlist}
                    delayLongPress={200}
                    isDragFreely={false}
                    parentWidth={parentWidth}
                    childrenWidth= {childrenWidth}
                    childrenHeight={childrenHeight}
                    scaleStatus={'scaleY'}
                    onDragStart={(startIndex,endIndex)=>{
                        this.setState({
                            scrollEnabled: false
                        })
                    }}
                    onDragEnd={(startIndex)=>{
                        this.setState({
                            scrollEnabled: true
                        })
                    }}
                    onDataChange = {(data)=>{
                        if (data.length != this.props.setlist.length) {
                            this.props.dispatch({type:"NEW_SETLIST",value:data})
                        }
                        this.props.dispatch({type:"NEW_SETLIST",value:data})
                    }}
                    keyExtractor={(item,index)=> index}
                    onClickItem={(data,item,index)=>{
                        this.checkItem(item)
                    }}
                    renderItem={(item)=>{
                        return(
                            <TouchableOpacity activeOpacity={0.7} underlayColor='white'>
                            <ListItem style={styles.children} button bottomDivider>
                                <ListItem.Content style={styles.content}>
                                    {this.displayCheck(item)}
                                    <ListItem.Title style={styles.title}>{songs.find(song => song.id === item).title}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron name='bars' type='font-awesome-5'/>
                            </ListItem>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    checkbox:{
        paddingRight:10,
        paddingLeft:0
    },
    content:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    children: {
        width: childrenWidth,
        height: childrenHeight
    },
    title: {
        textTransform:'uppercase'
    }
})

const mapStateToPops= (state) => {
    return{
        setlist: state.setlist,
        checkedItem: state.checkedItem,
        editMode: state.editMode,
    }
}

export default connect(mapStateToPops)(SortableList)