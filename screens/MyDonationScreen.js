import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert, Modal,ScrollView } from 'react-native';
import db from '../config'
import * as firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class MyDonationScreen extends React.Component {
constructor(){
    super();
    this.state = {
        donorId:firebase.auth().currentUser.email,
        donorName:"",
        allDonations:[],
    }
    this.requestRef = null;
}

getAllDonations=()=>{
    this.requestRef = db.collection("all_donations").where("donor_id","==",this.state.donorId)
    .onSnapshot((snapshot)=>{
        var allDonations = []
        snapshot.docs.map((doc)=>{
            var donation = doc.data()
            donation["doc_id"] = doc.id
            allDonations.push(donation)
        })
        this.setState({allDonations:allDonations})
    })
}

getDonorDetails=(donorId)=>{
    db.collection("users")
    .where("email_id","==",this.state.donorId)
    .get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            this.setState({
            "donorName":doc.data().first_name+" "+doc.data().last_name
            })
        })
    })
}

static navigationOptions = {Header:null}

render(){
    return(
        <View style={{flex:1}}>

        </View>
    )
}
}