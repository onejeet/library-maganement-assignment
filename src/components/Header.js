import React from "react";
import { Link } from "react-router-dom";

const FontAwesome = require('react-fontawesome');

const Header = (props) => {

    return (
        <header className="head">
            <div className="branding">
                <FontAwesome
                    className='super-crazy-colors'
                    name='superpowers'
                    size='2x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
                <span className="branding_title">Libra</span>
            </div>
            <nav className="navigation">
                <Link to="/">Library</Link>
                {
                    props.isAuthenticated &&
                    <Link to="/mybooks">My Books</Link>
                }
                {
                    props.isAuthenticated ?
                    <a onClick={props.logout}>
                        <FontAwesome
                            className='auth-icon'
                            name='sign-out'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                        <span>Logout {props.userInfo.username}</span>
                    </a>
                    :
                    <Link to="/login">
                        <FontAwesome
                        className='auth-icon'
                        name= 'sign-in'
                        style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)' }}
                        />
                        <span>Login</span>
                    </Link>
                }
                <a onClick = {props.updateTheme} className="theme-icon" title="Change Theme">
                    <FontAwesome
                        name= {props.lightTheme ? 'moon-o' : 'sun-o'}
                        style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)' }}
                    />
                </a>
            </nav>
        </header>
    );
}

export default Header;