import React, {Component} from 'react';
import List, { ListItem } from 'material-ui/List';
import { NavLink } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addLoginUser} from '../../redux/actions/index';

class Header extends Component{
  constructor(props){
      super(props);
  }

  logout = () => {
      const {addLoginUser} = this.props;
      addLoginUser(null);
      this.props.history.push("/login");
  };

  render(){
      const {classes, authorized} = this.props;
      if(authorized && authorized.token) return (
          <div className={classes.root}>
              <Grid>
                  <List style={style.list}>
                      <ListItem className={classes.listItem} button>
                          <NavLink to="/" exact={true} className={classes.link} activeClassName={classes.activeClassName}>Pitanja</NavLink>
                      </ListItem>
                      <ListItem className={classes.listItem} button>
                          <NavLink to="/postavke" className={classes.link} activeClassName={classes.activeClassName}>Postavke Pitanja</NavLink>
                      </ListItem>
                      <ListItem className={classes.listItem} button>
                          <NavLink to="/users" className={classes.link} activeClassName={classes.activeClassName}>Upravljanje Korisnicima</NavLink>
                      </ListItem>
                      <ListItem
                          className={classes.rightListItem}
                          onClick={this.logout}
                          button
                      >
                          <p className={classes.customLink}>Logout</p>
                      </ListItem>
                  </List>
              </Grid>
          </div>
      );
      return null;
  }
};


const style = {
    list: {
        display: 'flex',
        padding: 0
    }
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary[500]
    },
    listItem: {
        padding: 0,
        fontSize: 14
    },
    rightListItem: {
        padding: 0,
        marginLeft: 'auto',
        fontSize: 14
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        padding: 16
    },
    customLink: {
        color: 'white',
        textDecoration: 'none',
        padding: '0 16px'
    },
    activeClassName: {
        backgroundColor: theme.palette.primary[600]
    }
});

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

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Header)));
