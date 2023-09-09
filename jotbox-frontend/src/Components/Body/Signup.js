import { Formik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { SignupApi } from '../../Api/AuthApi'
import jwt_decode from 'jwt-decode'
import { SET_AUTH } from '../../Redux/ActionTypes'
import { saveTokenToLocal } from '../../Function/AuthFunctions'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Spinner from './Spinner/Spinner'

const mapStateToProps = (state) => {

    return {

    }
}

const Signin = (props) => {

    let navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [spinner, setSpinner] = useState(false)



    return (
        <div className='py-5 container'>
            <Formik

                initialValues={{
                    email: '',
                    password: '',
                    username: ''
                }}

                onSubmit={values => {
                    setSpinner(true)
                    let data = SignupApi(values).then(data => {

                        if (data.name === 'AxiosError' || data.error) throw data.message
                        else {
                            setMessage(data.message)
                            let decoded = jwt_decode(data.value.token)
                            saveTokenToLocal(decoded)
                            props.dispatch(SET_AUTH(decoded))
                            window.location.replace('/')
                            setSpinner(false)
                            return navigate('/')

                        }


                    })
                        .catch(err => {
                            setSpinner(false)
                            setMessage(err)
                        })

                }}

            >

                {({ values, handleChange, handleSubmit }) => (
                    <Card className='m-auto my-5 p-3 shadow'>
                        <CardHeader className='bg-light text-center fw-bold'>Signup</CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <input required type="text" name="username" value={values.username} onChange={handleChange} className='form-control py-2' placeholder='Enter username' id="" />
                                <input required type="email" name="email" value={values.email} onChange={handleChange} className='form-control my-3 py-2' placeholder='Enter email' id="" />
                                <input required type="text" name="password" value={values.password} onChange={handleChange} className='form-control my-3 py-2' placeholder='Enter password' id="" />
                                <button className='btn btn-outline-success' type="submit">Signin</button>
                                <div className='text-center mt-4'>Already have an account? <Link to={'/signin'}>Signin now</Link></div>
                                <div className='text-center'><span className='bg-danger text-light '>{message}</span></div>
                            </form>
                        </CardBody>

                    </Card>
                )}

            </Formik>
            {spinner ? <Spinner /> : ''}

        </div>
    )
}



export default connect(mapStateToProps)(Signin)