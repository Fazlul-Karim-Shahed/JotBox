import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Toast } from 'reactstrap'
import { createChatRoom } from '../../Api/ChatApi'
import io from 'socket.io-client'
import ChatBox from './ChatBox'
import { CURRENT_CHAT_ROOM_ID, CURRENT_ROOM_MESSAGE, SELECTED_CHAT_USER } from '../../Redux/ActionTypes'
import { getRoomMessage } from '../../Api/MessageApi'
import './Styles/Chat.css'
import Spinner from './Spinner/Spinner'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'



const socket = io.connect(process.env.REACT_APP_BACKEND)

const mapStateToProps = (state) => {

    return {
        decodedToken: state.decodedToken,
        selectedChatUser: state.selectedChatUser,
        authenticated: state.authenticated
    }
}


export const Chat = (props) => {

    const [allUser, setAllUser] = useState([])
    const [spinner, setSpinner] = useState(false)



    useEffect(() => {

        setSpinner(true)

        axios.get(process.env.REACT_APP_BACKEND + '/api/user/').then(data => {

            setSpinner(false)

            setAllUser(data.data.data)

        })

    }, [])




    const selectChat = (item) => {

        toggle()

        setSpinner(true)

        if (props.decodedToken._id != undefined) {
            createChatRoom(item._id, props.decodedToken._id).then(data => {

                socket.emit('join_room', data.data._id)
                props.dispatch(SELECTED_CHAT_USER(item))
                props.dispatch(CURRENT_CHAT_ROOM_ID(data.data._id))

                getRoomMessage(data.data._id).then(data => {
                    setSpinner(false)
                    // console.log(data)
                    if (!data.error) {
                        props.dispatch(CURRENT_ROOM_MESSAGE(data.data))


                    }
                    else props.dispatch(CURRENT_ROOM_MESSAGE([]))

                })

            })
        }
        else {
            window.location.replace('/signin')
        }


    }

    const scrollBottom = () => {

        document.body.scrollTop == document.getElementsByClassName('chatBox')[0].scrollHeight
        document.documentElement.scrollTop = document.getElementsByClassName('chatBox')[0].scrollHeight
    }


    let showAllUser
    if (allUser === undefined) return showAllUser = <div></div>
    if (allUser.length === 0) { showAllUser = <div></div> }
    else {
        showAllUser = allUser.map((item, index) => {


            if (item._id != props.decodedToken._id) {
                return (
                    <div onClick={() => selectChat(item)} className='my-4' style={{ cursor: 'pointer' }}>
                        <Toast style={{ backgroundImage: 'linear-gradient(to right, indigo,  violet' }} className='shadow w-100 p-3 text-light' >
                            <h5 className=''>{item.username}</h5>
                        </Toast>
                    </div>
                )
            }

        })

        scrollBottom()

    }

    const toggle = () => {
        if (document.getElementsByClassName('showUserMobile')[0].classList.contains('d-none')) {
            document.getElementsByClassName('showUserMobile')[0].classList.remove('d-none')
            document.getElementsByClassName('showUserMobile')[0].classList.add('d-block')
        }
        else {
            document.getElementsByClassName('showUserMobile')[0].classList.remove('d-block')
            document.getElementsByClassName('showUserMobile')[0].classList.add('d-none')
        }
    }



    const leaveChat = () => {
        toggle()
        props.dispatch(CURRENT_ROOM_MESSAGE([]))
        props.dispatch(SELECTED_CHAT_USER({}))
    }



    return (
        <div>
            <div className="row m-0">
                <div className="col-md-3 border-end">


                    <div className='showUser position-sticky top-0'>
                        <h2 className='text-center my-4'>Friend List</h2>
                        {showAllUser}
                    </div>
                </div>
                <div className="col-md-9">
                    <h2 className='text-center mt-2 rounded text-white position-sticky top-0'>
                        <div className='friendList'>
                            <div className='friendListDiv'>
                                <div onClick={toggle} style={{ cursor: 'pointer' }} className='threeDotTotal bg-white p-1 rounded rounded-3'>
                                    <div className='threeDot'></div>
                                    <div className='threeDot'></div>
                                    <div className='threeDot'></div>
                                </div>
                                <div className='text-dark bg-light rounded p-1'>{props.selectedChatUser.username}</div>
                            </div>

                            <div className='showUserMobile d-none mb-3'>
                                {showAllUser}
                                {props.authenticated ? <h6 className='bg-primary rounded d-inline p-2' style={{ cursor: 'pointer' }} onClick={leaveChat}><FontAwesomeIcon style={{transform:'scaleX(-1)'}} className='me-1' icon={faArrowRightFromBracket} /> Leave Chat </h6> : <div></div>}
                            </div>
                        </div>

                        <div className='chatName rounded rounded-3'>{props.selectedChatUser.username}</div>
                    </h2>


                    <div className='chatBox'>
                        <ChatBox socket={socket} />
                    </div>
                </div>
            </div>

            {spinner ? <Spinner /> : ''}
        </div>
    )
}



export default connect(mapStateToProps)(Chat)
