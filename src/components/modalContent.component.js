import React from "react";
import "../css/modal.css";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from 'moment';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            user_activity: [], // state maintaining entire activity of the user
            selectedDate: null, // state to maintain selected Date 
            filteredActivity: [] // State to maintain the activity on the selected Date
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.setState({ username: this.props.name })
        this.setState({ user_activity: this.props.activity })
    }

    onClose = e => {
        console.log(e);
        this.props.onClose && this.props.onClose(e); //function to close the modal pop-up
    };

    handleDateChange(date) {
        this.setState({ filteredActivity: [] });
        let selectDate = date;
        let filtered=[];
        this.setState({ selectedDate: date });
        this.state.user_activity.forEach(i => {
            if (i) {
                i.st_time = moment(i.start_time, "MMM D YYYY hmA").format("MM/DD/YYYY");//formatting Date from String
                if (i.st_time == moment(selectDate).format("MM/DD/YYYY")) { //Checking if Activity Date matches Selected Date
                    filtered.push(i);//pushing the matched activity to new Array
                }
            }
        });
        this.setState({filteredActivity : filtered});//Setting the state with filtered Array
        console.log("formatted date", this.state.user_activity);
        console.log("filteredActivity", this.state.filteredActivity);
        console.log("selectDate", moment(selectDate).format("MM/DD/YYYY"));

    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal">
                <div className="header">
                    <div> User : {this.state.username}</div>
                </div>
                <div className="content">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            fullWidth
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Pick A Date to view Activity"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            disableOpenOnEnter
                            animateYearScrolling={false}
                            autoOk={true}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    {this.state.filteredActivity.map(i => {
                        return (
                            <div><span>Start time : {i.start_time}</span><br></br>
                                <span>End time : {i.end_time}</span> {/*populating Rows of user activities
                                                                    by iterating the list of activities on selected Date  */}
                            </div>
                        )
                    })}
                </div>

                <div className="actions">
                    <button onClick={e => { this.onClose(e); }}>Close</button>
                </div>
            </div>
        )
    }
}
export default Modal;