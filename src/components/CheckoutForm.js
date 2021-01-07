import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"

const CheckoutForm = () => {

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if(!error){
            const { id } = paymentMethod
            const dollarsAmount = 100 //dollars as example

            const { data } = await axios.post("http://localhost:3001/api/checkout", {
                id,
                amount: dollarsAmount * 100 // dollars to centavos

            })

            console.log(data)
        }else{

        }
    }

    return <form onSubmit={handleSubmit} className="card card-body">
        
        <img
         src="https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/8/8/889349589892_4.png" 
         alt="Rog monitor" 
         className="img-fluid"
        />

        <h4 className="text-center">Price: $100</h4>

        <div className="form-group">
            <CardElement className="form-control"/>
        </div>

        <button className="btn btn-success">Buy</button>
    </form>
}

export default CheckoutForm