import { Formik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { SigninApi } from '../../Api/AuthApi'
import jwt_decode from 'jwt-decode'
import { SET_AUTH } from '../../Redux/ActionTypes'
import { saveTokenToLocal } from '../../Function/AuthFunctions'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => {
    // console.log(state)
    return {

    }
}

const Signup = (props) => {

    let navigate = useNavigate()

    const [message, setMessage] = useState('')



    return (
        <div className='py-5'>
            <Formik

                initialValues={{
                    email: '',
                    password: ''
                }}

                onSubmit={values => {

                    let data = SigninApi(values).then(data => {

                        if (data.name === 'AxiosError' || data.error) throw data.message
                        else {

                            let decoded = jwt_decode(data.value.token)
                            saveTokenToLocal(decoded)
                            props.dispatch(SET_AUTH(decoded))
                            window.location.replace('/')
                            return navigate('/')

                        }

                    })
                        .catch(err => {

                            setMessage(err)
                        })
                }}

            >

                {({ values, handleChange, handleSubmit }) => (
                    <Card className='w-75 m-auto my-5 p-3 shadow'>
                        <CardHeader className='bg-light text-center fw-bold'>Signin</CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <input required type="email" name="email" value={values.email} onChange={handleChange} className='form-control' placeholder='Enter email' id="" />
                                <input required type="text" name="password" value={values.password} onChange={handleChange} className='form-control my-3' placeholder='Enter password' id="" />
                                <button className='btn btn-outline-success' type="submit">Signin</button>
                                <div className='text-center'>
                                    <Link to={'/signup'}>Not a account? Signup now</Link>
                                </div>
                                <div className='text-center'><span className='bg-danger text-light '>{message}</span></div>
                            </form>
                        </CardBody>
                    </Card>
                )}

            </Formik>
        </div>
    )
}



export default connect(mapStateToProps)(Signup)