import React from "react";
import "../css/usersCard.css";

import User from './user.component';

//  This is a container component that houses all the individual user components

class UsersCard extends React.Component{
    state = {
        listOfUsers :[] //State to maintain the users fetched from Mock API , 
                                                            //to be passed down as props to child User Component.
    }

    componentDidMount() {
        fetch('https://run.mocky.io/v3/eaae7c09-a98d-4240-9c3e-f84bd89a91a5') // Mock API
        .then(res => res.json())
        .then((data) => {
          this.setState({ listOfUsers: data.members }) // Changing the state of component with API data
          console.log("Users",this.state.listOfUsers)
        })
        .catch(console.log)
    }


    render(){
        return(
            <div className ="users">
                <h6>List of Available users</h6>
                {this.state.listOfUsers.map(i => <User{...i}></User>)} {/*populating user components for n users
                                                                            by iterating the list of users  */}
                
            </div>
        )
    }
}

export default UsersCard;