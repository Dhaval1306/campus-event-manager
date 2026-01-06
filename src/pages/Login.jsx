import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./registerstyle.css"

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleLogin} className="registration-form loginform">
      <div className="outer  login2" >
        <h2 style={{color:"white"}}>LOGIN</h2>

        <div className="field">
          <label>Email</label>
          <input type="email" />
        </div>

        <div className="field password-field">
          <label>Password</label>
          <input type={showPassword ? "text" : "password"} />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>

        <button type="submit">Login</button>

        <p className="login-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </form>
  )
}

export default Login
