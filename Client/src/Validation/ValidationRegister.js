const ValidationLogin = (values) => {
    const error = {
        // email: "",
        username: "",
        password: "",
    };

    // const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // if (values.email === "") {
    //     error.email = "Email is Required!";
    // } else if (!email_pattern.test(values.email)) {
    //     error.email = "Email did not match";
    // }

    if (values.username === "") {
        error.username = "Username is Required!";
    }
    if (values.password === "") {
        error.password = "Password is Required!";
    }
    return error;
};

export default ValidationLogin;