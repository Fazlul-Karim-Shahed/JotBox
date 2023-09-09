import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { createMessage } from '../../Api/MessageApi'
import { ADD_CURRENT_ROOM_MESSAGE } from '../../Redux/ActionTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const mapStateToProps = (state) => {

    console.log(state)

    return {
        selectedChatUser: state.selectedChatUser,
        currentChatRoomId: state.currentChatRoomId,
        decodedToken: state.decodedToken,
        currentRoomMessage: state.currentRoomMessage
    }
}


export const ChatBox = (props) => {

    console.log(new Date().toString())


    useEffect(() => {

        props.socket.on('reply', (data) => {
            console.log('From notification: ', data.sender)
            props.dispatch(ADD_CURRENT_ROOM_MESSAGE(data))

            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {

                    let notification = new Notification(data.sender.username, {
                        body: data.message,
                    });

                }
            });



        })







    }, [props.socket])

    useEffect(() => {

    })

    let showAllMessage

    if (props.currentRoomMessage.length === 0) { showAllMessage = <h5 className='mt-5 text-center'>No message found</h5> }
    else {
        showAllMessage = props.currentRoomMessage.map(item => {

            // console.log(item.createdAt)

            return (



                <div className='w-100 my-4'>

                    <div style={item.sender._id === props.decodedToken._id ? { backgroundImage: 'linear-gradient(to right, green,  indigo' } : { backgroundImage: 'linear-gradient(to right, red,  indigo' }} className={item.sender._id === props.decodedToken._id ? 'text-start w-50 ms-auto rounded rounded-5 p-3 text-light' : 'text-start w-50 me-auto rounded rounded-5 p-3 text-light'}> {item.message}</div>

                    <div className={item.sender._id === props.decodedToken._id ? 'text-end ms-auto me-3 mt-1 small' : 'text-start me-auto ms-3 mt-1 small'}>{item.sendingTime}</div>

                </div>
            )
        })
    }

    console.log(" Now date:  ",)


    const scrollBottom = () => {

        document.body.scrollTop == document.getElementsByClassName('list')[0].scrollHeight
        document.documentElement.scrollTop = document.getElementsByClassName('list')[0].scrollHeight
    }

    return (
        <div>


            <div className='mb-5 list'>
                {showAllMessage}
            </div>


            <div className='position-sticky bottom-0 w-100'>
                <Formik

                    initialValues={{
                        message: ''
                    }}



                    onSubmit={(val, { resetForm }) => {


                        if (val.message != '') {

                            let sendingTime = `${new Date().toDateString().slice(4, -4)} AT ${String(`${new Date().toDateString().slice(4, -4)} AT ${new Date().toLocaleTimeString(undefined, { hour12: true })} `).toUpperCase().slice(10,)} `

                            let data = { sender: props.decodedToken, receiver: props.selectedChatUser, message: val.message, chatRoomId: props.currentChatRoomId, sendingTime: sendingTime }


                            props.socket.emit('message', data)

                            props.dispatch(ADD_CURRENT_ROOM_MESSAGE(data))

                            createMessage(props.decodedToken._id, props.selectedChatUser._id, val.message, props.currentChatRoomId, sendingTime)

                            resetForm({ val: '' })
                        }

                    }}

                >

                    {({ values, handleSubmit, handleChange }) => (
                        <div className='text-center p-2 rounded'>
                            <form style={{ backgroundColor: 'indigo' }} className='p-2 rounded bg-gradient' onSubmit={handleSubmit} action="">

                                <input className='w-75 me-2 p-2 rounded rounded-5' placeholder='Write message' type="text" name='message' onChange={handleChange} value={values.message} />
                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3106/3106856.png" className='img-fluid' width={'20px'} alt="" /> */}
                                <button onClick={scrollBottom} className='ps-2 pe-1 pt-1 pb-1 rounded rounded-5' type="submit"> <img src="https://cdn-icons-png.flaticon.com/128/3682/3682321.png" className='img-fluid' width={'30px'} alt="" /></button>

                            </form>
                        </div>
                    )}

                </Formik>
            </div>

        </div>
    )
}




export default connect(mapStateToProps)(ChatBox)