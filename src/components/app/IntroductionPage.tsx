import IntroductionImage from '../../assets/introduction_img.png';
import enterButton from '../../assets/intro-enter.png';
import { useNavigate } from 'react-router-dom';

const IntroductionPage = () => {
  const navigate = useNavigate();

  return (
<div>
      {/* Background Image */}
      <img
        src={IntroductionImage}
        alt="Introduction Image"
        style={{ margin: "0px", padding: "0px", width: "100%", height: "100vh" }}
      />

      {/* Arrow Button */}
      <img
        src={enterButton}
        alt="Next"
        style={{ position: "absolute", bottom: "7vh", right: "19vw", cursor: "pointer", width: "11vw" }}
        onClick={() => navigate("/chant")} // Navigate to ChantPage when clicked
      />
    </div>

  );
};

export default IntroductionPage;
