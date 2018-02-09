import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';


const WriteForm = (props)=>{
    const {classes, handleChange, rightAnswer} = props;

    return (
        <div>
            <TextField
                name="textAnswer"
                label="Unesi odgovor"
                className={classes.textField}
                type="text"
                margin="normal"
                value={rightAnswer}
                onChange={handleChange}
            />
        </div>
    );
};


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginTop: 10,
        marginLeft: 15,
        width: 200,
    },
    menu: {
        width: 200,
    },
    title: {
        marginBottom: 0,
        paddingLeft: 15
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
});


const mapStateToProps = (state) =>{
    return ({
        questions: state.questions
    })
};

export default connect(mapStateToProps)(withStyles(styles)(WriteForm));