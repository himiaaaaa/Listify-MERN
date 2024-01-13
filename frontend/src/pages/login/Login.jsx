import { useDispatch, useSelector } from 'react-redux'
import './login.css'
import { login } from '../../reducers/authReducer'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notification = useSelector((state) => state.notifications)

  const initialValues = {
    username: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  })

  const handleLogin = async (formValue) => {
    const { username, password } = formValue

    dispatch(login(username, password))
    navigate('/')
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <Formik
        onSubmit={handleLogin}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="loginForm">
          <label htmlFor='username'>Username</label>
          <Field
            className="loginInput"
            type="text"
            placeholder="Enter your username..."
            id="username"
            name="username"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="alert alert-danger"
          />

          <label>Password</label>
          <Field
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            id="password"
            name="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="alert alert-danger"
          />

          <button className="loginButton" type="submit" >
            <span id="login-button">Login</span>
          </button>

          <button
            className="loginRegisterButton"
            type="button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>

        </Form>
      </Formik>
      <div>
        {notification && (
          <div>
            <div className="alert alert-danger" role="alert">
              {notification}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}