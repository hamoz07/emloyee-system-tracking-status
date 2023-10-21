import { useNavigate, } from 'react-router-dom';
import logo from '../assets/crm-logo.png'
import { Link } from 'react-router-dom';

const Nav = ({isHome}) => {
    const Navigate = useNavigate()
  return (
  <nav>
    <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="crm-logo" />
      </Link>
    </div>
    <div className="controls">
      {isHome 
      ? 
        <div className="icon" onClick={()=>Navigate("/ticket")}>&#43;</div>:
        ""
        }
        <div className="icon" onClick={()=>Navigate(-1)}>
          &#706;&#706;
        </div>
    </div>
  </nav>
  
  );
};

export default Nav;
