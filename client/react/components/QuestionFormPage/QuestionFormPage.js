import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withStyles } from 'material-ui/styles';
import {connect} from 'react-redux';
import ManageQuestionList from '../ManageQuestionList';

import Form from '../Form';

class QuestionFormPage extends Component{
    constructor(props){
        super(props);
    }

    componentDidCatch(error, info) {
        console.info("ERROR",error);
    }

    render(){
        const {classes, questions} = this.props;
        return(
            <Grid className={classes.grid}>
                <Paper className={classes.root}>
                    <Form/>
                </Paper>
                {
                    questions && questions.length > 0 && <ManageQuestionList/>
                }
            </Grid>
        );
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
    grid: {
        marginBottom: 40
    }
});

const mapStateToProps = (state) =>{
    return ({
        questions: state.questions
    })
};

export default connect(mapStateToProps)(withStyles(styles)(QuestionFormPage));