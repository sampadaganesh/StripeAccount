import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import StripeClient from './app/StripeClient/StripeClient';
import Root from './app/Root'
import ApplePayment from './app/scenes/ApplePayment';

const testApiKey = 'sk_test_vWFriLjhGdlN8neZyuEFhIT400B5KHgdha';

export default class App extends React.Component {
  constructor() {
    super();
    this.stripe = new StripeClient(testApiKey);
  }

  handlePayPressed = async card => {
    const token = await this.stripe.tokenizeCard({
      number: card.number,
      expMonth: card.mm,
      expYear: card.yy,
      cvc: card.cvc,
    });

    const cardTokenId = token.id;

    const customer = await this.stripe.createCustomer({
      email: 'sampada.ganesh@augmentolabs.com',
      source: cardTokenId,
    });
    
    const charge = await this.stripe.chargeCustomer({
      customer: customer.id,
      amount: 1000,
      currency: 'usd',
    });

    Alert.alert(charge.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <ApplePayment/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});