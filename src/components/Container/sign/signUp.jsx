// import React from "react";
// import React, {useState} from 'react'

// const SignUpPage = () => {
//   return <div>SignUpPage
//   </div>;
// };

import "./signUp.css";
import "./signCheck.js"
import React, { useState } from "react";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";

const config = require('./config');  

function App() {
    const [formValues, setFormValues] = useState({
        ADMNR_ID: "",
        ADMNR_PW: "",
        ADMNR_NM: "",
        ADMNR_EMAIL: "",
        //ENTR_DE: "",
        //MODF_DE: "",
        //SECE_DE: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const poolData = {
            UserPoolId: config.cognito.userPoolId,
            ClientId: config.cognito.clientId,
        };
        const userPool = new CognitoUserPool(poolData);

        const attributes = [
            new CognitoUserAttribute({ Name: "ADMNR_ID", Value: formValues.ADMNR_ID }),
            new CognitoUserAttribute({ Name: "ADMNR_PW", Value: formValues.ADMNR_PW }),
            new CognitoUserAttribute({ Name: "ADMNR_NM", Value: formValues.ADMNR_NM }),
            new CognitoUserAttribute({ Name: "ADMNR_EMAIL", Value: formValues.ADMNR_EMAIL }),
            //new CognitoUserAttribute({ Name: "ENTR_DE", Value: formValues.ENTR_DE }),
            //new CognitoUserAttribute({ Name: "MODF_DE", Value: formValues.MODF_DE }),
            //new CognitoUserAttribute({ Name: "SECE_DE", Value: formValues.SECE_DE }),
        ];
        userPool.signUp(formValues.ADMNR_ID, formValues.ADMNR_PW, attributes, null, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result.user);
        });
    };
        return (
            <div className="App">
              <form className="signForm" onSubmit={handleSubmit}>
                <h2>관리자 계정 등록</h2>
              <label>
                  Id<br/>
                  <input type="text" name="ADMNR_ID" value={formValues.age} onChange={handleInputChange} />
                </label>
                <label>
                  Password<br/>
                  <input type="password" name="ADMNR_PW" value={formValues.password} onChange={handleInputChange} />
                </label>
                <label>
                  Name<br/>
                  <input type="text" name="ADMNR_NM" value={formValues.name} onChange={handleInputChange} />
                </label>
                <label>
                  Email<br/>
                  <input type="email" name="ADMNR_EMAIL" value={formValues.email} onChange={handleInputChange} />
                </label><br/>
                  {/* <input type="hidden" name="ENTR_DE" value='0'onChange={handleInputChange} />
                  <input type="hidden" name="MODF_DE" value='0' onChange={handleInputChange} />
                  <input type="hidden" name="SECE_DE" value='0' onChange={handleInputChange} /> */}
                <button type="submit">Sign up</button>
              </form>
            </div>
          );
        }
    export default App;