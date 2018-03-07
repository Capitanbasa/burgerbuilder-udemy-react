import React, {Component} from 'react';
//import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import instanceOrder from '../../../axios-order';

class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading: false
    }
    orderhandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalprice,
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
            this.setState({loading : false });
            this.props.history.push('/');
        }).catch(error => {
            this.setState({loading : false });
        });
    }
    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Full Name" />
                <input className={classes.Input} type="email" name="email" placeholder="email@domain.com" />
                <input className={classes.Input} type="text" name="street" placeholder="Street Address" />
                <input className={classes.Input} type="text" name="postalcode" placeholder="Postal Code" />
                <Button eventHandler={this.orderhandler} myclassname="Success">ORDER</Button>
            </form>
        );
        if(this.state.loading){
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

//export default withRouter(ContactData);
export default ContactData;