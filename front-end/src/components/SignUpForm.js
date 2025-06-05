import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignUpForm.css";
import image from "../assets/image.jpg"; // Gambar untuk form
import facebookIcon from "../assets/facebook-icon.jpg";
import Appleicon from "../assets/apple-icon.jpg";
import Googleicon from "../assets/google-icon.jpg";
import twitterIcon from "../assets/twitter-icon.jpg";

const SignUpForm = () => {
  // State untuk menyimpan data form dan pesan
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("user"); // Default role adalah "user"
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }

    // Validasi apakah semua field sudah diisi
    if (!name || !email || !password || !confirmPassword) {
      setErrors("All fields are required.");
      return;
    }

    // Data yang akan dikirim ke backend
    const formData = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      role, // Role default
    };

    try {
      // Kirim data ke backend
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Tampilkan pesan sukses
      setSuccessMessage("Registration successful! Please SignIn.");
      setErrors(null); // Reset error jika sukses
    } catch (error) {
      // Tangkap error dari server
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors("An error occurred. Please try again.");
      }
      setSuccessMessage(null); // Reset pesan sukses jika error
    }
  };

  return (
    <div className="sign-up-container">
      {/* Gambar untuk ilustrasi */}
      <div className="form-image">
        <img src={image} alt="Sign Up Illustration" />
      </div>

      {/* Form Sign Up */}
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>

        {/* Pesan sukses */}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Pesan error */}
        {errors && (
          <div className="error-message">
            {typeof errors === "string" ? (
              <p>{errors}</p>
            ) : (
              Object.entries(errors).map(([key, value]) => <p key={key}>{value}</p>)
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        {/* Social Login */}
        <div className="social-login">
          <p>Or sign up with</p>
          <div className="social-icons">
            <button>
              <img src={facebookIcon} alt="Facebook" />
              Facebook
            </button>
            <button>
              <img src={Appleicon} alt="Apple" />
              Apple
            </button>
            <button>
              <img src={Googleicon} alt="Google" />
              Google
            </button>
            <button>
              <img src={twitterIcon} alt="Twitter" />
              Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;