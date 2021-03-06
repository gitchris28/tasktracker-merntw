import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector
  (
      (state) => state.auth
  )

  useEffect(() => {
    if(isError) {
        toast.error(message)
    }

    //check also user if logged or register, user will include token and stuff then redirected
    if(isSuccess || user) {
        navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        //button state name = button state value
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
      e.preventDefault()

      const userData = {
          email,
          password
      }

      dispatch(login(userData))
  }

  if(isLoading) {
      return <Spinner />
  }

  return (
    <>
        <section className="heading">
            <h1 className='flex items-center justify-center'>
                <FaSignInAlt /> Login
            </h1>
            <p>Login and start using MP Tracker</p>
        </section>
        <section className='form md:pt-36 pt-24 pb-72 md:pb-96'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={email} 
                        placeholder="Enter your email" 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={password} 
                        placeholder="Enter password" 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <button type="submit" 
                        className='
                        items-center
                        py-2
                        px-4
                        border border-transparent
                        text-md
                        font-bold
                        rounded-md
                        text-white
                        bg-blue-800
                        hover:bg-blue-900
                        focus:ring-2 focus:ring-offset-2 focus:ring-blue-800
                        inline-block
                        w-full
                        '
                    >Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login