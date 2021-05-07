import React,{useEffect, useState} from 'react';
import "./Profile.css";
import profileImage from "../images/profile.png";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { url, tokenName} from './constant';
import moment from "moment";

export const profileImageUpdate = (id, data) => {
  const fileData = new FormData();
  fileData.append("profileimage", data);
  axios({
    url: `${url}/auth/update_profileImage/${id}`,
    method: "put",
    dataType: "multipart/form-data",
    data: fileData,
    headers: { authorization: localStorage.getItem(tokenName)}
  })
    .then((res) => {
 console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
};

const Profile = () => {

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
  
  // console.log(image);
  const [profile, setProfile] = useState({name:'', gender: '', dateofbirth: ''});


  useEffect(() =>{
    axios({
      url: `${url}/auth/user_profile/`,
      method: "get",
      headers: { [tokenName]: localStorage.getItem(tokenName)},
    })      
      .then((res) => {
      setProfile(res.data.message[0])
      })
      .catch((err) => {
        console.log(err.response);
      });
  },[]);

  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const onCropComplete = (croppedAreaPixels) => {
	setCroppedArea(croppedAreaPixels);
    // console.log(croppedAreaPixels);
	};

  const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

  const uploadHandler = async() => {
    const croppedPhoto = await setImage(image, croppedArea);
    console.log(croppedPhoto);
  }

  const profileUpdateHandaler = (e) => {
      const {value, name} = e.target
      let typed = profile
      typed[name] = value
      setProfile({...typed})
      // console.log(e.target.value);
  }
  const profileSaveHandler=(e) =>{
    e.preventDefault();
    axios.post(`${url}auth/update_profile`, profile)
  }

  return (
    <div className="profile-div">
      <div className="heading">
        <p>My Profile</p>
      </div>
      <div className="photo-upload">
        <img src={profileImage} alt="profile"/>
        <input type="file" accept="image/*" ref={inputRef} style={{display:"none"}} onChange={onSelectFile}/>
        <CameraAltIcon className="camera-icon" onClick={triggerFileSelectPopup}/>
        <p>Joe Miller</p>
        </div>
        <form action="submit" onSubmit={(e)=> profileSaveHandler(e)}>
        <div  className="name">
          <div className="fname">
            <label htmlFor="" className="fname-label">Full Name</label>
            <input value={profile.name} autoComplete="off" name="name" onChange={(e)=>profileUpdateHandaler(e)} type="text" className="fname-input"/>
          </div>
          <div className="profile-username">
            <label htmlFor="" className="pusername-label">Username</label>
            <input value={profile.username} disabled type="text" className="pusername-input"/>
          </div>
        </div>
        <div className="date-gender">
          <div className="gender">
            <label htmlFor="" className="gender-label">Gender</label>
            <select value={profile.gender} name="gender" className="gender-input" id="gender-identity" onChange={(e)=>profileUpdateHandaler(e)}>
              <option className="male-female" value="male">Male</option>
              <option className="male-female" value="female">female</option>
            </select>
          </div>
          <div className="date">
            <label className="ldate" htmlFor="">Birthday</label>
            <input value={moment(profile.dateofbirth).format("YYYY-MM-DD")} asp-for="MyDate" asp-format="{0:yyyy-MM-dd}" nmae="dateofbirth" className="idate" type="Date" onChange={(e)=>profileUpdateHandaler(e)}/>
          </div>
        </div> 
        <div className="profile-email">
          <label className="lemail" htmlFor="">Email</label>
          <input value={profile.email} disabled type="text" className="iemail"/>
        </div>
        <button type='submit' className="save-btn">Save</button>
        </form>
        <img src={croppedArea?URL.createObjectURL(croppedArea):""} alt=""/>
        {image ? (<div className='container-cropper'>
            
                <div className='cropper'>
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                
            
             <div className='slider'>
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </div>
            <div className="button">
                 <button className="btn-cancle" onClick={()=>{setImage(null)}}>Cancle</button>
                 <button className="btn-save" onClick={uploadHandler} >Save</button>
              </div>
          </div>) : null}
          
      </div>
      
  )
}

export default Profile;
