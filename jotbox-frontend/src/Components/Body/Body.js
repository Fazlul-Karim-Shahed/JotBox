import React from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router'
import About from './About'
import Signin from './Signin'
import Signup from './Signup'
import Logout from './Logout'
import Chat from './Chat'


const mapStateToProps = (state) => {


  return {
    role: state.role
  }
}


const Body = (props) => {


  // let admin = ''

  // if (props.role === 'admin') {
  //   admin =
  //     <Route path='/admin-panel'>
  //       <Route path='' element={<Admin />} />
  //       <Route path='second-admin' element={<h1 className='text-center'>Welcome to second admin page</h1>} />
  //       <Route path='third-admin' element={<h2 className='text-center'>Another third admin page</h2>} />
  //     </Route>
  // }


  return (
    <div>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<h1>Sorry page not found</h1>} />
        {/* {admin} */}
      </Routes>

    </div>
  )
}



export default connect(mapStateToProps)(Body)