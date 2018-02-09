import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import LockIcon from 'material-ui-icons/Lock';
import axios from 'axios';
import {withRouter} from 'react-router';
import {
    addLoginUser
} from '../../redux/actions/index';

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleLogin = () => {
        const {email, password} = this.state,
            {addLoginUser} = this.props;

        axios.post(`${document.location.origin}/api/Users/login`, {
            email,
            password
        }).then((response)=>{
            console.info("RESPONSE", response);
            if(response.status == 200){
                addLoginUser({
                    id: response.data.userId,
                    token: response.data.id
                });

                localStorage.setItem("quizApp", JSON.stringify({
                    token: response.data.id,
                    id: response.data.userId
                }));
                this.props.history.push("/");
            }
        }).catch((error)=>{
            console.info("ERROR", error);
        });
    };

    handleChange = (event) => {
        switch(event.target.name){
            case 'email':
                this.setState({
                   email: event.target.value
                });
                break;
            case 'password':
                this.setState({
                    password: event.target.value
                });
                break;
        }
    };

    render(){
        const {classes, questions} = this.props,
            {email, password} = this.state;
        return(
            <Grid>
                <Paper className={classes.root}>
                    <TextField
                        name="email"
                        label="Email"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        onChange={this.handleChange}
                        value={email}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        onChange={this.handleChange}
                        value={password}
                    />
                    <Button
                        raised
                        color="primary"
                        className={classes.button}
                        onClick={this.handleLogin}
                    >
                        <LockIcon className={classes.leftIcon} />
                        Login
                    </Button>
                </Paper>
            </Grid>
        );
    }
};

const styles = theme => ({
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
        flexDirection: 'column',
        marginTop: 24,
        padding: 25,
        alignItems: 'center'
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
        left: -40,
        marginTop: 20
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addLoginUser
    }, dispatch)
};

const mapStateToProps = (state) =>{
    return ({
        questions: state.questions
    })
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(LoginPage)));