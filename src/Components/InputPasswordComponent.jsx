import { useState } from "react";
import { Form } from "react-bootstrap";

const InputPasswordComponent = (props) => {
    let [passShow, setIsPassShow] = useState(false);
  
    return(
      <div className="position-relative">
        <Form.Control
          type={`${passShow ? "text" : "password"}`}
          {...props}
        />
        <i className={`bi ${passShow ? "bi-eye-slash-fill" : "bi-eye-fill"} absolute`} style={{position: "absolute", "right": "10%", top: "25%", cursor: "pointer"}} onClick={()=>setIsPassShow(!passShow)}></i>
      </div>
    )
}

export default InputPasswordComponent