import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import styled from 'styled-components';
import CloseIcon from 'material-ui-icons/Close';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {
    addQuestion,
} from '../../redux/actions/index'

class ManageQuestionList extends Component{
    constructor(props){
        super(props);
    }

    removeItem = (item) => {
        const {authorized, addQuestion, currentDate} = this.props;
        axios.delete(`${document.location.origin}/api/questions/${item.id}?access_token=${authorized.token}`)
            .then((response) => {
                if(response.status == 200){
                    axios.get(`${document.location,origin}/api/questions?filter[where][date]=${currentDate.format('l')}`)
                        .then((response)=>{
                            if(response.status == 200){
                                addQuestion(response.data);
                            }
                        }).catch((error)=>{
                        console.info("ERROR",error);
                    });
                }
            }).catch((error)=>{
                console.info("DELETE ERROR", error);
        });
    };

    render(){
        const {classes, questions} = this.props;
        return(
            <Paper className={classes.root}>
                <div>
                    <ul style={style.ul}>
                        {
                            questions.map((item, index)=>{
                                return (
                                    <Li key={item.id}>
                                        <p>{`${index+1}. ${item.rightAnswer}`}</p>
                                        <Button
                                            raised
                                            color="accent"
                                            className={classes.button}
                                            onClick={()=>{
                                                this.removeItem(item);
                                            }}
                                        >
                                            <CloseIcon className={classes.leftIcon}/>
                                            Remove
                                        </Button>
                                    </Li>
                                )
                            })
                        }
                    </ul>
                </div>
            </Paper>
        )
    }
}


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

const matchDispatchToProps = (dispatcher) => {
    return bindActionCreators({
        addQuestion,
    }, dispatcher);
};


const mapStateToProps = (state) =>{
    return ({
        questions: state.questions,
        authorized: state.authorized,
        currentDate: state.currentDate,
    })
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

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(ManageQuestionList));