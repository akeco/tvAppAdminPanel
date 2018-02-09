import React, {Component} from 'react';
import styled from 'styled-components';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';


class RadioForm extends Component{
    constructor(props){
        super(props);
    }


    onRadioChange = (event) => {
        this.setState({
            rightAnswer: event.target.value
        });
    };

    render(){
        const {classes, handleChange, rightAnswer, answer1, answer2, answer3, answer4} = this.props;

        return (
            <div>
                <p className={classes.title}>Unesi odgovore</p>
                <div className={classes.textFieldsBlock}>
                    <TextField
                        name="answer1"
                        label="A. Prvi odgovor*"
                        onChange={handleChange}
                        value={answer1}
                        margin="normal"
                    /><br/>
                    <TextField
                        name="answer2"
                        label="B. Drugi odgovor*"
                        onChange={handleChange}
                        value={answer2}
                        margin="normal"
                    /><br/>
                    <TextField
                        name="answer3"
                        label="C. Treci odgovor*"
                        onChange={handleChange}
                        value={answer3}
                        margin="normal"
                    /><br/>
                    <TextField
                        name="answer4"
                        label="D. Cetvrti odgovor*"
                        onChange={handleChange}
                        value={answer4}
                        margin="normal"
                    />
                </div>
                <p className={classes.title}>Oznaci tacan odgovor</p>
                <FormControl component="fieldset" required className={classes.formControl}>
                    <RadioGroup
                        name="radioAnswer"
                        className={classes.group}
                        value={rightAnswer}
                        onChange={handleChange}
                    >
                        <FormControlLabel className={classes.radio} value="a" control={<Radio />} label="A" />
                        <FormControlLabel className={classes.radio} value="b" control={<Radio />} label="B" />
                        <FormControlLabel className={classes.radio} value="c" control={<Radio />} label="C" />
                        <FormControlLabel className={classes.radio} value="d" control={<Radio />} label="D" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    title: {
        marginBottom: 0,
        paddingLeft: 15,
        fontSize: 14,
        fontWeight: 500,
        textTransform: 'uppercase'
    },
    root: {
        display: 'flex',
    },
    formControl: {
        marginBottom: theme.spacing.unit * 3,
        marginLeft: 15,
        marginRight: 0,
        marginTop: 10
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        flexDirection: 'row'
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
        alignItems: 'center',
        alignSelf: 'center'
    },
    button: {
        position: 'relative',
        top: 20
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    textFieldsBlock: {
        marginLeft: 15,
        marginBottom: 40
    }
});


const mapStateToProps = (state) =>{
    return ({
        questions: state.questions
    })
};

export default connect(mapStateToProps)(withStyles(styles)(RadioForm));