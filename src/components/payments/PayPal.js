import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id": "AeX1vxulwQ8suDor2aQQX9OmKoawiXKrVN1_3Lk8CSLO_9_EBmKZOoLMYEKnSbJSOVe6SB1DAN0vYn7l",
    currency: "USD",
    components: "buttons,funding-eligibility",
	"enable-funding": "venmo",
};
const inputs = {
    value: "1.99",
    cellPrice: "1.99",
    numCells: "2",
};

export default function PayPal( props ) {
    let totalPrice = parseFloat(props.cellPrice) * parseFloat(props.numCells);
    console.log("Total Price: ", totalPrice)
    
    return(
        
        <PayPalScriptProvider options={ initialOptions }>
            
            {/* VENMO BUTTON */}
            {/* should only render on mobile */}
            <PayPalButtons
                style={{
                  layout: 'vertical',
                  shape: 'pill',
                  color: '',
                }}
                fundingSource="venmo"
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: totalPrice.toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        props.onPaymentRecieved()
                    });
                }}
            />

            {/* PAYPAL BUTTON */}
            <PayPalButtons
                style={{
                  layout: 'vertical',
                  shape: 'pill',
                  color: '',
                }}
                fundingSource="paypal"
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: totalPrice.toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        props.onPaymentRecieved()
                    });
                }}
            />

            {/* PAY WITH CARD BUTTON */}
            <PayPalButtons
                style={{
                  layout: 'vertical',
                  shape: 'pill',
                  color: '',
                }}
                fundingSource="card"
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: inputs.value,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                        props.onPaymentRecieved()
                    });
                }}
            />
        </PayPalScriptProvider>
    )
}