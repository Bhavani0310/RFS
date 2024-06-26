import tickWhite from "../assets/svg/tickWhite.svg";
import plus from "../assets/svg/plus.svg";
import edit from "../assets/svg/editIcon.svg";
import linkedIn from "../assets/profile/linkedIn.svg";
import facebook from "../assets/profile/facebook.svg";
import behance from "../assets/profile/behance.svg";
import personalWeb from "../assets/profile/personalWeb.svg";
import twitter from "../assets/profile/twitter.svg";
import greentick from "../assets/svg/greenTick.svg";
import instagram from "../assets/svg/instagram.svg";
import x from "../assets/svg/x.svg";
import linkedin from "../assets/svg/linkedin.svg";
import diamond from "../assets/svg/diamond.svg";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import profileApi from "../apis/profile.api";

const BasicProfile = ({ userProfile }) => {
  const [editMode, setEditMode] = useState(true);
  const [digiLocker, setDigilocker] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    username: "",
    dateOfBirth: "",
    gender: "",
    mobile: "",
    about: "",
    email: "",
  });
 
  const [socialLinksVal, setSocialLinksVal] = useState({
    linkedIn: "",
    instagram: "",
    twitter: "",
    facebook: "",
    behance: "",
    personalWebsite: "",
  });
  useEffect(() => {
    setData({
      fullName: userProfile?.fullName,
      username: userProfile?.username,
      dateOfBirth: userProfile?.dateOfBirth,
      email: userProfile?.email,
      gender: userProfile?.gender,
      mobile: userProfile?.mobile,
      about: userProfile?.about,
    });
    setSocialLinksVal({
      linkedIn: userProfile?.socialMedia?.linkedin,
      instagram: userProfile?.socialMedia?.instagram,
      twitter: userProfile?.socialMedia?.twitter,
      facebook: userProfile?.socialMedia?.facebook,
      behance: userProfile?.socialMedia?.behance,
      personalWebsite: userProfile?.socialMedia?.personalWebsite,
    });
  }, [userProfile]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const socialLinks = [
    {
      title: "LinkedIn",
      icon: linkedIn,
      placeholder: "https://www.linkedin.com/in/akshay-s-kumar-/",
      value: socialLinksVal.linkedIn,
      onchange: function (e) {
        setSocialLinksVal({ ...socialLinksVal, linkedIn: e.target.value });
      },
    },
    {
      title: "Instagram",
      icon: instagram,
      placeholder: "https://www.instagram.com/letitbeakshay/",
      value: socialLinksVal.instagram,
      onchange: function (e) {
        setSocialLinksVal({ ...socialLinksVal, instagram: e.target.value });
      },
    },
    {
      title: "Twitter",
      icon: twitter,
      placeholder: "",
      value: socialLinksVal.twitter,
      onchange: function (e) {
        setSocialLinksVal({ ...socialLinksVal, twitter: e.target.value });
      },
    },
    {
      title: "Facebook",
      icon: facebook,
      placeholder: "",
      value: socialLinksVal.facebook,
      onchange: function (e) {
        setSocialLinksVal({ ...socialLinksVal, facebook: e.target.value });
      },
    },
    {
      title: "Behance",
      icon: behance,
      placeholder: "",
      value: socialLinksVal.behance,
      onchange: function (e) {
        setSocialLinksVal({ ...socialLinksVal, behance: e.target.value });
      },
    },
    {
      title: "Personal Website",
      icon: personalWeb,
      placeholder: "",
      value: socialLinksVal.personalWebsite,
      onchange: function (e) {
        setSocialLinksVal({
          ...socialLinksVal,
          personalWebsite: e.target.value,
        });
      },
    },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const updateData = {
      ...data,
      socialMedia: {
        ...socialLinksVal,
      },
    };
    profileApi.updateBasicProfile({
      payload: updateData,
      success: (res) => {
        console.log("updated success!", res?.data);
        setEditMode(!editMode);
      },
      error: (err) => {
        console.log("failed to update basic profile details ", err);
      },
    });
    setEditMode(!editMode);
  };

  return (
    <div>
      <div className="row " style={{ paddingInlineEnd: "0" }}>
        <h3 className="col" style={{ fontSize: "18px", fontWeight: "700" }}>
          Basic Details
        </h3>
        <button
          type="button"
          className="col btn d-flex justify-content-around align-items-center gap-1  "
          style={{
            backgroundColor:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            color: "white",
            border: "none",
            padding: "revert-layer",
            maxWidth: "215px",
          }}
        >
          DigiLocker Connected
          {!digiLocker && <img src={plus} alt="add" width={20} height={20} />}
          {digiLocker && (
            <img src={tickWhite} alt="verified" width={20} height={20} />
          )}
        </button>
      </div>
      <form
        className="pt-4 d-flex gap-4 flex-column"
        style={{ color: "#8F8F8F", fontSize: "16px" }}
      >
        <div className="form-row d-flex gap-4 ">
          {/* fullname */}

          <div
            className="form-group col-6"
            style={{ position: "relative", zIndex: "1" }}
          >
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              className="form-control  "
              id="fullname"
              style={{
                backgroundColor: "#F3F3F3",
                color: "#858585",
                fontSize: "18px",
              }}
              onClick={() => {
                setEditMode(true);
              }}
              value={data.fullName}
              onChange={(e) => {
                setData({ ...data, fullName: e.target.value });
              }}
            />
            <span>
              {editMode && (
                <img
                  src={edit}
                  alt="editicon"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
              {!editMode && data.fullname && (
                <img
                  src={greentick}
                  alt="verified"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
            </span>
          </div>

          {/* username */}

          <div
            className="form-group col-6 "
            style={{ position: "relative", zIndex: 1 }}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control "
              style={{
                backgroundColor: "#F3F3F3",
                color: "#858585",
                fontSize: "18px",
              }}
              onClick={() => {
                setEditMode(true);
              }}
              id="username"
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
            />{" "}
            <span>
              {editMode && (
                <img
                  src={edit}
                  alt="editicon"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
              {!editMode && data.username && (
                <img
                  src={greentick}
                  alt="verified"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
            </span>
          </div>
        </div>

        {/* Date */}

        <div className="form-row d-flex gap-4">
          <div
            className="form-group col-6"
            style={{ position: "relative", zIndex: "1" }}
          >
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              data-format="yyyy-mm-dd"
              style={{
                backgroundColor: "#F3F3F3",
                color: "#858585",
                fontSize: "18px",
              }}
              value={data.dateOfBirth}
              placeholder={data.dateOfBirth}
              onChange={(e) => {
                setData({ ...data, dateOfBirth: e.target.value });
              }}
              onClick={() => {
                setEditMode(true);
              }}
            />
            {/* <span>
              {!editMode && data.date && (
                <img
                  src={greentick}
                  alt="verified"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
            </span> */}
          </div>

          {/* Gender */}

          <div
            className="form-group col-6 "
            style={{ position: "relative", zIndex: 1 }}
          >
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              id="gender"
              style={{
                backgroundColor: "#F3F3F3",
                color: "#858585",
                fontSize: "18px",
              }}
              value={data.gender}
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
              onClick={() => {
                setEditMode(true);
              }}
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <span>
              {!editMode && data.gender && (
                <img
                  src={greentick}
                  alt="verified"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
            </span>
          </div>
        </div>

        {/* mobile */}

        <div className="form-row d-flex gap-4">
          <div
            className="form-group col-6 "
            style={{ position: "relative", zIndex: 1 }}
          >
            <label htmlFor="phone">Mobile</label>
            <input
              type="tel"
              className="form-control  "
              id="phone"
              style={{
                backgroundColor: "#F3F3F3",
                color: "#858585",
                fontSize: "18px",
              }}
              value={data.mobile}
              onChange={(e) => {
                setData({ ...data, mobile: e.target.value });
              }}
              onClick={() => {
                setEditMode(true);
              }}
            />
            <span>
              {editMode && (
                <img
                  src={edit}
                  alt="editicon"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
              {!editMode && data.phone && (
                <img
                  src={greentick}
                  alt="verified"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
            </span>
          </div>
          <div
            className="form-group col-6"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* email */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control "
              style={{
                backgroundColor: "#F3F3F3",
                color: "#858585",
                fontSize: "18px",
              }}
              id="email"
              value={userProfile?.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              readOnly
            />{" "}
            <span>
              {editMode && (
                <img
                  src={edit}
                  alt="editicon"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
              {!editMode && data.email && (
                <img
                  src={greentick}
                  alt="verified"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    zIndex: "10",
                    width: "20px",
                  }}
                />
              )}
            </span>
          </div>
        </div>

        {/* Summary */}

        <div className="form-row " style={{ width: "100%" }}>
          <div className="form-group  " style={{ position: "relative" }}>
            <label htmlFor="summary">Summary</label>
            <textarea
              className="form-control  "
              id="summary"
              style={{
                backgroundColor: "#F3F3F3",
                color: "#858585",
                fontSize: "18px",
                width: "100%",
                minHeight: "150px",
              }}
              placeholder="You can generate a profile summary using AI from your experiences. Add Experiences like works and other accomplishments to activate this field."
              value={data.about}
              onChange={(e) => {
                setData({ ...data, about: e.target.value });
              }}
            />
            <span
              style={{
                position: "absolute",
                color: "#F04F52",
                fontSize: "14px",
                right: 50,
                top: "85%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <img src={diamond} alt="diamond" width={10} />
              Generate using AI
            </span>
          </div>
        </div>
        <div className="row  ">
          <div className="col-6  ">
            <div className="row px-2 ">
              {" "}
              <p className="col " style={{ fontWeight: "600" }}>
                {" "}
                Social media links
              </p>
              <div className="col">
                {!editMode && (
                  <ul className="d-flex gap-3">
                    <li>
                      <a href="#">
                        <img
                          src={linkedin}
                          alt="linkedin"
                          width={25}
                          height={25}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={instagram}
                          alt="instagram"
                          width={25}
                          height={25}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={x} alt="x" width={25} height={25} />
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {editMode && (
              <p
                onClick={handleShow}
                className=" d-flex flex-row btn justify-content-center align-items-center gap-2"
                style={{
                  color: "white",

                  background:
                    "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                  border: "none",

                  maxWidth: "250px",
                  fontSize: "14px",
                }}
              >
                Add Social Media Profiles{" "}
                <img src={plus} alt="add" width={15} height={15} />
              </p>
            )}
            <div className="">
              {/* Modal */}
              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Add your Social Media Links</Modal.Title>
                </Modal.Header>
                <form
                  className="p-3 py-2 d-flex gap-4 flex-column"
                  style={{ color: "#8F8F8F", fontSize: "18px" }}
                >
                  {socialLinks.map((item, i) => (
                    <div key={i} className="form-row d-flex gap-4 ">
                      <div
                        className="form-group col-6"
                        style={{
                          position: "relative",
                          zIndex: "1",
                          width: "400px  ",
                        }}
                      >
                        <label htmlFor="fullname">
                          <img
                            alt="linkedin"
                            style={{ marginRight: "5px" }}
                            width={22}
                            src={item.icon}
                          />
                          {item.title}
                        </label>
                        <input
                          type="text"
                          className="form-control  "
                          id="fullname"
                          style={{
                            backgroundColor: "#F3F3F3",
                            color: "#858585",
                            fontSize: "18px",
                            marginTop: "10px",
                            width: "410px",
                          }}
                          onClick={() => {
                            setEditMode(true);
                          }}
                          value={item.value}
                          onChange={(e) => item.onchange(e)}
                        />
                        <span>
                          {editMode && (
                            <img
                              src={edit}
                              alt="editicon"
                              style={{
                                position: "absolute",
                                top: "55%",
                                right: "10px",
                                zIndex: "10",
                                width: "20px",
                              }}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </form>
                <Modal.Footer>
                  <Button
                    onClick={handleClose}
                    className=" d-flex flex-row btn justify-content-center align-items-center gap-2"
                    style={{
                      color: "white",

                      background:
                        "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                      border: "none",

                      maxWidth: "250px",
                      fontSize: "14px",
                    }}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-start">
            {editMode && (
              <button
                className="btn btn-primary"
                style={{
                  background:
                    "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                  border: "none",
                }}
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicProfile;
