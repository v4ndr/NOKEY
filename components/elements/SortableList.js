import React, {Component} from 'react'
import {Dimensions, StyleSheet, ScrollView, View, Animated, Button} from 'react-native'
import {DragSortableView} from 'react-native-drag-sort'
import {connect} from 'react-redux'
import {ListItem} from 'react-native-elements'
import {Icon} from 'react-native-elements'
import songs from '../../data/songs.json'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import PlayButton from './PlayButton'

const {width} = Dimensions.get('window')
const parentWidth = width
const childrenWidth = width
const childrenHeight = 48

class SortableList extends Component{

    constructor(props) {
        super()

        this.state = {
            scrollEnabled: true,
            data: props.setlist,
            editMode: false,
            animWidth: new Animated.Value(0),
            checkedItems: [],
            fake: false
        }
    }

    toggleEdit() {
        if(!this.state.editMode){
            Animated.timing(this.state.animWidth, {toValue:30, duration: 500, useNativeDriver:false}).start()
            this.props.nav.setOptions({headerRight:()=>{
                return(
                <Button
                    title='Annuler'
                    onPress={()=>this.toggleEdit()}
                    />
                )
            }})
        }
        else{
            Animated.timing(this.state.animWidth, {toValue:0, duration: 500, useNativeDriver:false}).start()
            this.props.nav.setOptions({headerRight:()=>{
                return(
                <Button
                    title='Modifier'
                    onPress={()=>this.toggleEdit()}
                    />
                )
            }})
        }
        this.setState({editMode:!this.state.editMode})
        this.props.dispatch({type:"TOGGLE_EDITMODE"})
    }

    componentDidMount() {
        this.props.nav.setOptions({headerRight:()=>{
            return(
            <Button
                title='Modifier'
                onPress={()=>this.toggleEdit()}
                />
            )
        }})
    }

    displayCheck(item) {
        if(this.state.checkedItems.includes(item)){
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
        if(this.state.editMode){
        this.setState(state=>{
            if(state.checkedItems.includes(item)){
                state.checkedItems.splice(state.checkedItems.indexOf(item), 1)
            }
            else{
                state.checkedItems.push(item)
            }
            
        })
        this.setState({ state: this.state })
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
                    sortable={this.state.editMode}
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
                        if (data.length != this.state.data.length) {
                            this.setState({
                                data: data
                            })
                        }
                        this.props.dispatch({type:"NEW_SETLIST",value:data})
                    }}
                    keyExtractor={(item,index)=> index}
                    onClickItem={(data,item,index)=>{
                        this.checkItem(item)
                    }}
                    renderItem={(item)=>{
                        return(
                        <ListItem style={styles.children} button bottomDivider>
                            <ListItem.Content style={styles.content}>
                                <Animated.View style={{width: this.state.animWidth}}>
                                    <TouchableWithoutFeedback>
                                        {this.displayCheck(item)}
                                    </TouchableWithoutFeedback>
                                </Animated.View>
                                <ListItem.Title style={styles.title}>{songs.find(song => song.id === item).title}</ListItem.Title>
                            </ListItem.Content>
                            <Animated.View style={{width: this.state.animWidth}}>
                                <ListItem.Chevron name='bars' type='font-awesome-5'/>
                            </Animated.View>
                        </ListItem>
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
        setlist: state.setlist
    }
}

export default connect(mapStateToPops)(SortableList)