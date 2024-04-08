const ValidationUpload = (values) => {
    const error = {
        // email: "",
       beatname:"",
       price:"",
       beatsound:"",
       
    };

    // const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const beatname_pattern =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    // if (values.email === "") {
    //     error.email = "Email is Required!";
    // } else if (!email_pattern.test(values.email)) {
    //     error.email = "Email did not match";
    // }

    if (values.beatname === "") {
        error.beatname= "BeatName is Required!";
    }

    if (values.price === "") {
        error.price = "Price is Required!";
    } 
    if(values.beatsound === ""){
        error.price = "Beat Sound is Required"
    }else if (!beatname_pattern.test(values.beatname)) {
        error.password =
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
    }

    return error;
};

export default ValidationUpload;