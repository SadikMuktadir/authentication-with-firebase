import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { app } from "./firebase.config";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Registration = () => {
  const auth = getAuth(app);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sentOTP = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirm = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirm);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      navigate("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Succesfull",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-[#1F2833]">
      <div className="hero-content flex-col">
        <div className="text-white text-[30px]">
          Authentication with Phone Number
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-[#C5CBE3]">
          <div className="card-body">
            <div>
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <div className="mr-5">
                <PhoneInput
                  country={"bd"}
                  value={phone}
                  onChange={(phone) => setPhone("+" + phone)}
                />
              </div>
              <div className="flex mx-auto justify-center mt-5">
                <button onClick={sentOTP} className="btn btn-sm btn-success">
                  Send
                </button>
              </div>
              <div id="recaptcha"></div>
            </div>
            <div>
              <label className="label">
                <span className="label-text">OTP</span>
              </label>
              <div>
                <input
                  type="number"
                  placeholder="Enter OTP here"
                  className="input input-bordered w-[300px] h-[40px]"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <button
                  onClick={verifyOTP}
                  className="btn btn-sm btn-success flex mx-auto mt-5"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
