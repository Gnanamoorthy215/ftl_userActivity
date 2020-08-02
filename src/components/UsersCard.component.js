import React from "react";
import "../css/usersCard.css";

import User from './user.component';

class UsersCard extends React.Component{
    state = {
        listOfUsers :[]
    }

    componentDidMount() {
        fetch('https://run.mocky.io/v3/eaae7c09-a98d-4240-9c3e-f84bd89a91a5')
        .then(res => res.json())
        .then((data) => {
          this.setState({ listOfUsers: data.members })
          console.log("Users",this.state.listOfUsers)
        })
        .catch(console.log)
    }


    render(){
        return(
            <div className ="users">
                <h6>List of Available users</h6>
                {this.state.listOfUsers.map(i => <User{...i}></User>)}
                
            </div>
        )
    }
}

export default UsersCard;