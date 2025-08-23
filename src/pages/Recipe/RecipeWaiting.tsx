
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeWaiting.css";
import waitinglogo from "../../assets/waitinglogo.png"
import loader from "../../assets/loader.png"

export default function RecipeWaiting() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/recipe-detail');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
              <div className="loader-wrapper">
          <div className="circle-loader">
            <img src={loader} alt="loader" width="190" height="190" />
          </div>
        <div className="icon-container">
          <img src={waitinglogo} alt="waitinglogo" width="64" height="64" />
        </div>
      </div>

      <div className="center-content">
        <p>AEAO님을 위한 <br />
        레시피를 준비하고 있어요
        </p>
      </div>
    </div>
  );
}
