import React, { useEffect } from 'react';
import axios from 'axios';

const PaypalButton = () => {
    // const cart = useSelector(state => state.cart);

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: function(data, actions) {
                    // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: '156',
                                    currency_code: 'USD'
                                }
                            }
                        ]
                    });
                },
                onApprove: function(data, actions) {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(function(details) {
                        // This function shows a transaction success message to your buyer.

                        console.log(
                            'Transaction completed by ' +
                                details.payer.name.given_name
                        );

                        return axios
                            .post('/api/transaction-complete', {
                                ...cart
                            })
                            .then(res => console.log(res))
                            .catch(e => console.log(e));
                    });
                }
            })
            .render('#paypal-button-container');

        return () => {
            try {
                document
                    .querySelector('#paypal-button-container')
                    .children[0].remove();
            } catch (e) {}
        };
    }, []);

    return <div id="paypal-button-container" />;
};

export default PaypalButton;
