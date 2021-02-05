import React, {Component} from 'react'
import {Dimensions, StyleSheet, ScrollView, View} from 'react-native'
import {DragSortableView} from 'react-native-drag-sort'
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux'
import songs from '../../data/songs.json'

const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48

class SortableList extends Component{

    constructor(props) {
        super()

        this.state = {
            scrollEnabled: true,
            data: props.setlist
        }
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff',flex: 1}}>
                <ScrollView
                ref={(scrollView)=> this.scrollView = scrollView}
                scrollEnabled = {this.state.scrollEnabled}
                style={styles.container}>
                <DragSortableView
                    dataSource={this.props.setlist}
                    delayLongPress={0}
                    isDragFreely={true}
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
                        if (data.length != this.state.data.length) {
                            this.setState({
                                data: data
                            })
                        }
                        this.props.dispatch({type:"NEW_SETLIST",value:data})
                    }}
                    keyExtractor={(item,index)=> index}
                    onClickItem={(data,item,index)=>{

                    }}
                    renderItem={(item,index)=>{
                        return this.renderItem(item,index)
                    }}
                />
            </ScrollView>
            </View>
        )
    }

    renderItem(item,index) {
        return (
            <ListItem style={styles.item_children} button bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={styles.title}>{songs.find(song => song.id === item).title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron name='bars' type='font-awesome-5'/>
            </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item_children: {
        width: childrenWidth,
        height: childrenHeight
    },
    title: {
        textTransform:'uppercase'
    },
})

const mapStateToPops= (state) => {
    return{
        setlist: state.setlist
    }
}

export default connect(mapStateToPops)(SortableList)