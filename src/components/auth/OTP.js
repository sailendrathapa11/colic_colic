import React, {useState}from 'react';
import "./OTP.css";
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { url } from '../constant';

const OTP =(props) => {

  const [send, setSend] = useState(null)
  console.log(typeof parseInt(send));

    const otpHandler=(e) => {
      // console.log(send);
      e.preventDefault ();
      axios.post(`${url}/auth/activateUser`, {OTP: parseInt(send)})
      .then(res =>{
        // console.log(res);
        props.history.push('/Login')
      }).catch(e => {
          // console.log(e);
      }) 
    }

    return (
      <div className="otp-section" onSubmit={(e)=> otpHandler(e)}>
        <p>COLIC</p>
      <form className="otp-div" >
        <p>Enter OTP</p>
      <OtpInput 
        className="otp-input"
        value={send}
        onChange={e=> setSend(e)}
        numInputs={6}
      />
      <button className="send-btn">Send</button>
      </form>
      </div>
    );
  }


  export default OTP;
// const OTP  = () => {
//   state = { otp: '' };
//   handleChange = otp => this.setState({ otp });

//   render() 
//   return (
//     <div className="otp-section">
//       <OtpInput
//         value={this.state.otp}
//         onChange={this.handleChange}
//         numInputs={6}
//         separator={<span>-</span>}
//       />
//       {/* <p className="header">COLIC</p>
//       <div className="otp-div">
//         <p className="enter-otp">Enter OTP</p>
//       </div> */}
//     </div>
//   );
// }

// export default OTP;
