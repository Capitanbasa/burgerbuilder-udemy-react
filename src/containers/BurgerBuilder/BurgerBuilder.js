import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControl from '../../components/Burger/BurgerControl/BurgerControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionType from '../../store/actions';

import { connect } from 'react-redux';

class BurgerBuilder extends Component{
    state = {
        showModal : false,
        loading : false,
        error : false
    }
    componentDidMount(){
        // axios.get('https://fireba-burgerapp.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients : response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error : true});
        //     });
    }
    updateOrderReady(ingredients){
        const sum = Object.keys(ingredients).map((iKeys) => {
            return ingredients[iKeys];
        }).reduce((sum, el ) => {return sum + el},0);
        return sum > 0 ;
    }
    addIngredientHandler = (type) => {
        // const currentCount = this.state.ingredients[type];
        // const newCount = currentCount + 1;
        // const UpdatedIngredient = {
        //     ...this.state.ingredients
        // }

        // UpdatedIngredient[type] = newCount;
        // const additionalPrice = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + additionalPrice;

        // this.setState({totalPrice : newPrice, ingredients :UpdatedIngredient });
        // this.updateOrderReady(UpdatedIngredient);
    }
    removeIngredientHandler = (type) => {
        // const currentCount = this.state.ingredients[type];
        // if(currentCount <= 0){
        //     return;
        // }
        // const newCount = currentCount - 1;
        // const UpdatedIngredient = {
        //     ...this.state.ingredients
        // }

        // UpdatedIngredient[type] = newCount;
        // const additionalPrice = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - additionalPrice;

        // this.setState({totalPrice : newPrice, ingredients :UpdatedIngredient });
        // this.updateOrderReady(UpdatedIngredient);
    }
    showModalhandler = () => {
        this.setState({showModal : true});
    }
    hideModalHandler = () => {
        this.setState({showModal : false});
    }
    checkoutHandler = () => {
        this.props.history.push('/checkout');
    }

    render(){
        const ingredientInfo = {
            ...this.props.ings
        }
        for (let key in ingredientInfo){
            ingredientInfo[key] = ingredientInfo[key] <= 0
        }
        if(this.state.showModal) {
            
        }
        let orderSummary = null ;
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ? <center><p>Cant Load the Ingredients! </p></center>:<Spinner /> ;
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
        ings : state.ingredients,
        tprice : state.totalPrice
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ingrsname) => dispatch({type :actionType.ADD_INGREDIENT, payload : {'ingredientName': ingrsname}}),
        onRemoveIngredient : (ingrsname) => dispatch({type : actionType.REMOVE_INGREDIENT, payload : {'ingredientName': ingrsname}}),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));