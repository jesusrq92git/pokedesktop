import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const sName = {
    'position': 'absolute',
    'right': '20px',
    'color': 'white'
}

const sLink = {
    'padding': '0px 10px'
}

const handleLogout = () => {
    alert("Vuelve pronto!");
    localStorage.removeItem('state');
    window.location.href='/';
}

const NavBar = (props) => {
    return(
        <div>
            <Navbar className={'navbar'}>
                <Link style={sLink} to="/">Home</Link>
                <Link style={sLink} to="/list">List</Link>
                <Link style={sLink} to="/about">About</Link>
                {
                    !!props.homeReducer.name 
                    ? (
                        <p style={sName}>User: {props.homeReducer.name}</p>
                    ) : ''
                }
                {
                    !!props.homeReducer.name 
                    ? (
                        <Link style={sLink} to="/" onClick={handleLogout}>Logout</Link>
                    ) : ''
                }
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    homeReducer: state.homeReducer
});

export default connect(
    mapStateToProps,
    null
)(NavBar);