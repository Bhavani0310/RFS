import React, { useEffect, useState } from "react";
import "./learning.css";
import { FaCheck } from "react-icons/fa6";
import LearningCard from "../../components/learningCard/LearningCard";
import PipelineCard from "../../components/pipelineCard/PipelineCard";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Ulogo from "../../assets/u-logo.png";
import Ylogo from "../../assets/y-logo.png";
import Clogo from "../../assets/c-logo.png";
import youtubeApi from "../../apis/youtube.api";
import { useRecoilState } from "recoil";
import currentUserState from "../../store/user.store";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Learning = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    youtubeApi.handlegetAllCourses({
      payload: { userId: currentLoggedInUser.userId },
      success: (response) => {
        console.log("response", response);
      },
      error: (error) => {
        console.log("error", error);
      },
    });
  }, []);

  return (
    <div className="learning__wrapper">
      <div className="learning__section">
        <h4 className="pb-3">My Learnings</h4>
        <div className="learning__card_section">
          <LearningCard val={70} />
          <LearningCard val={20} />
          <LearningCard val={50} />
          <LearningCard val={30} />
        </div>
      </div>

      <div className="learning__section2">
        <div className="learning__section2__button">
          <button
            style={{
              color: "white",

              background:
                "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
              border: "none",

              maxWidth: "250px",
              fontSize: "14px",
            }}
            onClick={handleShow}
          >
            Add New Learnings +
          </button>
        </div>
        {/* modal */}
        <Modal show={show} onHide={handleClose} size="lg" animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Set Learning Goal</Modal.Title>
          </Modal.Header>
          <div
            className="container"
            style={{ textAlign: "center", padding: "55px 25px" }}
          >
            <h4 className="my-4">Set Hourly Goal</h4>
            <div>
              <input
                style={{
                  width: "60px",
                  borderBottom: "2px solid #D1D5DB",
                  fontSize: "22px",
                  color: "#EB7C49",
                  fontWeight: "500",
                }}
                type="number"
                width="5px"
                placeholder="30"
              />{" "}
              <span style={{ color: "rgba(126, 126, 126, 1)" }}>hours /</span>
              <select
                name="date"
                id=""
                style={{
                  backgroundColor: "#F3F3F3",
                  border: "1px solid #D1D5DB",
                  color: "black",
                  fontSize: "1rem",
                  borderRadius: "0.375rem",
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                  padding: "0.625rem",
                  paddingRight: "0.75rem",
                  fontWeight: "500",
                  margin: "0 15px",
                }}
              >
                <option value="Month">Week</option>
                <option value="Month">Month</option>
                <option value="Month">Year</option>
              </select>
            </div>

            <p
              style={{
                color: "rgba(126, 126, 126, 1)",
                fontSize: "18px",
                margin: "20px 15px",
              }}
            >
              The Verifier’s Email ID should be valid & It can be your <br />
              Tutor, principal or any management
            </p>
            <div
              className=""
              style={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                className=" d-flex flex-row btn justify-content-center align-items-center gap-2"
                style={{
                  color: "white",

                  background:
                    "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                  border: "none",

                  maxWidth: "250px",
                  fontSize: "14px",
                  margin: "15px 15px 30px",
                }}
              >
                Update Learning Goal
              </Button>
            </div>
          </div>
        </Modal>
        <div className="learing__section2_learningGoal">
          <div className="progress-bar">
            <p>41%</p>
            <progress
              value="7"
              min="0"
              max="100"
              style={{ visibility: "hidden", height: 0, width: 0 }}
            >
              71%
            </progress>
          </div>

          <div className="searning__section2_goal">
            <div>
              <h4>Monthly Learning Goal</h4>
              <small>
                Set the target and accomplish by tracking in real time
              </small>
              <p>23/60 hours</p>
            </div>
            <div>
              <HiOutlineDotsVertical fontSize={30} />
            </div>
          </div>
        </div>

        <div className="learning__pipeline">
          <h4>Pipeline</h4>
          <div className="learning__card">
            <PipelineCard
              accadamy={"Ren Segal"}
              course={"UI/UX Fundamentals"}
              img={Ulogo}
              company={"Udemy"}
            />
            <PipelineCard
              accadamy={"TCS Accadamy"}
              course={"Master Front End Development"}
              img={Ylogo}
              company={"YouTube"}
            />
            <PipelineCard
              accadamy={"UX/UI Guru"}
              course={"User Interface Designing MasterClass"}
              img={Clogo}
              company={"Coursera"}
            />
          </div>
        </div>

        <div className="learning__completed">
          <h4>
            Completed <FaCheck />
          </h4>
          <PipelineCard
            accadamy={"UI Geek"}
            img={Ulogo}
            company={"Udemy"}
            course={"UI/UX Basics A-Z"}
          />
        </div>
      </div>
    </div>
  );
};

export default Learning;
