import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControl from '../../components/Burger/BurgerControl/BurgerControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import instanceOrder from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';

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
        ingredients : null,
        totalPrice : 55,
        orderReady : false,
        showModal : false,
        loading : false,
        error : false
    }
    componentDidMount(){
        instanceOrder.get('https://fireba-burgerapp.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients : response.data});
            })
            .catch(error => {
                this.setState({error : true});
            });
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
        this.setState({loading : true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : 'Hercival Aragon',
                address : {
                    lot : 22,
                    block : 16,
                    phase : 2,
                    subdivision : 'San Isdro Heights',
                    brgy : 'San Isidro',
                    municipal : 'Cabuyao',
                    prov : 'Laguna',
                    zip : 4025
                },
                email : 'hercivalaragon@gmail.com',
                deliveryMethod : 'fastest'
            }

        }
        instanceOrder.post('./orders.json', order).then(response => {
            this.setState({loading : false, showModal : false});
        }).catch(error => {
            this.setState({loading : false,  showModal : false});
        });
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
        let orderSummary = null ;
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ? <center><p>Cant Load the Ingredients! </p></center>:<Spinner /> ;
        if(this.state.ingredients){
            
            burger = (<Aux><Burger ingredients={this.state.ingredients}/>
                <BurgerControl 
                    ingredientAdd = {this.addIngredientHandler}
                    ingredientRemove = {this.removeIngredientHandler}
                    disablebutton = {ingredientInfo}
                    price = {this.state.totalPrice}
                    orderready = {this.state.orderReady}
                    showModalClick = {this.showModalhandler}
                /></Aux>);
            orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                totalprice = {this.state.totalPrice.toFixed(2)}
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
export default errorHandler(BurgerBuilder, instanceOrder);