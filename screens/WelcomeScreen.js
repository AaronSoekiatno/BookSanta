import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert, Modal,ScrollView } from 'react-native';
import db from '../config'
import * as firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
constructor() {
    super();
    this.state={
        email:'',
        password:'',
        isModelVisible:'true',
        firstName:'',
        lastName:'',
        address:'',
        contact:'',
        confirmPw:'',
    }
}

showModal=()=>{
    return(
        <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.isModelVisible}
        >
        <ScrollView style={styles.scroll}>
        <View style={{justifyContent:'center',alignSelf:'center',}}>
            <Text style={{fontSize:24,fontWeight:'bold',alignItems:'center',}}>Sign Up</Text>
        </View>

        <View style={styles.signUp}>
            <Text>First Name</Text>
            <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(text)=>{
                this.setState({
                    firstName:text
                })
            }}            
            />

            <Text>Last Name</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(text)=>{
                this.setState({
                    lastName:text
                })
            }}            
            />

            <Text>Address</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Address"
            onChangeText={(text)=>{
                this.setState({
                    address:text
                })
            }}            
            />

            <Text>Contact</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Contact"
            onChangeText={(text)=>{
                this.setState({
                    contact:text
                })
            }}            
            />

            <Text>Email</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text)=>{
                this.setState({
                    email:text
                })
            }}            
            />

            <Text>Password</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(text)=>{
                this.setState({
                    password:text
                })
            }}            
            />

            <Text>Confirm password</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            onChangeText={(text)=>{
                this.setState({
                    confirmPw:text
                })
            }}
            />

            <TouchableOpacity
            style={styles.btn}
            onPress={()=>{this.userSignUp(this.state.email,this.state.password,this.state.confirmPw)}}
            >
            <Text style={{marginTop:40}}>Register</Text>
            </TouchableOpacity>

            
        </View>
        </ScrollView>
        </Modal>
    ) 
}

userLogin=(email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
        this.props.navigation.navigate('BookRequest')
        console.log("Succesfully Login")
        return Alert.alert("Succesfully Login")
    })
    
}

userSignUp=(email,password,confirmPw)=>{
    if(password!==confirmPw){
        return Alert.alert("Your password doesn't match.")
    }else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            db.collection("users").add({
                first_Name:this.state.firstName,
                last_Name:this.state.lastName,
                contact:this.state.contact,
                address:this.state.address,
                email:this.state.email,
                password:this.state.password,
                isBookRequestActive:false
            })
            return Alert.alert("User successfully added","",[
                {
                    text:"okay",
                    onPress:()=>this.setState({
                        isModelVisible:false,
                    })
                }
            ])
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
        })
    }
}
  render() {
    return(
        <KeyboardAvoidingView style={styles.container}behavior={"padding"}>
            <View>
                <Text style={styles.title}>Book Santa</Text>
            </View>
            <View>
                <TextInput
                style={styles.textInput}
                placeholder="Enter your email address"
                keyboardType="email-address"
                onChangeText={(text)=>{
                    this.setState({
                        email: text})
                }}
                />
                <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                secureTextEntry="true"
                onChangeText={(text)=>{
                    this.setState({
                        password: text})
                }}
                />
            </View>
            <View>
                <TouchableOpacity 
                onPress={()=>{this.userLogin(this.state.email,this.state.password);}}
                style={styles.btn}>
                    <Text style={{marginTop:40}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>this.setState({
                    isModalVisible:true
                })}
                style={styles.btn}>
                    <Text style={{marginTop:40}}>Sign Up</Text>
                </TouchableOpacity>

            </View>
            {this.showModal()}
        </KeyboardAvoidingView>
    )
  } 
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:{
        backgroundColor: 'cyan',
        width:100,
        height:100,
        borderRadius:50,
        alignItems: 'center',
        marginTop:5
    },
    title:{
        fontSize:40,
        color: 'red',
        fontWeight: 'bold',
    },
    scroll:{
        flex:1,
        backgroundColor: 'peach',
        textAlign: 'center',
    },
    signUp:{
        justifyContent:'center',
        alignItems: 'center',
        flex:0.8
    },
    textInput:{
        borderWidth:1.5,
        alignItems: 'center',
        marginBottom:10,
    }
  });
  