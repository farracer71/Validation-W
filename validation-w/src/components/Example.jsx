import React, { useEffect, useState, useContext } from "react";
import "src/scss/main.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    Link,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Input,
    InputAdornment,
    IconButton,
    makeStyles,
    MenuItem,
} from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsEnvelope, BsPerson } from "react-icons/bs";
import { AiOutlineLock, AiOutlineEye } from "react-icons/ai";
import Checkbox from "@material-ui/core/Checkbox";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Logo from "src/component/Logo";
import DatePicker from "react-datepicker";
import { Form, Formik } from "formik";
import * as yep from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import axios from "axios";
import ApiConfig from "src/config/APICongig";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "src/context/Auth";

// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import TopBar from "src/layouts/LoginLayout/index.js";
import { values } from "lodash";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
    buttonbox: {
        fontSize: "90%",
        width: "432.8px",
        height: "37.4px",
        marginLeft: "7%",
        background: "#00A4EF",
        borderRadius: " 7px",
        padding: "10px 18px",
        border: " 3px solid #00A4EF",
        [theme.breakpoints.only("sm")]: {
            // maxWidth: "112px",
            fontSize: "14px",
        },
        [theme.breakpoints.only("xs")]: {
            // maxWidth: "112px",
            fontSize: "14px",
        },
        "&:hover": {
            background: "#fff",
            color: "#00A4EF",
            border: " 3px solid #00A4EF",
        },
        "&:active": {
            background: "#fff",
            color: "#00A4EF",
            border: " 3px solid #00A4EF",
        },
    },
    title: {
        "& h3": {
            width: "637px",
            marginLeft: "-7%",
            fontWeight: "600",
            fontSize: "45px",
            fontFamily: "Inter",
            fontStyle: "normal",
            color: "#000000",
            lineHeight: "52px",
            "@media (max-width:767px)": {
                fontSize: "27px",
                lineHeight: "22px",
            },
            "@media (max-width:433px)": {
                fontSize: "27px",
                lineHeight: "28px",
            },
        },
    },
    date: {
        "& p": {
            marginLeft: "0px !important",
            fontSize: "12px !important",
        },
    },
    root: {
        width: "100%",

        backgroundColor: "#fff",
        "@media (min-width: 1326px)": {
            "& .MuiContainer-root": {
                paddingLeft: "0",
                paddingRight: "0",
            },
        },
    },
    TearmCondition: {
        color: "#fff",
        paddingTop: "20px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: "13px",
        marginLeft: "-11px",
        lineHeight: "22px",
    },
    textfiled1: {
        width: "202px",
        height: " 48px",
        background: "#FFFFFF",
        border: "1px solid rgba(74, 74, 74, 0.5)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "7px",
    },
    textfiled: {
        background: "#FFFFFF",
        border: "1px solid rgba(74, 74, 74, 0.5)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "7px",
        width: "434px",
        height: "48px",
        boxShadow: "none",
    },
    logosec: {
        "@media(min-width:1280px)": {
            display: "none",
        },
    },
    formboxes: {
        marginTop: "0px",
    },
    account: {
        marginTop: "20px",
        textAlign: "center",
        color: "#fff",
        fontfamily: "Inter",
        fontstyle: "normal",
        fontWeight: "300",
        fontSize: "12px",
        lineHeight: "22px",
        letterSpacing: "0.06em",
        paddingBottom: "25px",
    },
    newbox: {
        color: "rgba(53, 99, 246, 1) ",
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
    },
    title1: {
        fontFamily: "Inter",
        fontStyle: " normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#fff",
        padding: "16px 0px 5px 2px",
    },
    title2: {
        padding: "16px 0px 5px 36px",
        fontFamily: "Inter",
        fontStyle: " normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#fff",
    },
    checkbox: {
        marginTop: "-1%",
        color: "#00A4EF",
        marginLeft: "4%",

        "& .MuiCheckbox-root": {
            color: "#00A4EF",
        },
        "& .MuiCheckbox-colorSecondary.Mui-checked ": {
            color: "#00A4EF",
        },
    },
}));
function Signup(props) {
    const classes = useStyles();

    const formValidationSchema = yep.object().shape({
        firstName: yep
            .string()
            .matches(/^[A-Za-z0-9]+$/, "please enter valid name")

            .required("First Name is required"),

        lastName: yep
            .string()
            .required("Last Name is required")
            .matches(/^[A-Za-z0-9]+$/, "please enter valid name"),

        email: yep
            .string()
            .required("Email is required")
            .email("Please enter valid email"),
        password: yep
            .string()
            .max(16, "16 charactors are allowed.")
            .matches(
                // /^(?=.*[A-Za-z][A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
                "Password must be 8 to 16 character long with one uppercase, one lower case, a number, and a special character. "
            )
            .required("Password is required."),

        confirmPassword: yep
            .string()
            .required("Password need to match")
            .oneOf([yep.ref("password"), null], "Password needs to match"),
    });
    const [countryCode, setCountryCode] = useState("");
    const auth = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [showPassword1, setShowPassword1] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [phone, setPhone] = useState();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [Countrylist, setCountrylist] = useState();
    const [showStates, setShowStates] = useState([]);
    const [done, setDone] = useState(false);
    const recaptchaRef = React.createRef();
    const [access, setAccess] = React.useState(true);
    const [agree, setAgree] = useState(false);

    const [btnText, setBtnText] = useState("CREATE AN ACCOUNT");

    const formInitialSchema = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const handleFormSubmit = async (values) => {
        console.log(values, "values");
        setIsLoading(true);
        setBtnText("Creating....");
        try {

            if (agree) {

                const res = await axios.post(
                    "https://nodepune-flashloan.mobiloitte.com/api/v1/signup",
                    {
                        firstname: values.firstName,
                        lastname: values.lastName,
                        email: values.email,
                        password: values.password,
                        confirm_Password: values.confirmPassword,
                    }
                );
                console.log(res, "api data");
                if (res.status === 200) {
                    localStorage.setItem("apiData", JSON.stringify(res.data));
                    auth.setEndtime(moment().add(3, "m").unix());

                    setIsLoading(false);
                    setBtnText("CREATE AN ACCOUNT");
                    console.log(res, "responsesdf");
                    toast.success("OTP sent successfully, Please check your email.");
                    if (res.data.success == true) {
                        setIsLoading(true);
                        auth.setEndtime(moment().add(3, "m").unix());

                        setTimeout(() => {
                            history.push("/signUpOtp");
                        }, 3000);
                        sessionStorage.setItem("email", res.data.user.email);
                        console.log(res, "res");
                    } else {
                        sessionStorage.setItem("email", res.data.user.email);

                        history.push("/signup");
                    }
                } else if (res.status === 403) {
                    toast.error("Email Already Registered");
                    setIsLoading(false);
                }
                return res;
            }

        } catch (error) {
            console.log(error);
            setIsLoading(false);

            // toast.error(error.message);
            console.log("sign up registration", error.response)
            if (
                error.response.data.message ===
                "Email is Already Register Please verify Email Address for Login OTP has been sent To Email"
            ) {
                console.log("otp send already");
                toast.success("OTP has been sent to your email");
                auth.setEndtime(moment().add(3, "m").unix());

                setTimeout(() => {
                    history.push("/signUpOtp");
                }, 3000);
            }
            if (
                error.response.data.message ===
                "OTP is Already Sent To Mail For Resend OTP Wait For 3 Min"
            ) {
                console.log("otp send already");
                toast.success("OTP has been sent to your email");
                auth.setEndtime(moment().add(3, "m").unix());

                setTimeout(() => {
                    history.push("/signUpOtp");
                }, 3000);
            }
            if (error.response.data.message === "Email is Already Exist") {
                toast.error("Email Already Registered");
                setIsLoading(false);
            }
            setBtnText("CREATE AN ACCOUNT");
        }
    };

    const checkboxHandler = () => {
        // if agree === true, it will be set to false
        // if agree === false, it will be set to true
        setAgree(!agree);
        // Don't miss the exclamation mark
        setIsLoading(false);
    };

    useEffect(() => {
        axios.get("/static/json/countries.json").then(function (response) {
            setCountries(response.data.countries);
            axios.get("/static/json/states.json").then(function (response) {
                setStates(response.data.states);
                // axios.get("/static/json/cities.json").then(function (response) {
                // setCities(response.data.cities);
                // });
            });
        });
    }, []);

    const changeStateList = (name) => {
        const selectted = states.filter((cont) => {
            return cont.name === name;
        });
        if (selectted.length !== 0) {
            const contId = selectted[0].id;
            // const allCity = cities.filter((city) => {
            // return city.state_id === contId;
            // });
            // setShowCities(allCity);
        }
    };

    const changeState = (e) => {
        const name = e.target.value;
        changeStateList(name);
    };

    const changeCountryList = (name) => {
        const selectted = countries?.filter((cont) => {
            return cont.name === name;
        });
        const contId = selectted[0]?.id;

        const allState = states?.filter((state) => {
            return state.country_id === contId;
        });
        setShowStates(allState);
    };

    const changeCountry = (e) => {
        const name = e.target.value;
        changeCountryList(name);
    };
    const showToast = () => {
        toast.error(
            "Please accept all the terms and conditions & privacy policies"
        );
    };
    console.log(agree, "agree");
    const exceptThisSymbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    return (
        <>
            {" "}
            <div>
                <ToastContainer />
            </div>
            <TopBar>
                <page>
                    <Grid className="d-flex height100">
                        <Box className="loginForm">
                            <Box className="signupBox">
                                <Box className="signupbox">
                                    <Formik
                                        initialValues={formInitialSchema}
                                        initialStatus={{
                                            success: false,
                                            successMsg: "",
                                        }}
                                        validationSchema={formValidationSchema}
                                        onSubmit={(values) => handleFormSubmit(values)}
                                    >
                                        {({
                                            errors,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            touched,
                                            values,
                                            setFieldValue,
                                        }) => (
                                            <Form>
                                                <Grid
                                                    container
                                                    direction={"column"}
                                                    style={{ marginTop: "-2%" }}
                                                >
                                                    <Grid item>
                                                        <Box className={classes.logosec}>
                                                            <Logo width="110" style={{ cursor: "pointer" }} />
                                                        </Box>
                                                    </Grid>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            padding: "23px 22px 0px 33px",
                                                            gap: "2rem",
                                                        }}
                                                    >
                                                        <Grid item mt={4}>
                                                            <Typography className={classes.title1}>
                                                                First Name
                                                            </Typography>
                                                            <TextField
                                                                onKeyDown={(e) =>
                                                                    exceptThisSymbols.includes(e.key) &&
                                                                    e.preventDefault()
                                                                }
                                                                placeholder="Enter your First name"
                                                                type="text"
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                name="FirstName"
                                                                inputProps={{ maxLength: 256 }}
                                                                value={values.firstName}

                                                                error={Boolean(
                                                                    touched.firstName && errors.firstName
                                                                )}
                                                                onBlur={handleBlur("firstName")}
                                                                onChange={handleChange("firstName")}
                                                                // autocomplete="none"
                                                                autoComplete="off"
                                                                InputProps={{

                                                                    className: classes.textfiled1,
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <Box
                                                                                style={{
                                                                                    borderRight: "0.5px solid #7A7A7A",
                                                                                }}
                                                                            >
                                                                                <BsPerson
                                                                                    style={{
                                                                                        marginLeft: "-2px",
                                                                                        marginRight: "10px",
                                                                                        width: "12px",
                                                                                        color: "#00A4EF",
                                                                                        fontSize: "20px",
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            <FormHelperText
                                                                error
                                                                style={{ fontSize: "12px", marginLeft: "3%" }}
                                                            >
                                                                {touched.firstName && errors.firstName}
                                                            </FormHelperText>
                                                        </Grid>

                                                        <Grid item mt={4}>
                                                            <Typography className={classes.title1}>
                                                                Last Name
                                                            </Typography>
                                                            <TextField
                                                                onKeyDown={(e) =>
                                                                    exceptThisSymbols.includes(e.key) &&
                                                                    e.preventDefault()
                                                                }
                                                                placeholder="Enter Your Last Name"
                                                                type="text"
                                                                variant="outlined"
                                                                fullWidth
                                                                size="small"
                                                                name="LastName"
                                                                inputProps={{ maxLength: 256 }}
                                                                value={values.lastName}
                                                                error={Boolean(
                                                                    touched.lastName && errors.lastName
                                                                )}
                                                                onBlur={handleBlur("lastName")}
                                                                onChange={handleChange("lastName")}
                                                                // autocomplete="none"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    className: classes.textfiled1,
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <Box
                                                                                style={{
                                                                                    borderRight: "0.5px solid #7A7A7A",
                                                                                }}
                                                                            >
                                                                                <BsPerson
                                                                                    style={{
                                                                                        marginLeft: "-2px",
                                                                                        marginRight: "10px",
                                                                                        width: "12px",
                                                                                        color: "#00A4EF",
                                                                                        fontSize: "20px",
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            <FormHelperText
                                                                error
                                                                style={{ fontSize: "12px", marginLeft: "3.5%" }}
                                                            >
                                                                {touched.lastName && errors.lastName}
                                                            </FormHelperText>
                                                        </Grid>
                                                    </div>
                                                    <Grid item mt={3}>
                                                        <Typography className={classes.title2}>
                                                            Email
                                                        </Typography>
                                                        <TextField
                                                            style={{
                                                                width: "434px",
                                                                height: "48px",
                                                                padding: " 0px 0px 0px 36px",
                                                            }}
                                                            placeholder="Enter Your Email"
                                                            type="text"
                                                            variant="outlined"
                                                            fullWidth
                                                            size="small"
                                                            name="email"
                                                            value={values.email}
                                                            inputProps={{ maxLength: 256 }}
                                                            error={Boolean(touched.email && errors.email)}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            // autocomplete="none"
                                                            autoComplete="off"
                                                            InputProps={{
                                                                className: classes.textfiled,
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <Box
                                                                            style={{
                                                                                borderRight: "0.5px solid #7A7A7A",
                                                                            }}
                                                                        >
                                                                            <BsEnvelope
                                                                                style={{
                                                                                    marginLeft: "-2px",
                                                                                    marginRight: "10px",
                                                                                    width: "12px",
                                                                                    color: "#00A4EF",
                                                                                    fontSize: "20px",
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                        {touched.email && errors.email && (
                                                            <FormHelperText
                                                                error
                                                                style={{
                                                                    fontSize: "12px",
                                                                    marginLeft: "7%",
                                                                }}
                                                            >
                                                                {touched.email && errors.email}
                                                            </FormHelperText>
                                                        )}
                                                    </Grid>

                                                    <Grid item>
                                                        <FormControl fullWidth>
                                                            <Box
                                                                style={{
                                                                    width: "100%",
                                                                    marginTop: "-0px",
                                                                    marginBottom: "17px",
                                                                }}
                                                            >
                                                                <Typography className={classes.title2}>
                                                                    Password
                                                                </Typography>
                                                                <TextField
                                                                    style={{ padding: " 0px 0px 0px 36px" }}
                                                                    className={classes.inputvalue}
                                                                    placeholder="Enter Your Password"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    autoComplete="new-password"
                                                                    fullWidth
                                                                    type={showPassword ? "text" : "password"}
                                                                    inputProps={{ maxLength: 16 }}
                                                                    value={values.password}
                                                                    name="password"
                                                                    error={Boolean(
                                                                        touched.password && errors.password
                                                                    )}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    InputProps={{
                                                                        className: classes.textfiled,
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    onClick={() =>
                                                                                        setShowPassword(!showPassword)
                                                                                    }
                                                                                    edge="end"
                                                                                >
                                                                                    <Box className={classes.passsec}>
                                                                                        {showPassword ? (
                                                                                            <AiOutlineEye
                                                                                                style={{
                                                                                                    color: "#7A7A7A",
                                                                                                    // color: "#7A7A7A",
                                                                                                    fontSize: "18px",
                                                                                                    display: "flex",
                                                                                                    justifyContent: "center",
                                                                                                    alignItems: "center",
                                                                                                }}
                                                                                            />
                                                                                        ) : (
                                                                                            <AiOutlineEyeInvisible
                                                                                                style={{
                                                                                                    color: "#7A7A7A",
                                                                                                    // color: "#7A7A7A",
                                                                                                    fontSize: "18px",
                                                                                                    display: "flex",
                                                                                                    justifyContent: "center",
                                                                                                    alignItems: "center",
                                                                                                }}
                                                                                            />
                                                                                        )}
                                                                                    </Box>
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        ),
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <Box
                                                                                    style={{
                                                                                        borderRight: "0.5px solid #7A7A7A",
                                                                                    }}
                                                                                >
                                                                                    <AiOutlineLock
                                                                                        style={{
                                                                                            marginLeft: "-2px",
                                                                                            marginRight: "10px",
                                                                                            width: "14px",
                                                                                            color: "#00A4EF",
                                                                                            fontSize: "22px",
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}
                                                                />
                                                                <FormHelperText
                                                                    error
                                                                    style={{ fontSize: "12px", marginLeft: "7%" }}
                                                                >
                                                                    {touched.password && errors.password}
                                                                </FormHelperText>
                                                            </Box>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        style={{ marginBottom: "10px", marginTop: "-17px" }}
                                                    >
                                                        <FormControl fullWidth>
                                                            <Box
                                                                style={{ width: "100%" }}
                                                                className={classes.loginForm1}
                                                            >
                                                                <Typography className={classes.title2}>
                                                                    Confirm Password
                                                                </Typography>
                                                                <TextField
                                                                    style={{
                                                                        width: "434px",
                                                                        boxShadow: "none",
                                                                        height: "48px",

                                                                        padding: " 0px 0px 0px 36px",
                                                                    }}
                                                                    placeholder="Enter Your Confirm Password"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    value={values.confirmPassword}
                                                                    type={showPassword1 ? "text" : "password"}
                                                                    name="confirmPassword"
                                                                    // placeholder="Confirm your password"
                                                                    error={Boolean(
                                                                        touched.confirmPassword &&
                                                                        errors.confirmPassword
                                                                    )}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    inputProps={{ maxLength: 16 }}
                                                                    InputProps={{
                                                                        className: classes.textfiled,
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <IconButton
                                                                                    onClick={() =>
                                                                                        setShowPassword1(!showPassword1)
                                                                                    }
                                                                                    edge="end"
                                                                                >
                                                                                    <Box className={classes.passsec}>
                                                                                        {showPassword1 ? (
                                                                                            <AiOutlineEye
                                                                                                style={{
                                                                                                    color: "#7A7A7A",
                                                                                                    // color: "#7A7A7A",
                                                                                                    fontSize: "18px",
                                                                                                    display: "flex",
                                                                                                    justifyContent: "center",
                                                                                                    alignItems: "center",
                                                                                                }}
                                                                                            />
                                                                                        ) : (
                                                                                            <AiOutlineEyeInvisible
                                                                                                style={{
                                                                                                    color: "#7A7A7A",
                                                                                                    // color: "#7A7A7A",
                                                                                                    fontSize: "18px",
                                                                                                    display: "flex",
                                                                                                    justifyContent: "center",
                                                                                                    alignItems: "center",
                                                                                                }}
                                                                                            />
                                                                                        )}
                                                                                    </Box>
                                                                                </IconButton>
                                                                            </InputAdornment>
                                                                        ),
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <Box
                                                                                    style={{
                                                                                        borderRight: "0.5px solid #7A7A7A",
                                                                                    }}
                                                                                >
                                                                                    <AiOutlineLock
                                                                                        style={{
                                                                                            marginLeft: "-2px",
                                                                                            marginRight: "10px",
                                                                                            width: "14px",
                                                                                            color: "#00A4EF",
                                                                                            fontSize: "22px",
                                                                                        }}
                                                                                    />
                                                                                </Box>
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}
                                                                />
                                                                <FormHelperText
                                                                    error
                                                                    style={{ fontSize: "12px", marginLeft: "7%" }}
                                                                >
                                                                    {touched.confirmPassword &&
                                                                        errors.confirmPassword}
                                                                </FormHelperText>
                                                            </Box>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        style={{ display: "inline", marginLeft: "5%" }}
                                                    >
                                                        <Box className={classes.checkbox}>
                                                            <FormControl component="fieldset">
                                                                <FormGroup aria-label="position" row>
                                                                    <div>
                                                                        <FormControlLabel
                                                                            value="end"
                                                                            control={
                                                                                <Checkbox
                                                                                    color="secondary"
                                                                                    onChange={checkboxHandler}
                                                                                    style={{
                                                                                        Border: "1px solid #3563F6",
                                                                                        borderRadius: "2px",
                                                                                    }}
                                                                                />
                                                                            }
                                                                        />

                                                                        <label
                                                                            color="primary.main"
                                                                            variant="body1"
                                                                            className={classes.TearmCondition}
                                                                        >
                                                                            I Accept&nbsp;
                                                                            <Link
                                                                                component={RouterComponent}
                                                                                to="/term"
                                                                                className={classes.newbox}
                                                                                style={{
                                                                                    fontWeight: "700",
                                                                                    color: "#00A4EF",
                                                                                }}
                                                                            >
                                                                                Terms & Conditions{" "}
                                                                            </Link>
                                                                            and &nbsp;
                                                                            <Link
                                                                                component={RouterComponent}
                                                                                to="/policy"
                                                                                className={classes.newbox}
                                                                                style={{
                                                                                    fontWeight: "700",
                                                                                    color: "#00A4EF",
                                                                                }}
                                                                            >
                                                                                Privacy policy{" "}
                                                                            </Link>
                                                                        </label>
                                                                    </div>
                                                                </FormGroup>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>

                                                    {/* 
<Box style={{ width: "100%" }}>
<form
onSubmit={() => {
recaptchaRef.current.execute();
}}
>
<ReCAPTCHA
// ref={recaptchaRef}
checked={done}
// size="invisible"
// size="invisible"
// originsitekey 6Lc2nUIgAAAAAHhIawk-yJCvv4wIUcYZiE1gFlc3
// sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
sitekey="6Lc2nUIgAAAAAHhIawk-yJCvv4wIUcYZiE1gFlc3"
onChange={() => setDone(true)}
/>
</form>
</Box> */}
                                                    <Grid item mt={1}>
                                                        {agree == true ? (
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                type="submit"
                                                                className={classes.buttonbox}
                                                                disabled={isLoading}
                                                                onClick={handleSubmit}
                                                            >
                                                                Sign Up
                                                                {/*{isLoading && <ButtonCircularProgress />}*/}
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                type="submit"
                                                                className={classes.buttonbox}
                                                                //disabled={isLoading}
                                                                onClick={showToast}
                                                            >
                                                                Sign Up

                                                            </Button>
                                                        )}

                                                    </Grid>

                                                    <Grid item>
                                                        <Typography
                                                            color="primary.main"
                                                            variant="body1"
                                                            className={classes.account}
                                                        >
                                                            Already have an account?&nbsp;
                                                            <Link
                                                                component={RouterComponent}
                                                                to="/login"
                                                                style={{
                                                                    fontWeight: "500",
                                                                    color: "#00A4EF",
                                                                    fontSize: '14px'
                                                                }}
                                                            >
                                                                Sign In
                                                            </Link>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </page>
            </TopBar>
        </>
    );
}

export default Signup;