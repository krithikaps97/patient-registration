import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header({ hasPatients }:any) {
  return (
    <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="#form">Patient Registration App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#form">Form</Nav.Link>
            <Nav.Link href="#details" disabled={!hasPatients}>View Details</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;