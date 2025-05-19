import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import CommonFooter from "../../core/common/footer/commonFooter";
import { useSelector } from "react-redux";
import { useUserProfileUpdateMutation } from "../../core/redux/api/userApi";
import { City, State } from "../../core/common/selectOption/selectOption";
import Select from "react-select";
const Profile = () => { 
  const user = useSelector((state) => state.user.user);
  const [modifiedFields, setModifiedFields] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const initialFormState = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    Address: user.Address || '',
    mobile: user.mobile || '',
    userName: user.userName || '',
    photoUrl: user.photoUrl || ''
  }

  // When component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        Address: user.Address || '',
        mobile: user.mobile || '',
        userName: user.userName || '',
        photoUrl: user.photoUrl || ''
      });
      setSelectedImage(user.photoUrl || null);
      setModifiedFields({});
      setImageFile(null);
    }
  }, [user]);
  const [updateProfile, {isLoading: isUpdating}] = useUserProfileUpdateMutation();
  const [formData, setFormData] = useState(initialFormState);
  const [selectedImage, setSelectedImage] = useState(formData.photoUrl || null);
  console.log("user useSelector", user);

  console.log("user",user.email);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const handleRemoveImage = () => {
    setSelectedImage(''); 
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setModifiedFields(prev => ({ ...prev, [name]: true }));
  };
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      
      // Only append modified fields
      Object.keys(modifiedFields).forEach(key => {
        if (modifiedFields[key] && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append the image file if it exists
      if (imageFile) {
        formDataToSend.append('Image', imageFile);
        // Ensure photoUrl is marked as modified
        if (!modifiedFields.photoUrl) {
          formDataToSend.append('photoUrl', '');
        }
      }
      
      // Only proceed if there are actual changes
      if (formDataToSend.entries().next().done && !imageFile) {
        alert('No changes detected');
        return;
      }
      
      // Call the mutation
      await updateProfile(formDataToSend).unwrap();
      
      // Show success message
      alert('Profile updated successfully!');
      
      // Reset modified fields after successful update
      setModifiedFields({});
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(error?.data?.message || 'Failed to update profile. Please try again.');
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      if (file.size <= 2 * 1024 * 1024) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setImageFile(file);
        setModifiedFields(prev => ({ ...prev, photoUrl: true })); // Mark photo as modified
      } else {
        alert("File must be less than 2MB.");
      }
    } else {
      alert("Only JPG and PNG files are allowed.");
    }
  };
  
  console.log("formdata", formData.photoUrl);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Profile</h4>
            <h6>User Profile</h6>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-header">
            <h4>Profile</h4>
          </div>
          <div className="card-body profile-body">
            <h5 className="mb-2">
              <i className="ti ti-user text-primary me-1" />
              Basic Information
            </h5>
            <div className="profile-pic-upload image-field">
            <div className="profile-pic p-2">
            {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="User"
                  className="object-fit-cover h-100 rounded-1"
                />
              ) : (
                <ImageWithBasePath
                  src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                  alt="Default"
                  className="object-fit-cover h-100 rounded-1"
                />
              )}
                <button type="button" className="close rounded-1" onClick={handleRemoveImage}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
               <div className="new-employee-field">
              <div className="mb-0">
                <div className="image-upload mb-0 d-inline-flex">
                  <input type="file" accept="image/png, image/jpeg image" onChange={handleImageChange}/>
                  <div className="image-uploads">
                   <h4>Change Image</h4> 
                  </div>
                </div>
                <p className="fs-13 fw-medium mt-2">
                  Upload an image below 2 MB, Accepted File format JPG, PNG
                </p>
              </div>
               </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    First Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Jeffry"
                    name="firstName"
                    value={formData.firstName}
                    onChange={ handleInputChange} 
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    Last Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Jordan"
                    value={formData.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    User Name<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Jeffry Jordan"
                    value={formData.userName}
                    onChange={ handleInputChange} 
                  />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label>
                    Email<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue="jeffry@example.com"
                    value={user.email}
                  
                    readOnly
                  />
                </div>
              </div>
           
               <div className="card-title-head">
                  <h6 className="fs-16 fw-bold mb-3">
                      <span className="fs-16 me-2">
                          <i className="ti ti-map-pin" />
                      </span>
                      Address Information
                  </h6>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <div className="mb-3">
                          <label className="form-label">
                              Address <span className="text-danger">*</span>
                          </label>
                          <input className="form-control"  type="text"
                   
                    // defaultValue=""
                    value={formData.Address}
                    onChange={ handleInputChange} />
                      </div>
                  </div>
{/*                  
                  <div className="col-md-6">
                      <div className="mb-3">
                          <label className="form-label">
                              State <span className="text-danger">*</span>
                          </label>
                          <Select
                              classNamePrefix="react-select"
                              options={State}
                              placeholder="Choose"
                          />
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="mb-3">
                          <label className="form-label">
                              City <span className="text-danger">*</span>
                          </label>
                          <Select
                              classNamePrefix="react-select"
                              options={City}
                              placeholder="Choose"
                          />
                      </div>
                  </div> */}
                  <div className="col-md-6">
                      <div className="mb-3">
                          <label className="form-label">
                              Postal Code <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" />
                      </div>
                  </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    Phone Number<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={+17468314286}
                    className="form-control"
                    value={formData.mobile}
                    onChange={ handleInputChange} 
                  />
                </div>
              </div>
            
              {/* <div className="col-lg-6 col-sm-12">
                <div className="mb-3">
                  <label className="form-label">
                    Password<span className="text-danger ms-1">*</span>
                  </label>
                  <div className="pass-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="pass-input form-control"
                    />
                    <span
                      className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"
                        }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>

                </div>
              </div> */}
              <div className="col-12 d-flex justify-content-end">
                <Link
                  to="#"
                  className="btn btn-secondary me-2 shadow-none"
                >
                  Cancel
                </Link>
                <Link
                  to="#"
                  className="btn btn-primary shadow-none"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
      <CommonFooter />
    </div>

  );
};

export default Profile;
