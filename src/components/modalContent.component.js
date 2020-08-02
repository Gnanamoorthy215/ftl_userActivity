import React from "react";
import "../css/modal.css";

class Modal extends React.Component{
    state={
        username :'',
        user_activity :[]
    };

    componentDidMount(){
        this.setState({username :this.props.name})
        this.setState({user_activity :this.props.activity})
    }

    onClose = e => {
        console.log(e);
        this.props.onClose && this.props.onClose(e);
    };


    render(){
        if(!this.props.show){
            return null;
        }
        return(
            <div className="modal">
                <div className="header">
                    <div> User : {this.state.username}</div>
                </div>
                <div className ="content">Recent Activities
                    {this.state.user_activity.map(i => <div>{i.start_time}</div>)}
                </div>

                <div className="actions">
                    <button onClick={e => {this.onClose(e);}}>Close</button>
                </div>
            </div>
        )
    }
}
export default Modal;