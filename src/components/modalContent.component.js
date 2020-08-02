import React from "react";
import "../css/modal.css";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";

class Modal extends React.Component{
    state={
        username :null,
        user_activity :[],
        selectedDate:null
    };

    componentDidMount(){
        this.setState({username :this.props.name})
        this.setState({user_activity :this.props.activity})
    }

    onClose = e => {
        console.log(e);
        this.props.onClose && this.props.onClose(e);
    };

    handleDateChange(date){
        this.setState({selectedDate:date})
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
                <div className ="content">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            fullWidth
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Please Pick A Date to view Activity"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
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