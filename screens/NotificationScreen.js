import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { ViewComponent } from 'react-native';

export default class NotificationScreen extends React.Component {
constructor(props){
    super(props);
    this.state={
        userId:firebase.auth().currentUser.Email,
        allNotification:[],
    };
    this.notificationRef = null;
}

getNotifications=()=>{
    this.notificationRef = db.collection('all_Notifications')
    .where("notification_status","==","unread")
    .where("targeted_user_id","==",this.state.userId)
    .onSnapshot((snapshot)=>{
        var allNotications = [];
        snapshot.docs.map((doc)=>{
            var notification = doc.data();
            notification["doc_id"] = doc.id
            allNotications.push(notification)
        })
    })
    this.setState({
        allNotications: allNotication
    })
}

componentDidMount(){
    this.getNotifications();
}

componentWillUnmount(){
    this.notificationRef();
}

keyExtractor=(item,index) => index.toString();

renderItem =({item,index})=>{
    return (
        <ListItem
        key = {index}
        leftElement = {<Icon name="book" type="font-awesome" color="#696969"/>}
        title = {item.book_name}
        titleStyle = {{color:'black', fontWeight:'bold'}}
        subtitle={item.message}
        bottomDivider
        />
    )
}
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <MyHeader
                    title="notification"
                    navigation={this.props.navigation}
                    />
                </View>
            <View>
                {this.state.allNotification.length==0?(
                    <View>
                        <Text>You have no notifications available.</Text>
                    </View>
                ):(
                    <SwipeableFlatList
                    allNotification = {this.state.allNotification}
                    />
                )
                }
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center'
    },
})