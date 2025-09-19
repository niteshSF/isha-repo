import FrontImage from '../assets/FrontImage.jpg';
import EnterButton from '../assets/Enter_Button.png';
import { Link, useNavigate } from 'react-router-dom';
import MeitY from '../assets/MeitY.png'
import Hyderabad_University from '../assets/University_of_Hyderabad.png'
import SamskritiFoundation from '../assets/samskritiFoundation.png'
import { IoHome } from "react-icons/io5"

const FirstPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/introduction");
  };

  const handleClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="relative w-screen h-screen bg-black flex justify-center items-center">
      <img 
        src={FrontImage} 
        alt="Front Image" 
        className="w-full h-full "
      />
      <div className="fixed bottom-[16%] right-[12%] h-[20%] cursor-pointer">
        <img 
          src={EnterButton} 
          alt="Enter Button" 
          className="h-full w-full object-contain "
          onClick={handleNavigate}
        />
      </div>
      <div className="fixed top-[2%] left-[2%] h-[-50%] w-[6%] cursor-pointer">
        <img src={MeitY} alt="MeitY" className="h-full w-full object-contain"
        onClick={() => handleClick("https://www.meity.gov.in/")} />
      </div>
      <div className="fixed top-[2%] left-[10%] h-[-8%] w-[6%] cursor-pointer">
        <img src={Hyderabad_University} alt="Hyderabad University" 
        className="h-full w-full object-contain"
        onClick={() => handleClick("https://sanskrit.uohyd.ac.in/")} />
      </div>

      {/* Home icon - it is required to go back to the home page where all the 3 upanishads were all together */} 
      <div className="fixed top-[6%] right-[17%] w-[3%] cursor-pointer">
        <Link to="https://test1.samskritifoundation.org/home/" style={{ color: "#fff" }}>
          <IoHome
            style={{
            height: "5vh",
            width: "auto",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            }}
          />
        </Link>
      </div>
      <div className="fixed top-[2%] right-[2%] h-[-8%] w-[11%] cursor-pointer">
        <img src={SamskritiFoundation} alt="Samskriti Foundation"
        className="h-full w-full object-contain"
        onClick={() => handleClick("https://samskritifoundation.org")} />
      </div>
    </div>
  );
};

export default FirstPage;
