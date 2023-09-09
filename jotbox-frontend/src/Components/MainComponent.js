import React from 'react'
import { connect } from 'react-redux'
import Body from './Body/Body'
import Header from './Header/Header'
import { AUTHENTICATED } from '../Redux/ActionTypes'
import { checkAuth } from '../Function/AuthFunctions'
// import Footer from './Footer/Footer'


const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken
    }

}


const MainComponent = (props) => {


    props.dispatch(AUTHENTICATED)
    if (checkAuth() && props.decodedToken._id != undefined) {

        if ("Notification" in window) {
            Notification.requestPermission().then(data => {
                console.log(data)
            })
        }

    }

    return (
        <div>
            <Header />
            <Body />
            {/* <Footer /> */}
        </div>
    )
}



export default connect(mapStateToProps)(MainComponent)