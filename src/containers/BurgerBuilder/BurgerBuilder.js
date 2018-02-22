import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControl from '../../components/Burger/BurgerControl/BurgerControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad : 15.5,
    cheese : 20.09,
    meat : 25.01,
    bacon : 25.8
}
class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 55,
        orderReady : false,
        showModal : false
    }
    updateOrderReady(ingredients){
        const sum = Object.keys(ingredients).map((iKeys) => {
            return ingredients[iKeys];
        }).reduce((sum, el ) => {return sum + el},0);
        this.setState({orderReady : sum > 0})
    }
    addIngredientHandler = (type) => {
        const currentCount = this.state.ingredients[type];
        const newCount = currentCount + 1;
        const UpdatedIngredient = {
            ...this.state.ingredients
        }

        UpdatedIngredient[type] = newCount;
        const additionalPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + additionalPrice;

        this.setState({totalPrice : newPrice, ingredients :UpdatedIngredient });
        this.updateOrderReady(UpdatedIngredient);
    }
    removeIngredientHandler = (type) => {
        const currentCount = this.state.ingredients[type];
        if(currentCount <= 0){
            return;
        }
        const newCount = currentCount - 1;
        const UpdatedIngredient = {
            ...this.state.ingredients
        }

        UpdatedIngredient[type] = newCount;
        const additionalPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - additionalPrice;

        this.setState({totalPrice : newPrice, ingredients :UpdatedIngredient });
        this.updateOrderReady(UpdatedIngredient);
    }
    showModalhandler = () => {
        this.setState({showModal : true});
    }
    hideModalHandler = () => {
        this.setState({showModal : false});
    }
    checkoutHandler = () => {
        alert('You Successfully Purchase a Burger');
        return false;
    }

    render(){
        const ingredientInfo = {
            ...this.state.ingredients
        }
        for (let key in ingredientInfo){
            ingredientInfo[key] = ingredientInfo[key] <= 0
        }
        if(this.state.showModal) {
            
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControl 
                    ingredientAdd = {this.addIngredientHandler}
                    ingredientRemove = {this.removeIngredientHandler}
                    disablebutton = {ingredientInfo}
                    price = {this.state.totalPrice}
                    orderready = {this.state.orderReady}
                    showModalClick = {this.showModalhandler}
                />
                <Modal show = {this.state.showModal} backdrophide = {this.hideModalHandler}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        totalprice = {this.state.totalPrice.toFixed(2)}
                        checkout = {this.checkoutHandler}
                        cancelevent={this.hideModalHandler}/>
                </Modal>
                
            </Aux>
        );
    }
}
export default BurgerBuilder;