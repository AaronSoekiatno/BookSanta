import firebase from 'firebase';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Card} from 'react-native';

export default class ReceiverDetails extends React.Component {
constructor(){
    super();
    this.state={
        userId:firebase.auth().currentUser.email,
        receiverId:this.props.navigation.getParam('details')["user_Id"],
        requestId:this.props.navigation.getParam('details')['request_id'],
        bookName:this.props.navigation.getParam('details')['book_name'],
        reason_for_requesting:this.props.navigation.getParam('details')['reason_for_requesting'],
        receiverName:'',
        receiverContact:'',
        receiverAddress:'',
        receiverRequestDocId:'',
        userName:'',
    }
}

updateBookStatus=()=>{
    db.collection('all_donations').add({
        'book_name':this.state.bookName,
        'request_id':this.state.requestId,
        'request_by':this.state.receiverName,
        'donor_id':this.state.userId,
        'request_status':"Donor Interested"
    })
}

getUserDetails=(userId)=>{
    db.collection('users').where('email_id','==',this.state.userId).get()
    .then(snapshot=>{
        snapshot.forEach(doc => {
            this.setState({
                userName:doc.data().first_name+" "+doc.data().last_name
            })
        })
    })
}

getReceiverDetails(){
    db.collection('users').where('email_id','==',this.state.receiverId).get()
    .then(snapshot=>{
        snapshot.forEach(doc => {
            this.setState({
                receiverName:doc.data().first_name,
                receiverContact:doc.data().contact,
                receiverAddress:doc.data().address,
            })
        })
    })
    db.collection("requested_books").where('email_id','==',this.state.receiverId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                receiverRequestDocId:doc.id
            })
        })
    })
}

addNotification=()=>{
        var message = this.state.userName+'Has shown interest in donating a book'
        db.collection('all_notification').add({
            "target_user_id":this.state.receiverId,
            "donor_id":this.state.userId,
            "request_id":this.state.requestId,
            "bookName":this.state.bookName,
            "date":firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status":'unread',
            "message":message
        })
}

componentDidMount(){
    this.getReceiverDetails();
    this.getUserDetails(this.state.userId);
}
    render() {
        return(
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                <Header
                leftComponent={<Icon name="arrow-left" type="feather" color='red'
                onPress={()=>{
                    this.props.navigation.goBack();
                }}
                centerComponent={{text:'BookDonate',style:{color:'red',fontSize:24, fontWeight:'bold'}}}
                backgroundColor='white'
                />}
                />  
                </View>      
                <View style={{flex:0.3}}>
                    <Card title={'Book Information'}
                    titleStyle={{fontSize:'20'}}>
                    <Card>
                        <Text style={{fontWeight:'bold'}}>Name:</Text>
                    </Card>

                    <Card>
                        <Text style={{fontWeight:'bold'}}>Reason:{this.state.reason_for_requesting}</Text>
                    </Card>
                    </Card>
                </View>
                <View style={{flex:0.3}}>
                    <Card title={'Receiver Information'}
                    titleStyle={{fontSize:20}}>

                    <Card>
                        <Text style={{fontWeight:'bold'}}>Name:{this.state.receiverName}</Text>
                    </Card>

                    <Card>
                        <Text style={{fontWeight:'bold'}}>Contact:{this.state.receiverContact}</Text>
                    </Card>

                    <Card>
                        <Text style={{fontWeight:'bold'}}>Address:{this.state.receiverAddress}</Text>
                    </Card>

                    </Card>
                </View>
                
                <View style={{flex:0.3}}>
                    {this.state.receiverId!==this.state.userId?(
                        <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                        this.updateBookStatus()
                        this.addNotification()
                        this.props.navigation.navigate('MyDonation')}}>
                        <Text>I want to Donate.</Text>
                        </TouchableOpacity>):null}

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
    button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      }
})