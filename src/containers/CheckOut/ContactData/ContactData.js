import React, {Component} from 'react';
//import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionCreator from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm: {
            name : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched :false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Street'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched :false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched :false
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Zip Code'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched :false
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type: 'email',
                    placeholder : 'Your Email Address'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail: true
                },
                valid : false,
                touched :false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options: [
                        { value : 'fastest' , displayValue : 'Fastest'},
                        { value : 'cheapest' , displayValue : 'Cheapest'}
                    ] 
                },
                value : 'fastest',
                validation : {},
                valid : true
            },
        },
        formIsValid : false
    }
    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength && isValid){
            isValid = value.length >= rules.minLength  && isValid
        }
        if(rules.maxlength && isValid){
            isValid = value.length <= rules.maxLength  && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    orderhandler = (event) => {
        event.preventDefault();
 
        const formData = {};

        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value
        }
        const orders = {
            ingredients : this.props.ings,
            price : this.props.tprice,
            orderData : formData

        }
        this.props.onOrderBurger(orders);
        
    }
    inputChangeHandler = (event, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = { 
            ...updateOrderForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.touched = true;
        updateFormElement.valid = this.checkValidity(updateFormElement.value , updateFormElement.validation);
        
        updateOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm : updateOrderForm, formIsValid : formIsValid});
    }
    render(){
        const formsElementArray = [];
        for(let key in this.state.orderForm){
            formsElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            });
        }

        let formElements = formsElementArray.map(el => {
            return (
                <Input key={el.id} 
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig} 
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={(event) => this.inputChangeHandler(event, el.id)}/>
            );
        });
        let form = (
            <form onSubmit={this.orderhandler}>
                {formElements}
                <Button 
                    eventHandler={this.orderhandler}
                    myclassname="Success"
                    disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.bbrreducer.ingredients,
        tprice : state.bbrreducer.totalPrice,
        loading : state.orderreducer.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData) => dispatch(actionCreator.purchaseBurger(orderData))
    }
}
//export default withRouter(ContactData);
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));