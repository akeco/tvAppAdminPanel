import React, {Component} from 'react';
import axios from 'axios';
import LoginPage from '../LoginPage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addLoginUser} from '../../redux/actions/index';
import {withRouter} from 'react-router';

class AuthorizationComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            logged: null
        }
    }

    componentDidMount(){
        const {addLoginUser, authorized} = this.props;
        const token = authorized && authorized.token || localStorage.getItem("quizApp") && JSON.parse(localStorage.getItem("quizApp"))['token'];
        const user = authorized && authorized.id || localStorage.getItem("quizApp") && JSON.parse(localStorage.getItem("quizApp"))['id'];
        if(token){
            axios.get(`${document.location.origin}/api/Users/${user}/accessTokens/${token}`)
                .then((response)=>{
                console.info("RESPONSE", response);
                if(response.status == 200){
                    if(!authorized){
                        addLoginUser({
                            token: response.data.id,
                            id: response.data.userId
                        });
                    }
                    this.setState({
                        logged: true
                    });
                }
            }).catch((error)=>{
                console.info("ERROR", error);
                addLoginUser({
                    token: null
                });

                this.setState({
                    logged: false
                });
            });
        }
        else {
            addLoginUser({
                token: null
            });

            this.setState({
                logged: true
            });
        }
    }

    checkIfAuthorized = () => {
        const {logged} = this.state;
        if(logged === false) return <LoginPage/>;
        else if(logged) return this.props.children;
    };

    render(){
        return (
            <div>
                {
                    this.checkIfAuthorized()
                }
            </div>
        )
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addLoginUser
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        authorized: state.authorized
    }
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(AuthorizationComponent));