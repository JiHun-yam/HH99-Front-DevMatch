import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import MainLogo from '../Style/Img/MainLogo.png'
import MainLogo2 from '../Style/Img/MainLogo2.png'
import Cookies from 'js-cookie'




function Header() {

    const navigate = useNavigate()
    const GoToHome = () => { navigate('/') }
    const MoveToLoginup = () => { navigate('/login') }

    return (
        <HeaderSize >
            <HeaderNavbar>
                {/* 이미지 들어갈 자리입니다 */}
                <HeaderMainLogo >
                    <img src={MainLogo} onClick={GoToHome} />
                </HeaderMainLogo>
                <ul>
                    <StyledLink to='/'>Home</StyledLink>
                    <StyledLink to='mypage' >Mypage</StyledLink>
                    <StyledLink to='login'>LogIn</StyledLink>
                    <li >LogOut</li>
                </ul>
            </HeaderNavbar>
        </HeaderSize >
    )
}
export default Header
const HeaderSize = styled.div`
    width: 50rem;
    height: 3.8125rem;
    border-bottom-left-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    box-shadow: rgba(0, 0, 0, 0.15) 3.95px 3.95px 8.6px 8.6px;
    margin: 0 auto;
    color: #000;
    font-family: 800;
    background: transparent;
   
`;
const HeaderNavbar = styled.div`
    width: 85%;
    height: 100%;
    margin: auto;
    padding: 1.875rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.25rem;
    
    > div {
        width: 7.5rem;
        cursor: pointer;
    }
    > ul {
        list-style: none;
        display: flex;
        gap: 1.875rem;
        position: relative;
    };
    > Link {
        border-radius: 20px;
        list-style: none;
        text-decoration: none;
        color: red;
        position: relative;
    };
    > li {
        border-radius: 20px;
        list-style: none;
        text-decoration: none;
        color: black;
        position: relative;
    }
    > a {
        text-decoration: none;
        color: #000;
        text-transform: uppercase;
    }
`;

const HeaderMainLogo = styled.div`
    width: 100px;
    height: 50px;
    background: url(${(props) => props.Logo});
    background-position: center;
    background-size: cover; 
    position: relative;
    > img {
        width: 200px;
        position: absolute;
        top: -45px;
        z-index: 5;
    }
`
const StyledLink = styled(Link)`
    position: relative;
    color: #000;
    text-align: center;
    text-decoration: none;
    &:hover {
    top: -5px;
    border-bottom: 1px solid #000;
    cursor: pointer;
    transition: 0.2s ease;
    }
    &:active {
    filter: brightness(50%);
  };

`