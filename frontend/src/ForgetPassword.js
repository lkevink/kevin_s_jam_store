import React from 'react'
import Title from './Title'
import ForgetPasswordModuleCss from './css/ForgetPassword.module.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function ForgetPassword() {
    const [resetStage, setResetStage] = useState(1);
    const [email, setEmail] = useState('');
    const [oneTimePasscode, setOneTimePasscode] = useState('');
    const [sentOneTimePasscode, setSentOneTimePasscode] = useState(false);
    const [attemptsOneTimePasscode, setAttemptsOneTimePasscode] = useState(0);
    const [resendAttempts, setResendAttempts] = useState(0);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSendOneTimePasscode = async () => {
        try {

            const response = await axios.post('http://localhost:5000/api/sendOneTimePasscode', { email });
            if (response.status === 200) {
                setSentOneTimePasscode(true);
                setResetStage(2);
            } else {

            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const verifyOneTimePasscode = async () => {
        try {

            const response = await axios.post('http://localhost:5000/api/verifyOneTimePasscode', { email, oneTimePasscode });
            if (response.status === 200) {
                setResetStage(3);
            } else {

                setAttemptsOneTimePasscode(previous => previous + 1);
                if (attemptsOneTimePasscode >= 2) {

                }
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const updatePassword = async () => {
        if (newPassword !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {

            const response = await axios.post('http://localhost:5000/api/updatePassword', { email, newPassword });
            if (response.status === 200) {
                alert('Register successfully!');
                navigate('/login');
            } else {

            }
        } catch (error) {
            console.error('Error updating password:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            console.error(error.config);
        }
    };

    return (
        <div className={ForgetPasswordModuleCss.forgetPasswordSection}>
            <div className={ForgetPasswordModuleCss.forgetPasswordContainer}>
                {resetStage === 1 && (
                    <>
                        <Title mainTitle={'Reset Password'}/>
                        <span>
                            <label htmlFor="email">Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
                        </span>
                        
                        <br/>

                        <span>
                            <button onClick={handleSendOneTimePasscode}>Send Verification Code</button>
                        </span>

                        <br/>
                    
                        <span>
                            
                            <button><Link to='/login'>Login</Link></button>
                            <button><Link to='/register'>Register</Link></button>
                        </span>
                    </>
                )}

                {resetStage === 2 && sentOneTimePasscode && (
                    <>
                        <Title mainTitle={'Verify One Time Passcode'}/>
                        <div  className={ForgetPasswordModuleCss.verifyOneTimePasscode}>
                            <span>
                                <label for="oneTimePasscode">One Time Passcode:</label>
                                <input type="text" value={oneTimePasscode} onChange={(e) => setOneTimePasscode(e.target.value)} placeholder="Enter One Time Passcode"/>

                            </span>
                            
                            <br/>

                            <span>
                                <button onClick={verifyOneTimePasscode}>Submit One Time Passcode</button>
                                {resendAttempts < 3 && (
                                    <button onClick={() => {
                                        setResendAttempts(previous => previous + 1);
                                        handleSendOneTimePasscode();
                                    }}>Resend One Time Passcode</button>
                                )}
                            </span>
                        </div>
                    </>
                )}

                {resetStage === 3 && (
                    <>
                        <Title mainTitle={'Set New Password'}/>
                        <span>
                            <label for="newPassword">New Password:</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password"/>
                        </span>

                        <br/>

                        <span>
                            <label for="confirmNewPassword">Confirm New Password:</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password"/>
                        </span>

                        <br/>

                        <span>
                            <button onClick={updatePassword}>Update Password</button>
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}
