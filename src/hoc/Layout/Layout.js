import React , { Component }from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerOpenHandler = () => {
        //this.setState({showSideDrawer: !this.state.showSideDrawer});
        this.setState((prevState) => {
            return { showSideDrawer : !prevState.showSideDrawer};
        });
    }
    render(){
        return (
            <Aux>
                <Sidedrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler}/>
                <main className={classes.content}>{this.props.children}</main>
            </Aux>
        );
    }
    
}
export default Layout;