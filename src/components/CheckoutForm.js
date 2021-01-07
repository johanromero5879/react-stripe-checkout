import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"

const CheckoutForm = () => {

    const stripe = useStripe()
    const elements = useElements()

    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ type: '', message: '', show: false })

    const showAlert = (type, message) => {
        setAlert({ type, message, show: true })

        setTimeout(() => {
            setAlert({ type: '', message: '', show: false })
        }, 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        setLoading(true)

        if(!error){
            const { id } = paymentMethod
            const dollarsAmount = 100 //dollars as example

            try{
                const { data } = await axios.post("http://localhost:3001/api/checkout", {
                    id,
                    amount: dollarsAmount * 100 // dollars to centavos

                })

                console.log(data)

                elements.getElement(CardElement).clear()

                showAlert('alert-success', data.message)
            }catch(ex){
                const { message } = ex.response.data
                console.log("Error:", message)
                showAlert('alert-danger', message)
            }
            
        }else{
            console.log(error)
        }

        setLoading(false)
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

        <button className="btn btn-success" disabled={!stripe || loading}>
            { loading ? (
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            ) : "Buy"}
        </button><br/>
        
        {
            alert.show ? (
                <div className={`alert ${alert.type} text-center`} role="alert">
                    { alert.message }
                </div>
            ) : null
        }
        
    </form>
}

export default CheckoutForm