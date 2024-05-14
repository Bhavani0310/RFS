import React, { useEffect, useState } from "react";
import "./learningContent.css";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoMdAdd,
} from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import LearningContentCard from "../../components/learningContentCard/LearningContentCard";
import LearningContentSection from "../../components/learningContentSection2/LearningContentSection";
import youtubeApi from "../../apis/youtube.api";
import YoutubePlayer from "./YoutubePlayer";
import learningApi from "../../apis/learning.api";
import { useParams } from "react-router-dom";

const LearningContent = () => {
  const [data, setData] = useState();
  const [change, setChange] = useState(false);
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [updateNotes, setUpdateNotes] = useState({
    isEdit: false,
    videoTime: 0,
  });
  const [id, setId] = useState({
    courseId: "",
    videoId: "",
  });
  const [videoIndex, setVideoIndex] = useState(0);
  const params = useParams();

  useEffect(() => {
    youtubeApi.handleGetCourseById({
      suffPath: params.id,
      success: (response) => {
        console.log("get course by id success");
        setData(response.data.data);
        setId({
          courseId: data?.youtubeCourseId,
          videoId: data?.courseContent[videoIndex]?.snippet.resourceId.videoId,
        });
      },
      error: (error) => {
        console.log("error", error);
      },
    });
  }, [change, videoIndex]);
  useEffect(() => {
    learningApi.getNotes({
      suffPath: `?courseId=${data?.youtubeCourseId}&videoId=${data?.courseContent[videoIndex]?.snippet.resourceId.videoId}`,
      success: (res) => {
        console.log("get notes success");
        setAllNotes(res.data.notes);
      },
      error: (error) => {
        console.log("get notes error", error);
      },
    });
  }, [data, videoIndex]);

  const hanldeWriteNote = () => {
    if (!updateNotes.isEdit) {
      
      learningApi.addNotes({
        payload: {
          courseId: data?.youtubeCourseId,
          videoId: data?.courseContent[videoIndex]?.snippet.resourceId.videoId,
          videoTime: totalHours,
          notes: note,
        },
        success: (res) => {
          console.log("add note success");
          setNote("");
          setChange((prev) => !prev);
        },
        error: (error) => {
          console.log("add note error", error);
        },
      });
    } else {
      learningApi.updateNotes({
        payload: {
          courseId: id.courseId,
          videoId: id.videoId,
          videoTime: updateNotes.videoTime,
          notes: note,
        },
        success: (res) => {
          console.log("update note success");
          setNote("");
          setUpdateNotes({ isEdit: false, videoTime: 0 });
          setChange((prev) => !prev);
        },
        error: (error) => {
          console.log("update note error", error);
        },
      });
    }
  };
  const handleEditNote = (notes, videoTime) => {
    setUpdateNotes({
      isEdit: true,
      videoTime: videoTime,
    });
    setNote(notes);
  };
  const handleDeleteNote = (videoTime) => {
    learningApi.deleteNotes({
      suffPath: `?courseId=${data?.youtubeCourseId}&videoId=${data?.courseContent[videoIndex]?.snippet.resourceId.videoId}&videoTime=${videoTime}`,
      payload: {
        courseId: data?.youtubeCourseId,
        videoId: data?.courseContent[videoIndex]?.snippet.resourceId.videoId,
        videoTime: videoTime,
      },

      success: (res) => {
        console.log("delete note success");
        setChange((prev) => !prev);
      },
      error: (err) => {
        console.log("delete note failed", err);
      },
    });
  };
  return (
    <div className="learningContent">
      <div className="learningContent__wrapper">
        <div className="learningContent__section">
          <div className="learningContent__container1">
            <div className="learningContent__title">
              <p>
                My Learnings <IoIosArrowForward />
                {data?.courseMetaData.localized.title}
              </p>
              <p className="learningContent__udemy">
                Enrolled on <span>Youtube</span>
              </p>
            </div>

            {data ? (
              <YoutubePlayer
                totalHours={totalHours}
                setTotalHours={setTotalHours}
                courseId={data?.youtubeCourseId}
                videoId={
                  data?.courseContent[videoIndex]?.snippet.resourceId.videoId
                }
              />
            ) : (
              <div className="learningContent__video">
                <div className="learningContent__video_icon">
                  <FaPlay fontSize={50} />
                </div>
                <h1>Web Development</h1>
                <h2>MasterClass</h2>
              </div>
            )}
          </div>
          <div className="learningContent__notes">
            <div className="learningContent__notes_title">
              <h5>Notes</h5>
              <p>
                Sort by Latest <IoIosArrowDown />
              </p>
            </div>
            <div className="learningContent__inputs">
              <div className="learningContent__input_wrapper">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add new note at 3:12"
                />

                <IoMdAdd
                  onClick={hanldeWriteNote}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="learningContent__time">
                {allNotes.map((note) => (
                  <LearningContentCard
                    key={note._id}
                    time={note.videoTime}
                    courseId={id.courseId}
                    videoId={id.videoId}
                    content={note.text}
                    handleDeleteNote={handleDeleteNote}
                    handleEditNote={handleEditNote}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="learningContent__section2">
          <LearningContentSection
            setVideoIndex={setVideoIndex}
            courseId={params.id}
            videoIndex={videoIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default LearningContent;
