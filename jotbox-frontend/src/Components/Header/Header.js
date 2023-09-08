import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'



const mapStateToProps = (state) => {
  // console.log(state)
  return {
    authenticated: state.authenticated
  }
}

const Header = (props) => {


  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  return (
    <div>
      <Navbar className='px-md-0 px-lg-5 py-3' expand='md' dark color='dark'>
        <NavbarBrand className='' href='/'>JotBox</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className='ms-auto' navbar>
            <NavItem className='mx-2'>
              <Link className='text-light text-decoration-none' to='/'>Chat</Link>
            </NavItem>
            <NavItem className='mx-2'>
              <Link className='text-light text-decoration-none' to='/about'>About</Link>
            </NavItem>
            <NavItem className='mx-2'>
              {props.authenticated ? <Link className='text-light text-decoration-none' to='/logout'>Logout</Link> : <Link className='text-light text-decoration-none' to='/signin'>Login</Link>}
            </NavItem>
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  )
}




export default connect(mapStateToProps)(Header)