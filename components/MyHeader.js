import React from 'react';
import { View } from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';
import db from '../config';

export default class MyHeader extends React.Component {
constructor(){
    super();
    this.state={
        value:'',
    }
}

getNumberofUnreadNotifications(){
    db.collection('all_Notifications').where('notification_status','==',"unread")
    .onSnapshot((snapshot)=>{
        var unreadNotifications = snapshot.docs.map((doc)=>doc.data())
        this.setState({
            value:unreadNotifications.length
        })
    })
}

componentDidMount(){
    this.getNumberofUnreadNotifications();
}

BellIconWithBadge=()=>{
        return(
          <View>
            <Icon name='bell' type='font-awesome' color='#696969' size={25}
              onPress={() =>this.props.navigation.navigate('Notification')}/>
             <Badge
              value={this.state.value}
             containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
          </View>
        )
      }
    
      render(){
        return(
            <Header
              leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
              centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              rightComponent={<this.BellIconWithBadge {...this.props}/>}
              backgroundColor = "#eaf8fe"
            />
    
    )
    }
}