import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert, Modal,ScrollView } from 'react-native';
import db from '../config'
import * as firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class MyReceivedBookScreen extends React.Component {
constructor(){
    super();
    this.state = {
        userId:firebase.auth().currentUser.email,
        receivedBookList:[],
    }
    this.requestRef=null;
}

getReceivedBookList=()=>{
    this.requestRef = db.collection("requested_books")
    .where("user_id","==",this.state.userId)
    .where("book_status","==","recieved")
    .onSnapshot((snapshot)=>{
        var receivedBookList = snapshot.docs.map((doc)=>doc.data())
        this.setState({receivedBookList:receivedBookList})
    })
}

componentDidMount(){
    this.getReceivedBookList()
}

componentWillUnmount(){
    this.requestRef()
}

keyExtractor=(item,index)=>{
    index.toString();
}

renderItem=({item,i})=>{
    console.log(item.book_name)
    return(
        <ListItem
        key = {i}
        title={item.book_name}
        subtitle={item.book_status}
        titleStyle= {{color: 'black', fontWeight: 'bold' }}
        bottomDivider
        />
    )
}

render(){
    return(
        <View style={{flex:1}}>
            <MyHeader title="Received Books" navigation ={this.props.navigation}/>

            <View style={{flex:1}}>
                {
                    this.state.receivedBookList.length===0?(
                    <View>
                        <Text>List of all Received Books</Text>
                    </View>
                    ):
                    (
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.receivedBookList}
                        renderItem={this.renderItem}
                        />
                    )
                }
            </View>
        </View>
    )
}
}
