import "bootswatch/dist/flatly/bootstrap.min.css"
import './App.css';

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "./components/CheckoutForm"

const stripePromise = loadStripe("pk_test_51I73NRCH5EheiQpvdVAHG7we8awrvcyRNTs0gGf6MD3RuN8EYJ5XORpDlecH2VI2A7B4q91DJNvybpUotMs5za6f00tZP8UqNZ")

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4"> 
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
