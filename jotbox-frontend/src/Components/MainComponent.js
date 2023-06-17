import React from 'react'
import { connect } from 'react-redux'
import Body from './Client/Body/Body'
import Test from './Client/Body/Test'

export const MainComponent = (props) => {
    return (
        <div>
            {/* <Body /> */}
            <Test />
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)