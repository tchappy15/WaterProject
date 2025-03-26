import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";

function DonatePage() {
    const navigate = useNavigate();
    const {projectName} = useParams(); //use a parameter called projectName

    return (
        <>
        <WelcomeBand />
        <h2>Donate to {projectName}</h2>

        <div>
            <input type="number" placeholder="Enter donation amount" />
            <button onClick={() => navigate('/cart')}>Add to Cart</button>
        </div>
        
        <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    )
}

export default DonatePage;