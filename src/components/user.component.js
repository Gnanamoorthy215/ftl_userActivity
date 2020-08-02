import React from 'react';
import Popup from 'reactjs-popup';
import "../css/user.css";

import ModalContent from './modalContent.component';

// User component displaying individual User details

class User extends React.Component{
    state ={
        show:false //state to toogle Modal
    };

    showModal = e => {
        this.setState({
          show: !this.state.show // Toggling the state onClick
        });
    };

    render(){
        const { id ,real_name,tz ,activity_periods} = this.props; 
        return(
            <div>
                <div className="user">
                    <div className="user-field">{real_name}</div>
                    <div className="user-field">{id}</div>
                    <div className="user-field">{tz}</div>
                    <div className="user-field">
                        <button onClick={e => {this.showModal();}}> Activity </button>
                    </div>
                    <ModalContent onClose={this.showModal} show = {this.state.show} activity ={activity_periods} name={real_name}></ModalContent>
                    {/* In the above lines of code showModal function is passed down as props to Modal component
                            so as to Change the state to toogle the Modal */}
                </div>

                <div>
                </div>
            </div>
            
        )
    }
}

export default User;