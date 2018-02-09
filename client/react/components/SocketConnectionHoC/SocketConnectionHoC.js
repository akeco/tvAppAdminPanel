import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    addSocket
} from '../../redux/actions/index';

class SocketConnectionHoC extends Component{
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(){
        return false;
    }

    componentDidMount(){
        const {addSocket} = this.props;
        this.socket = io(document.location.host);
        addSocket(this.socket);
    }

    render() {
        return (
            <div>
                {
                    this.props.children
                }
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addSocket
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        socket: state.socket
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SocketConnectionHoC);
