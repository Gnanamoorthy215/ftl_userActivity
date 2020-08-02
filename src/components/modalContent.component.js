import React from "react";
import "../css/modal.css";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { isDate } from "date-fns";
import moment from 'moment';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            user_activity: [],
            selectedDate: null,
            filteredActivity: []
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.setState({ username: this.props.name })
        this.setState({ user_activity: this.props.activity })
    }

    onClose = e => {
        console.log(e);
        this.props.onClose && this.props.onClose(e);
    };

    handleDateChange(date) {
        this.setState({ filteredActivity: [] });
        let selectDate = date;
        this.setState({ selectedDate: date });
        this.state.user_activity.forEach(i => {
            if (i) {
                i.st_time = moment(i.start_time, "MMM D YYYY hmA").format("MM/DD/YYYY");
                if (i.st_time == moment(selectDate).format("MM/DD/YYYY")) {
                    this.state.filteredActivity.push(i);
                }
            }
        });
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
                    {this.state.filteredActivity.map(i => <div><span>Start time : {i.start_time}</span>
                        <span>End time : {i.end_time}</span>
                    </div>)}
                </div>

                <div className="actions">
                    <button onClick={e => { this.onClose(e); }}>Close</button>
                </div>
            </div>
        )
    }
}
export default Modal;