import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { createMessage } from '../../Api/MessageApi'
import { ADD_CURRENT_ROOM_MESSAGE } from '../../Redux/ActionTypes'


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


    useEffect(() => {


        props.socket.on('reply', (data) => {
            // console.log('effect', data)
            props.dispatch(ADD_CURRENT_ROOM_MESSAGE(data))

        })


    }, [props.socket])

    useEffect(() => {
        
    })

    let showAllMessage

    if (props.currentRoomMessage.length === 0) { showAllMessage = <h5>Mo message found</h5> }
    else {
        showAllMessage = props.currentRoomMessage.map(item => {

            return (


                <div className='w-100 my-4'>

                    <div style={item.sender._id === props.decodedToken._id ? { backgroundImage: 'linear-gradient(to right, green,  indigo' } : { backgroundImage: 'linear-gradient(to right, red,  indigo' }} className={item.sender._id === props.decodedToken._id ? 'text-start w-50 ms-auto rounded rounded-5 p-3 text-light' : 'text-start w-50 me-auto rounded rounded-5 p-3 text-light'}> {item.message}</div>

                    <div className={item.sender._id === props.decodedToken._id ? 'text-end ms-auto me-4 mt-1' : 'text-start me-auto ms-4 mt-1'}>{new Date(item.createdAt).toUTCString().slice(17, 25)} {new Date(item.createdAt).toUTCString().slice(3, 12)}</div>

                </div>
            )
        })
    }


    const scrollBottom = () => {

        document.body.scrollTop == document.getElementsByClassName('list')[0].scrollHeight
        document.documentElement.scrollTop = document.getElementsByClassName('list')[0].scrollHeight
    }

    return (
        <div>


            <div className='mb-5 list'>
                {showAllMessage}
            </div>

            <br /><br /><br /> <br /><br />


            <div className='position-sticky bottom-0 w-100 mb-3'>
                <Formik

                    initialValues={{
                        message: ''
                    }}



                    onSubmit={(val, { resetForm }) => {
                        

                        if (val.message != '') {
                            let data = { sender: props.decodedToken, receiver: props.selectedChatUser, message: val.message, chatRoomId: props.currentChatRoomId, createdAt: new Date().toUTCString() }


                            props.socket.emit('message', data)

                            props.dispatch(ADD_CURRENT_ROOM_MESSAGE(data))

                            createMessage(props.decodedToken._id, props.selectedChatUser._id, val.message, props.currentChatRoomId)

                            resetForm({ val: '' })
                        }

                    }}

                >

                    {({ values, handleSubmit, handleChange }) => (
                        <div className='text-center p-2 rounded'>
                            <form style={{ backgroundColor: 'indigo' }} className='p-2 rounded bg-gradient' onSubmit={handleSubmit} action="">

                                <input className='w-75 me-2 p-2 rounded rounded-5' placeholder='Write message' type="text" name='message' onChange={handleChange} value={values.message} />
                                <button onClick={scrollBottom} className='ps-3 ms-1 btn btn-light' type="submit"> <a href="#test"><img src="/send1.png" className='img-fluid' width={'20px'} alt="" /></a> </button>

                            </form>
                        </div>
                    )}

                </Formik>
            </div>

        </div>
    )
}




export default connect(mapStateToProps)(ChatBox)