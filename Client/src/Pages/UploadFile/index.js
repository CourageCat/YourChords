import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./UploadFile.module.scss";
import { useState } from "react";
import axios from "axios";


const cx = classNames.bind(styles);

function UploadFile() {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState({started: false, pc: 0});
    const [msg, setMsg] = useState(null);
    
    function handleUpload(){
        if (!file) {
            setMsg("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        // for (let i=0; i<file.length; i++){
        //     formData.append('file${i+1}', file[i]);
        // }
        setMsg("Uploading...");
        setProgress(prevState => {
            return {...prevState, started: true}
        })
        
        axios.post('http://httpbin.org/post', formData, {
            onUploadProgress: (progressEvent) => {setProgress(prevState => {
                return {...prevState, pc: progressEvent.progress*100}
            })},
           
            headers: {
                "Custom-Header": "value",
            }
        })

        
        .then(
            res => {
                setMsg("Upload successful");
                console.log(res.data)
            }
        )
        .catch(err => {
            setMsg("Upload failed");
            console.error(err);
        });
    }
return (
    <div className={cx("wrapper-uploadfile")}>
       <h1>Uploadding Files</h1>
       <input onChange={(e) => {setFile(e.target.files[0])}} type="file"/>
        <button onClick={handleUpload}>Upload</button>
        {progress.started && <progress max="100" value={progress.pc}></progress>}
        { msg && <span>{msg}</span>}
    </div>
  );
}

export default UploadFile;