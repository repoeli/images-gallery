import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';

const navbarStyle = {
    backgroundColor: 'lightblue',
    padding: '10px',
};

const Header = (props) => {
        return (
            <Navbar style={navbarStyle} expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="/">{props.title}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>           
            </Navbar>
        );
    }

    export default Header;
// This code defines a Header component using React and React Bootstrap.