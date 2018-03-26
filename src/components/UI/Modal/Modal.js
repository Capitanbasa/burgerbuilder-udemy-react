import React , { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Modal.css';
class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render(){
        return (
            <Aux>
                <div 
                    className={classes.Modal} 
                    style={{ 
                        transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity : this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
                <Backdrop show = {this.props.show} hideModal={this.props.backdrophide}/>
            </Aux>
        );
    }
}
export default Modal;