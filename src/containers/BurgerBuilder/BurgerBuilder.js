import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControl from '../../components/Burger/BurgerControl/BurgerControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionCreators from '../../store/actions/index';
import axios from '../../axios-order';

import { connect } from 'react-redux';

class BurgerBuilder extends Component{
    state = {
        showModal : false
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }
    updateOrderReady(ingredients){
        const sum = Object.keys(ingredients).map((iKeys) => {
            return ingredients[iKeys];
        }).reduce((sum, el ) => {return sum + el},0);
        return sum > 0 ;
    }

    showModalhandler = () => {
        this.setState({showModal : true});
    }
    hideModalHandler = () => {
        this.setState({showModal : false});
    }
    checkoutHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    }

    render(){
        const ingredientInfo = {
            ...this.props.ings
        }
        for (let key in ingredientInfo){
            ingredientInfo[key] = ingredientInfo[key] <= 0
        }
        let orderSummary = null ;
        let burger = this.props.error ? <center><p>Cant Load the Ingredients! </p></center>:<Spinner /> ;
        if(this.props.ings){
            
            burger = (<Aux><Burger ingredients={this.props.ings}/>
                <BurgerControl 
                    ingredientAdd = {this.props.onAddIngredient}
                    ingredientRemove = {this.props.onRemoveIngredient}
                    disablebutton = {ingredientInfo}
                    price = {this.props.tprice}
                    orderready = {this.updateOrderReady(this.props.ings)}
                    showModalClick = {this.showModalhandler}
                /></Aux>);
            orderSummary = <OrderSummary 
                ingredients = {this.props.ings}
                totalprice = {this.props.tprice.toFixed(2)}
                checkout = {this.checkoutHandler}
                cancelevent={this.hideModalHandler}/> ;
        }
        return(
            <Aux>
                <Modal show = {this.state.showModal} backdrophide = {this.hideModalHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.bbrreducer.ingredients,
        tprice : state.bbrreducer.totalPrice,
        error : state.bbrreducer.error
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ingrsname) => dispatch(actionCreators.addIngredients({'ingredientName': ingrsname})),
        onRemoveIngredient : (ingrsname) => dispatch(actionCreators.removeIngredients({'ingredientName': ingrsname})),
        onInitIngredients : () => dispatch(actionCreators.initIngredients()),
        onInitPurchased : () => dispatch(actionCreators.purchaseInit())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));