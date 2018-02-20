import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    addQuestion,
    addCurrentDate,
    changeActiveQuestion
} from '../../redux/actions/index'
import CheckIcon from 'material-ui-icons/Check';
import RadioForm from '../RadioForm';
import WriteForm from '../WriteForm';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

const CustomDateButton = (props) => {
    return (
        <StyledButton onClick={props.onClick}>
            {props.value}
        </StyledButton>
    )
};

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            rightAnswer: '',
            open: false,
            questionType: '',
            confirm: false
        }
    }

    componentDidMount(){
        const {currentDate, addQuestion, questions} = this.props;

        if(!questions.length){
            const getForDate = currentDate.format('l');
            axios.get(`${document.location.origin}/api/questions?filter[where][date]=${getForDate}`)
                .then((response)=>{
                    console.info("RESPONSE",response);
                    if(response.status == 200){
                        addQuestion(response.data);
                    }
                }).catch((error)=>{
                console.info("ERROR",error);
            });
        }
    }

    saveQuestion = () => {
        const {questions, addQuestion, authorized, currentDate} = this.props,
            {answer1, answer2, answer3, answer4, rightAnswer, questionType} = this.state;
        var data = {};
        if(questionType === "choose"){
            data = {
                answer1,
                answer2,
                answer3,
                answer4,
                rightAnswer,
                questionType,
                date: currentDate.format('l')
            }
        }
        else if(questionType === "write"){
            data = {
                rightAnswer,
                questionType,
                date: currentDate.format('l')
            }
        }


        if(authorized.token && data){
            axios.post(`${document.location.origin}/api/questions?access_token=${authorized.token}`, {...data})
                .then((response)=>{
                console.info("SUCCESS", response);

                this.setState({
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    rightAnswer: '',
                });

                if(response.status == 200){
                    const getForDate = currentDate.format('l')

                    axios.get(`${document.location,origin}/api/questions?filter[where][date]=${getForDate}`)
                        .then((response)=>{
                            console.info("RESPONSE",response);
                            if(response.status == 200){
                                addQuestion(response.data);

                            }
                        }).catch((error)=>{
                        console.info("ERROR",error);
                    });
                }

            }).catch((error)=>{
                console.info("ERROR",error);
            });
        }
    };


    handleDateChange = (date) => {
        const {addCurrentDate, addQuestion, socket, changeActiveQuestion} = this.props;
        addCurrentDate(date);
        axios.get(`${document.location,origin}/api/questions?filter[where][date]=${date.format('l')}`)
            .then((response)=>{
                console.info("RESPONSE",response);
                if(response.status == 200){
                    addQuestion(response.data);
                    changeActiveQuestion(0);
                    socket.emit("create-question-files", response.data.length);
                }
            }).catch((error)=>{
                console.info("ERROR",error);
        });
    };


    handleChange = (event, value) => {
        switch (event.target.name){
            case 'answer1':
                this.setState({
                    answer1: event.target.value
                });
                break;
            case 'answer2':
                this.setState({
                    answer2: event.target.value
                });
                break;
            case 'answer3':
                this.setState({
                    answer3: event.target.value
                });
                break;
            case 'answer4':
                this.setState({
                    answer4: event.target.value
                });
                break;
            case 'radioAnswer':
                this.setState({
                    rightAnswer: event.target.value
                });
                break;
            case 'questionType':
                this.setState({
                    questionType: event.target.value
                });
            case 'textAnswer':
                this.setState({
                    rightAnswer: event.target.value
                });
                break;
        }
    };


    allowSaveButton = () => {
        const {questionType, answer1, answer2, answer3, answer4, rightAnswer} = this.state;
        if(questionType === "choose"){
            if(answer1 && answer2 && answer3 && answer4 && rightAnswer) return false;
            return true;
        }
        else if(questionType === "write"){
            if(rightAnswer) return false;
            return true;
        }
        else return true;
    };


    handleClickOpen = () => {
        this.setState({ open: true });
    };


    handleClose = () => {
        this.setState({ open: false });
    };


    showValidForms = () =>{
        const {questionType, confirm} = this.state;
            if (confirm && questionType && (questionType === 'choose')) return <RadioForm handleChange={this.handleChange} {...this.state} />
            else if (confirm && questionType && (questionType === 'write')) return  <WriteForm handleChange={this.handleChange} {...this.state} />
    };


    render(){
        const {classes, currentDate} = this.props;
        const disableButton = this.allowSaveButton();

        return(
            <div className={classes.rows}>
                <div className={classes.row}>
                    <Button onClick={this.handleClickOpen} className={classes.dialogButton}>Izaberi vrstu pitanja</Button>
                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        <DialogTitle>Izaberi vrstu pitanja</DialogTitle>
                        <DialogContent>
                            <form className={classes.container}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">Vrsta pitanja</InputLabel>
                                    <Select
                                        name="questionType"
                                        value={this.state.questionType}
                                        onChange={this.handleChange}
                                        input={<Input name="age" id="age-simple" />}
                                    >
                                        <MenuItem value={'choose'}>Izaberi odgovor</MenuItem>
                                        <MenuItem value={'write'}>Dopuni odgovor</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>{
                                this.handleClose();
                                this.setState({
                                    rightAnswer: ''
                                });
                            }} color="primary">
                                Cancel
                            </Button>

                            <Button onClick={()=>{
                                this.handleClose();
                                this.setState({
                                    confirm: true,
                                    rightAnswer: ''
                                });
                            }} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {
                        this.showValidForms()
                    }
                </div>
                <div className={classes.row}>
                    <p className={classes.descriptionTitle}>Datum Prikazivanja</p>
                    <DatePicker
                        customInput={<CustomDateButton />}
                        selected={currentDate}
                        onChange={this.handleDateChange}
                    />
                </div>
                <div className={classes.buttonRow}>
                    <Button
                        raised
                        color="primary"
                        className={classes.button}
                        onClick={this.saveQuestion}
                        disabled={disableButton}
                    >
                        <CheckIcon className={classes.leftIcon} />
                        Save
                    </Button>
                </div>
            </div>
        );
    }
}

const StyledButton = styled.button`
    font-size: 14px !important;
    background-color: transparent;
    padding: 9px;
    cursor: pointer;
    border-radius: 2px;
`;

const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    title: {
        marginBottom: 0
    },
    root: {
        display: 'flex',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    radio: {
        marginRight: 25
    },
    rows: {
        display: 'flex'
    },
    row: {
        flexGrow: 1
    },
    buttonRow: {
        flexGrow: 1,
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    dialogButton: {
        position: 'relative',
        top: 3
    },
    descriptionTitle: {
        fontSize: 14,
        fontWeight: 500,
        textTransform: 'uppercase'
    }
});

const matchDispatchToProps = (dispatcher) => {
    return bindActionCreators({
        addQuestion,
        addCurrentDate,
        changeActiveQuestion
    }, dispatcher);
};

const mapStateToProps = (state) =>{
    return ({
        questions: state.questions,
        authorized: state.authorized,
        currentDate: state.currentDate,
        socket: state.socket,
    })
};

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Form));