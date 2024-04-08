const Validation = (values) => {
    const error = {
        // email: "",
        username: "",
        password: "",
    };

    // const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const password_pattern =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

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
    } else if (!password_pattern.test(values.password)) {
        error.password =
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
    }

    return error;
};

export default Validation;