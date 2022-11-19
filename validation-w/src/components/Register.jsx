import { Grid } from '@mui/material';
import React from 'react';
import welcome from '../images/welcome-to-bitechchain.png';
import { makeStyles } from '@mui/styles';
import '../style/login.css'
import logo from '../images/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles({
    loginbackground: {
        backgroundImage: 'radial-gradient(74.44% 78.1% at 69.79% 50%, rgba(186, 0, 187, 0.42) 0%, #AC02B2 0.01%, #0F1755 100%)',
        height: '1200px'
    },
    welcomeimg: {
        height: '34.427vw',
        width: '34.427vw'
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
    firstName: {
        width: '11.979vw',
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
    twoinput: {
        display: 'flex',
        gap: '1vw',
        paddingTop: '2.135vw'
    },
    loginform: {
        position: 'relative',
        left: '6vw'
    },
})

export default function ReGister() {

    const history = useHistory();

    const [userNameErr, setUserNameErr] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);
    const [copassword, setCoPassword] = useState(false);
    const [passwordErr, setpasswordErr] = useState(false);
    const [passwordErr1, setpasswordErr1] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [fnameErr, setFnameErr] = useState(false);
    const [lnameErr, setLnameErr] = useState(false);
    const [phone, setPhone] = useState(false);
    const [phonrErr, setPhoneErr] = useState(false);
    const [email, setEmail] = useState(false);
    const [firstname, setFirstname] = useState(false);
    const [lastname, setLastname] = useState(false);
    const [code, setCode] = useState(false);


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
            console.log('Empty Password')
        }
        else {
            setpasswordErr(true)
            console.log('invalid password')
        }
    }
    function handelcopassword(e) {
        let item2 = e.target.value;
        let a = document.getElementById('pass').value;
        if (a === item2) {
            setpasswordErr1(false)
            console.log('password match')
            setCoPassword(true)
        }
        else {
            setpasswordErr1(true)
            console.log('invalid password')
        }
    }
    function handelEmail(e) {
        let item = e.target.value;
        let userregi = /^([0-9a-z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/
        if (userregi.test(item)) {
            setEmailErr(false)
            console.log("valid Email")
            setEmail(true)
        }
        else if (item.length === 0) {
            setEmailErr(true)
            console.log("Empty Email")
        }
        else {
            setEmailErr(true)
            console.log("invalid Email")
        }
    }

    function handelFirstname(e) {
        let item = e.target.value;
        let nameregi = /^[A-Za-z]{3,40}$/
        if (nameregi.test(item)) {
            setFnameErr(false)
            console.log("valid Name")
            setFirstname(true)
        }
        else if (item.length === 0) {
            setFnameErr(true)
            console.log("Empty Name")
        }
        else {
            setFnameErr(true)
            console.log("invalid Name")
        }
    }
    function handelLastname(e) {
        let item = e.target.value;
        let nameregi = /^[A-Za-z]{3,40}$/
        if (nameregi.test(item)) {
            setLnameErr(false)
            console.log("valid last Name")
            setLastname(true)
        }
        else if (item.length === 0) {
            setLnameErr(true)
            console.log("Empty last Name")
        }
        else {
            setLnameErr(true)
            console.log("invalid last Name")
        }
    }
    function country_code() {
        let val = document.getElementById("country").value;

        if (val === "select") {
            document.getElementById("number").value = "";
            setCode(false);
        }
        else if (val === "ind") {
            document.getElementById("number").value = "+91";
            setCode(true)
        }
        else if (val === "us") {
            document.getElementById("number").value = "+1";
            setCode(true)

        }
        else if (val === "uk") {
            document.getElementById("number").value = "+44";
            setCode(true)
        }
    }
    function phonenumber(e) {
        let num = document.getElementById("number").value;
        let numregex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
        // ^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$
        if (numregex.test(num)) {
            setPhoneErr(false)
            console.log("valid Phone Number")
            setPhone(true)
        }
        else {
            setPhoneErr(true)
            console.log("invalid Phone Number")
            setPhone(false)
            e.preventDefault();
            return (false)
        }
    }
    function loginSubmit(e) {
        if (username === true && email === true && password === true && copassword === true && firstname === true && lastname === true && code === true && phone === true) {

            history.push('./login')
        }
        else {
            alert("Fill correct data")
            e.preventDefault();
            return false;
        }
        return true;

    }
    const classes = useStyles();
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
                    <div>
                        <form>
                            <div>
                                <h1 className={classes.logintext}>REGISTER</h1>
                            </div>
                            <div>
                                <p className={classes.signin}>Fill the details below.</p>
                            </div>
                            <div className={classes.usernamediv}>
                                <input placeholder='Sponsor' className={classes.username} />
                            </div>
                            <div className={classes.passworddiv}>
                                <input placeholder='Username' className={classes.password} onChange={handelUserName} />
                            </div><br />
                            {userNameErr ? <span style={{ color: 'red' }}>Invalid Username</span> : ""}
                            <div className={classes.twoinput}>
                                <div>
                                    <input placeholder='First Name' className={classes.firstName}

                                        onChange={handelFirstname}
                                    /> <br />
                                    {fnameErr ? <span style={{ color: 'red' }}>Please enter Valid name</span> : ""}
                                </div>
                                <div>
                                    <input placeholder='Last Name' className={classes.firstName}
                                        onChange={handelLastname}
                                    /><br />
                                    {lnameErr ? <span style={{ color: 'red' }}>Please enter Valid name</span> : ""}
                                </div>
                            </div>
                            <div className={classes.twoinput}>
                                <div>
                                    <input placeholder='Email Address' className={classes.firstName}
                                        onChange={handelEmail} /><br />
                                    {emailErr ? <span style={{ color: 'red' }}>Invalid Email</span> : ""}
                                </div>
                                <div>
                                    <input type="Password" id='pass' placeholder='Password'
                                        className={classes.firstName}
                                        onChange={handelpassword} />
                                    <br />
                                    {passwordErr ? <span style={{ color: 'red' }}>Invalid Password e.g :<br /> "Abc@1234"</span> : ""}
                                </div>

                            </div>
                            <div className={classes.twoinput}>
                                <div>
                                    <input type="Password" id='confirmpass' placeholder='Confirm Password' className={classes.firstName}
                                        onChange={handelcopassword} />
                                    <br />
                                    {passwordErr1 ? <span style={{ color: 'red' }}>Password not match</span> : ""}
                                </div>
                                <div>
                                    <select id="country" className={classes.firstName} onChange={country_code}>
                                        <option value="select">Select Country</option>
                                        <option value="ind">IND</option>
                                        <option value="us">US</option>
                                        <option value="uk">UK</option>
                                    </select>
                                </div>
                            </div>
                            <div className={classes.usernamediv}>
                                <input id='number' placeholder='Phone Number' className={classes.username}
                                    onChange={phonenumber}
                                /> <br />
                                {phonrErr ? <span style={{ color: 'red' }}>please enter valid number</span> : ""}
                            </div>
                            <div className={classes.logindiv}>
                                <button onClick={loginSubmit} type='submit' className={classes.loginbtn}>REGISTER</button>
                            </div>
                            <Link to='/'>
                                <div className={classes.newondiv}>
                                    <Link to='/' className={classes.newonour}>Allready have a account?<span style={{ color: '#F650FF' }} >Login</span></Link>
                                </div>
                            </Link>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
