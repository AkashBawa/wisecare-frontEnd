import { useState } from "react";
import AxiosService from "./../../services/axios"
import localStorage from "../../services/localStorage";
import { useNavigate } from "react-router-dom";
// import AddPost from "./../elderly/addPost";
import IconLogo from "./../../images/logo.png";
import SignupImg from '../../images/group-seniors-park 1.png'
import React from 'react';
import { Input } from 'antd';
import { Select } from 'antd';
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";


function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [role, setRole] = useState();
  const [userName, setuserName] = useState();
  const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

  const submit = async () => {

    const data = await AxiosService.postRequest('signup', { email, password, role, userName });
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if (data.role == "elder") {
        navigate('/elder/profile')
      } else {
        navigate('/volunteer/profile')
      }
    }

  }

  return (
    <div className="Signup" id="landingpage">

<header className="">
                <div className="container">
                    <a href="#" className="branding">
                        <img src={IconLogo} alt="Description of the image" />
                    </a>
                    {/* <ul className="main-menu">
                        <li>
                            <a href="#">Seniors</a>
                        </li>
                        <li>
                            <a href="#">Volunteers</a>
                        </li>
                        <li>
                            <a href="#">Events</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul> */}
                    <div className="logsignup">
                        <Link to={"/login"} className="lightBtn">
                            {" "}
                            Login{" "}
                        </Link>
                        <Link to={"/signup"} className="darkBtn">
                            {" "}
                            Signup{" "}
                        </Link>
                    </div>
                    <a href="#" className="landingpage-hm" onClick={toggleMenu}>
                        <i>
                            <FaBars size={30} color="#fff" />
                        </i>
                    </a>
                </div>
            </header>
            {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

            <div className={`hambergurmenu-cont ${isMenuOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <a href="#land-seniors">Seniors</a>
                    </li>
                    <li>
                        <a href="#land-volunteer">Volunteers</a>
                    </li>
                    <li>
                        <a href="#land-events">Events</a>
                    </li>
                    <li>
                        <a href="#homeLink">Contact</a>
                    </li>
                    <Link to={"/login"} className="darkBtn">
                            {" "}
                            Login{" "}
                        </Link>
                </ul>
                <div className="logsignup">
                    <Link to={"/login"} className="lightBtn">
                        {" "}
                        Login{" "}
                    </Link>
                    <Link to={"/signup"} className="darkBtn">
                        {" "}
                        Signup{" "}
                    </Link>
                </div>
            </div>

      {/* <nav>
        <div className="signupHeader">
          <img src={IconLogo} alt="" />
          <div className="headerLinks">
            <li><a href="">Contact</a></li>
            <Link to="/login"><button className="darkBtn">Login</button></Link>
          </div>
        </div>
      </nav> */}


      <div className="main">
        <img className="signupImg" src={SignupImg} alt="" />


        <div className="formDiv">
          <h2>Signup</h2>
          <div className="signupForm">
            <label htmlFor="email">Email</label>
            <Input id="email" placeholder="email" onKeyUp={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="Password">Password</label>
            <Input type="password" onKeyUp={(e) => { setPassWord(e.target.value) }} id="Password" placeholder="Password" />
            <label htmlFor="role">Role</label>
            <select id="role" onChange={(e) => { setRole(e.target.value) }}>
              <option disabled selected> Choose one</option>
              <option value="elder">Elder</option>
              <option value="volunteer"> Volunteer</option>
            </select>
            {/* <Input onKeyUp={(e) => { setRole(e.target.value) }} id="role" placeholder="role" /> */}
            <label htmlFor="userName">User Name</label>
            <Input onKeyUp={(e) => { setuserName(e.target.value) }} id="userName" placeholder="userName" />
            <div className="btnDivSignUp">
              <button className="darkBtn" onClick={submit}>Submit</button>
              {/* <button className="darkBtn" onClick={submit}>Cancel</button> */}
            </div>

          </div>
          {/* <h2 id="loginUser">Already A User</h2>
          <Link to="/login"><button className="darkBtn">Login</button></Link> */}

        </div>
      </div>

    </div>
  );
}

export default Signup;