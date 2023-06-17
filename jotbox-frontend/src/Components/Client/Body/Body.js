import React from 'react'
import { connect } from 'react-redux'

export const Body = (props) => {
    return (
        <div>Hello  From Body</div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Body)