import React, {Component} from 'react';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import { Grid } from 'react-flexbox-grid';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckIcon from 'material-ui-icons/Check';
import axios from 'axios';
import {
    addQuestion,
    changeActiveQuestion,
    changeDisabledDevicesState
} from '../../redux/actions/index'
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';


class ActivateQuestionList extends Component{
    constructor(props){
        super(props);
        this.state = {
            buttonState: false,
            time: 10,
        }
    }

    componentDidMount(){
        const {questions, currentDate, addQuestion, socket} = this.props;

        if(!questions.length){
            const getForDate = currentDate.format('l');

            axios.get(`${document.location.origin}/api/questions?filter[where][date]=${getForDate}`)
                .then((response)=>{
                    if(response.status == 200){
                        addQuestion(response.data);
                        socket.emit("send-question-limit", response.data.length);
                    }
                }).catch((error)=>{
                console.info("ERROR",error);
            });
        }
    }


    handleAction = (index, item) => {
        const {changeActiveQuestion, socket, disabledToDevices} = this.props;
        const time = new Date().getTime();
        console.info("Triggered", time);

        const formatedQuestion = {
            id: item.id,
            rightAnswer: item.rightAnswer,
            questionType: item.questionType,
            time,
            date: item.date,
            disableDevices: disabledToDevices
        };

        if(item.answer1 && item.answer2 && item.answer3 && item.answer4){
            formatedQuestion.answers = [
                item.answer1,
                item.answer2,
                item.answer3,
                item.answer4
            ];
        }

        socket.emit("activate", JSON.stringify(formatedQuestion));
        socket.emit("update-question-file", index+1);

        changeActiveQuestion(null);

        setTimeout(()=>{
            changeActiveQuestion(index + 1);
            clearInterval(this.counterInterval);
            socket.emit("reset-question-files");
            this.setState({
                time: 10
            });
        }, 10000);
        this.counterInterval = setInterval(()=>{
            this.setState({
                time: this.state.time - 1
            });
        }, 1000);
    };

    disableButtonFunction = (index) => {
        const {activeQuestion} = this.props;
        const {buttonState} = this.state;

        if(!buttonState && index != activeQuestion) return true;
        return false;
    };

    showTimeAndDetails = () => {
      const {questions, disabledToDevices, changeDisabledDevicesState} = this.props;
      if(questions && questions.length > 0){
         return (
             <div>
                 <FormControlLabel
                     control={
                         <Checkbox
                             checked={disabledToDevices}
                             onChange={()=>{
                                 changeDisabledDevicesState(!disabledToDevices);
                             }}
                             value="disabledDevices"
                         />
                     }
                     label="Iskljuci slanje prema mobilnim uređajima (backup server)"
                 />
                 <h4>Vrijeme: {this.state.time}</h4>
             </div>
         )
      }
    };


    render(){
        const {classes, questions} = this.props;

        return(
            <Grid>
                <Paper className={classes.root}>
                    <div>
                        {
                            this.showTimeAndDetails()
                        }
                        <ul style={style.ul}>
                            {
                                questions && questions.length > 0 && questions.map((item, index)=>{
                                    const disabledButton = this.disableButtonFunction(index);
                                    return (
                                        <Li key={item.id}>
                                            <p>{`${index+1}. ${item.rightAnswer}`}</p>
                                            <Button
                                                raised
                                                disabled={disabledButton}
                                                color="primary"
                                                className={classes.button}
                                                onClick={()=>{
                                                    this.handleAction(index, item);
                                                }}
                                            >
                                                <CheckIcon className={classes.leftIcon} />
                                                Send
                                            </Button>
                                        </Li>
                                    )
                                }) || (
                                    <div>
                                        <p>Trenutno nemate unesenih pitanja</p>
                                        <p>Da biste unijeli nova pitanja, idite na postavke</p>
                                    </div>
                                )
                            }
                        </ul>
                    </div>
                </Paper>
            </Grid>
        );
    }
};

const Li = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    &:last-child{
        margin-bottom: 0px;
    }
    p{
        margin: 0;
    }
    & > div{
        margin-left: auto;
    }
`;

const style = {
    li: {
        display: 'flex'
    },
    button: {
        marginLeft: 'auto'
    },
    ul: {
        padding: 0
    }
};

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    button: {
        marginLeft: 'auto'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});


const matchDispatchToProps = (dispatcher) => {
    return bindActionCreators({
        addQuestion,
        changeActiveQuestion,
        changeDisabledDevicesState
    }, dispatcher);
};

const mapStateToProps = (state) =>{
    return ({
        questions: state.questions,
        currentDate: state.currentDate,
        activeQuestion: state.activeQuestion,
        socket: state.socket,
        disabledToDevices: state.disabledToDevices
    })
};

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(ActivateQuestionList));