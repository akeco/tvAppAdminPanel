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


class UsersManagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3000/api/UserModels?filter=[WHERE][emailVerified]=false").then((response)=>{
            if(response.status == 200){
                console.info("FETCH USERS", response);
                if(response.data && response.data.length){
                    this.setState({
                        users: response.data
                    })
                }
            }
        }).catch((error)=>{
            console.info("FETCH USERS ERROR", error);
        })
    }

    render(){
        const {classes} = this.props;
        const {users} = this.state;

        return(
            <Grid>
                <Paper className={classes.root}>
                    <div>
                        <ul className={classes.list}>
                            {
                                users.map((item)=>{
                                    return(
                                        <li className={classes.li}>
                                            {
                                                item.avatarURL && <img src={item.avatarURL} className={classes.avatar} />
                                            }
                                            <p className={classes.username}>{item.username}</p>
                                            <Button
                                                raised
                                                color="primary"
                                                className={classes.button}
                                                onClick={()=>{
                                                    //this.handleAction(index, item);
                                                }}
                                            >
                                                <CheckIcon className={classes.leftIcon} />
                                                Odobri
                                            </Button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </Paper>
            </Grid>
        );
    }
};


const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        overflow: 'hidden'
    }),
    button: {
        marginLeft: 'auto',
        height: '100%'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 3,
        objectFit: 'cover'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    list: {
        listStyle: 'none',
        paddingLeft: 0
    },
    li: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        backgroundColor: '#1976D2',
        marginLeft: -24,
        marginRight: -24,
        marginTop: -16,
        marginBottom: 30,
        padding: 15,
        color: 'white',
        textTransform: 'uppercase'
    },
    username: {
        alignSelf: 'flex-start',
        marginTop: 0,
        marginLeft: 20
    }
});


const mapStateToProps = (state) =>{
    return ({
        questions: state.questions,
        currentDate: state.currentDate,
        activeQuestion: state.activeQuestion,
        socket: state.socket,
    })
};

export default connect(mapStateToProps)(withStyles(styles)(UsersManagement));