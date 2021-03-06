import React from 'react';
import { connect } from 'react-redux';
import {DateRangePicker} from 'react-dates'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) =>{
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = calendarFocused => this.setState({calendarFocused})

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }

    onSortChange = (e) => {
        if(e.target.value === 'date'){
            this.props.sortByDate();
        } else {
            this.props.sortByAmount();
        }
    }

    render(){
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextChange} />
                <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId="startDateId"
                    endDate={this.props.filters.endDate}
                    endDateId="endDateId"
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    showClearDates={true}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate),
        sortByAmount: () => dispatch(sortByAmount),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);