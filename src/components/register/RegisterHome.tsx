import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { RegisterButton, RegisterContainer } from "../../styles/styles";
import GoogleImage from "../../images/icons8-google-18.png";

interface RegisterHomeType {
  onViewForm: (isVisible: boolean) => void;
}

const RegisterHome = ({ onViewForm }: RegisterHomeType) => {
  return (
    <RegisterContainer>
      <RegisterButton
        variant="outlined"
        startIcon={<EmailOutlinedIcon />}
        onClick={() => onViewForm(true)}
      >
        Continue with Email
      </RegisterButton>
      <RegisterButton
        variant="outlined"
        startIcon={<img src={GoogleImage} alt="icon" />}
      >
        Continue with Gmail
      </RegisterButton>
    </RegisterContainer>
  );
};

export default RegisterHome;
