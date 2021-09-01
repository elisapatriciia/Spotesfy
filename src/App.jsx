// import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import HomePages from './pages/HomePages/HomePages';
import { Nav, Navbar } from 'react-bootstrap';
import Favorite from './pages/Favorite/Favorite';
import DetailPage from './pages/DetailPage/DetailPage';


function App() {
  return (
  
    <div className="black-bg">
      <Router>
          <Navbar className="navbar" expand="lg" sticky="top" variant="dark">
            <Navbar.Brand href="#" className="white-text"> Spotesfy</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/" className="white-text">Home</Nav.Link>
                <Nav.Link as={Link} to="/favorite" className="white-text">Favorite</Nav.Link>
              </Nav>

            </Navbar.Collapse>
          </Navbar>
          
        <Switch>
          <Route path="/detail/:id/:artist">
            <DetailPage></DetailPage>
          </Route>
          <Route path="/favorite">
            <Favorite></Favorite>
          </Route>
          <Route path="/">
            <HomePages></HomePages>
          </Route>
        </Switch>

      </Router>  

    </div>
    

  )
}

export default App;