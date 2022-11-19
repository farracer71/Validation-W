import { Grid, } from '@mui/material';
import React from 'react';
import welcome from '../images/welcome-to-bitechchain.png';
import { makeStyles } from '@mui/styles';
import '../style/login.css'
import logo from '../images/logo.png';
import { useState } from 'react';
import { Link, useHistory, } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';




const useStyles = makeStyles({
    loginbackground: {
        backgroundImage: 'radial-gradient(74.44% 78.1% at 69.79% 50%, rgba(186, 0, 187, 0.42) 0%, #AC02B2 0.01%, #0F1755 100%)',
        height: '1000px'
    },
    welcomeimg: {
        height: '34.427vw',
        width: '34.427vw'
    },
    loginform: {
        position: 'relative',
        left: '6vw'
    },
    logintext: {
        fontFamily: 'Orbitron',
        fontStyle: 'normal',
        fontSize: '1.563vw',
        '@media(max-width: 1100px)': {
            fontSize: '2.563vw',
        },
        fontHeight: '1.7vw',
        color: '#ffff',
    },
    signin: {
        fontFamily: 'Orbitron',
        fontStyle: 'normal',
        fontSize: '0.729vw',
        '@media(max-width: 1100px)': {
            fontSize: '1.363vw',
        },
        fontHeight: '0.729vw',
        color: '#ffff',
    },
    username: {
        width: '25.260vw',
        height: '3.125vw',
        boxShadow: '0px 0px 11px #C75CD3',
        borderRadius: '5.208vw',
        backgroundColor: "transparent",
        border: 'none',
        color: '#ffff'
    },

    usernamediv: {
        paddingTop: '2.135vw'
    },
    password: {
        width: '25.260vw',
        height: '3.125vw',
        boxShadow: '0px 0px 11px #C75CD3',
        borderRadius: '5.208vw',
        backgroundColor: "transparent",
        border: 'none',
        color: '#ffff'
    },
    passworddiv: {
        paddingTop: '2.135vw'
    },
    checkboxR: {
        display: 'flex',
        color: '#ffff',
    },
    forgotR: {
        display: 'flex',
        gap: '11.354vw',
        paddingTop: '1.198vw'
    },
    checkbox: {
        width: '1.042vw',
        height: '1.042vw'
    },
    logindiv: {
        paddingTop: '1.771vw',

    },
    loginbtn: {
        width: '25.260vw',
        height: '3.125vw',
        boxShadow: '0px 0px 11px #C75CD3',
        borderRadius: '5.208vw',
        backgroundImage: 'linear-gradient(182.4deg, #611BB5 2.54%, rgba(255, 255, 255, 0) 222.36%);',
        border: 'none',
        color: '#ffff',
        fontSize: '0.938vw',
        '@media(max-width: 1100px)': {
            fontSize: '1.363vw',
        },
    },
    newondiv: {
        paddingTop: '2.646vw',
    },
    newonour: {
        color: '#ffff',
        fontSize: '0.833vw',
        '@media(max-width: 1100px)': {
            fontSize: '1.563vw',
        },
    },
    fp: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontSize: '0.729vw',
        '@media(max-width: 1100px)': {
            fontSize: '1.363vw',
            position: 'relative',
            left: '-6vw'
        },
        color: '#ffff'
    },
    rememberme: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontSize: '0.729vw',
        '@media(max-width: 1100px)': {
            fontSize: '1.363vw',
        },
        color: '#ffff'
    },
    maingrid: {
        position: 'relative',
        top: '11.406vw'
    },
    firstgrid: {
        position: 'relative',
        left: '9.167vw'
    },
    logoimg: {
        width: '2.396vw',
        height: '3.958vw',
        position: 'relative',
        top: '1.771vw',
        left: '7.969vw',
        '@media(max-width: 1100px)': {
            width: '3.396vw',
            height: '4.958vw',
            top: '2vw'
        },
    },
})

export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState(false);
    const [userNameErr, setUserNameErr] = useState(false);
    const [password, setPassword] = useState(false);
    const [passwordErr, setpasswordErr] = useState(false);
    const history = useHistory();
    function handelUserName(e) {
        let item = e.target.value;
        let userregi = /^[a-zA-Z0-9._]{4,12}$/
        if (userregi.test(item)) {
            setUserNameErr(false)
            console.log("valid username")
            setUsername(true)
        }
        else {
            setUserNameErr(true)
            console.log("invalid username")
        }
    }

    function handelpassword(e) {
        let item = e.target.value;
        let passregix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/

        if (passregix.test(item)) {
            setpasswordErr(false)
            console.log('valid password')
            setPassword(true)
        }
        else if (item.length === 0) {
            setpasswordErr(true)
            console.warn('Empty Password')
        }
        else {
            setpasswordErr(true)
            console.warn('invalid password')
        }
    }

    function loginSubmit(e) {
        if (username === true && password === true) {
            history.push('/signup')
        }
        else {
            alert("Fill correct data")
            e.preventDefault();
        }


    }

    return (
        <div className={classes.loginbackground}>
            <div>
                <img src={logo} alt="" className={classes.logoimg} />
            </div>
            <Grid container className={classes.maingrid}>
                <Grid item xs={6} className={classes.firstgrid}>
                    <img src={welcome} alt="" className={classes.welcomeimg} />
                </Grid>
                <Grid item xs={6} className={classes.loginform} alignItems='center'>
                    <form >
                        <div>
                            <div>
                                <h1 className={classes.logintext}>Login</h1>
                            </div>
                            <div>
                                <p className={classes.signin}>Sign in using your username and password</p>
                            </div>
                            <div className={classes.usernamediv}>
                                <input placeholder='Enter your username' className={classes.username}
                                    onChange={handelUserName}
                                /> <br />
                                {userNameErr ? <span style={{ color: 'red' }}>Invalid Username</span> : ""}
                            </div>
                            <div className={classes.passworddiv}>
                                <input placeholder='Enter your password' type="Password" className={classes.password}
                                    onChange={handelpassword} />
                                <br />
                                {passwordErr ? <span style={{ color: 'red' }}>Invalid Password e.g : "Abc@1234"</span> : ""}

                            </div>
                            <div className={classes.forgotR}>
                                <div className={classes.checkboxR}>
                                    <div>
                                        <FormControlLabel className={classes.rememberme} control={<Checkbox defaultChecked
                                            size='small' />} style={{ fontSize: '0.729vw', }} label="Remember me" />
                                    </div>
                                    <div >

                                    </div>
                                </div>
                                <div className={classes.forgotdiv}>
                                    <Link to={'/reset-password-link'} className={classes.fp}>Forgot Password</Link>
                                </div>
                            </div>
                            <div className={classes.logindiv}>
                                <button type='submit' className={classes.loginbtn}
                                    onClick={loginSubmit}
                                >Login</button>
                            </div>
                            <div className={classes.newondiv}>
                                <Link to="/signup" className={classes.newonour}>New on our platform?<span style={{ color: '#F650FF' }} >Register</span></Link>
                            </div>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}
