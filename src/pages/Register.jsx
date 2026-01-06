import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./registerstyle.css"

function Register() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="brand">

                <h1>EventHub 🎉</h1>
                <p className="tagline">Manage and explore campus events</p>
            </div>
            <form onSubmit={handleRegister} className="registration-form">
                <div className="outer">

                    {/* Brand */}


                    {/* Welcome */}
                    <h2 className="welcome">Welcome</h2>
                    <p className="subtitle">Create an account to get started</p>

                    {/* Name */}
                    <div className="row">
                        <div className="field">
                            <label>First Name</label>
                            <input type="text" />
                        </div>

                        <div className="field">
                            <label>Last Name</label>
                            <input type="text" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="field">
                        <label>Email</label>
                        <input type="email" />
                    </div>

                    {/* Passwords */}
                    <div className="row">
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

                        <div className="field password-field">
                            <label>Confirm Password</label>
                            <input type={showConfirm ? "text" : "password"} />
                            <span
                                className="eye-icon"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? "👁️" : "🙈"}
                            </span>
                        </div>
                    </div>

                    <button type="submit">Register</button>

                    <p className="login-text">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")}>Login</span>
                    </p>

                    <p className="privacy">
                        By signing up, you agree to our <span>Privacy Policy</span>
                    </p>

                </div>
            </form>
        </>
    )
}

export default Register
