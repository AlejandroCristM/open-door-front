import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ButtonAndIcon from "../components/atoms/ButtonAndIcon";
import RelevantText from "../components/atoms/RelevantText";
import YouTubeVideo from "../components/atoms/YouTubeVideo";
import { AiOutlineDownload } from "react-icons/ai";
import "../styles/course.css";
import Loading from "../components/atoms/Loading";
import { useUserState } from "../hooks/useUserState";

export default function Course() {
  const { courseId } = useParams();
  const courseIdParsed = courseId.substring(0, 25);
  //Just get the id - URL friendly, 25 beacuse from backend the id is 25 chars long

  const [course, setCourse] = useState([]);
  const [courseStatus, setCourseStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useUserState();

  useEffect(() => {
    const fetchDataCourse = async () => {
      setIsLoading(true);
      const options = {
        method: "GET",
        url:
          "https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/course/detail/" +
          courseIdParsed,
        headers: { userId: userId },
      };

      await axios
        .request(options)
        .then(function (response) {
          setCourseStatus(response.data.course[0].status);
          setCourse(response.data.course[0].Course);
        })
        .catch(function (error) {
          console.error(error);
        });
      setIsLoading(false);
    };
    if(userId){
      fetchDataCourse();
    }
  }, [courseIdParsed, userId]);

  const courseContent = course?.courseContents?.map((content) => {
    switch (content.typeFile) {
      case "video":
        return (
          <div className="container-content" key={nanoid()}>
            <h3 className="subtitle-content">{content.name}</h3>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="description-content">{content.description}</p>
            </div>
            <YouTubeVideo url={content.file} />
          </div>
        );

      case "resource":
        return (
          <div className="container-content" key={nanoid()}>
            <h3 className="subtitle-content">{content.name}</h3>
            <p className="description-content">{content.description}</p>
            <div className="w-full flex justify-center">
              <ButtonAndIcon
                icon={<AiOutlineDownload className="h-5 w-5" />}
                text="Download"
                otherStyles="bg-orange-lt text-white"
                urlDocument={content.file}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  });

  const handleClickStartCourse = () => {
    setIsLoading(true);
    const fetchDataCourse = async () => {
      const options = {
        method: "PATCH",
        url: "https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/course/status",
        headers: { "Content-Type": "application/json" },
        data: {
          userId: userId,
          courseId: courseIdParsed,
          statusCourse: "InProgress",
        },
      };

      await axios
        .request(options)
        .then(function () {
          setCourseStatus("InProgress");
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchDataCourse();
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full flex flex-col justify-center items-center p-5">
      <div className="w-full md:w-4/5">
        <h1 className="pb-5 text-center text-xl text-blue-lt font-bold">
          {course.title}
        </h1>
        <RelevantText text={courseStatus} maxLegth={13} />
        <div className="w-full flex flex-col justify-center items-center">
          <p className="mt-5 mb-2 text-center md:mt-10 md:w-2/3">
            {course.description}
          </p>
        </div>
      </div>
      <section className="w-full flex flex-col justify-center items-center mt-5 space-y-10 md:mt-10">
        {courseStatus === "AbleToStart" ? (
          <ButtonAndIcon
            text={"Start Course"}
            otherStyles="bg-orange-lt text-white"
            responsive={false}
            onClick={handleClickStartCourse}
          />
        ) : null}
        {isLoading ? (
          <Loading />
        ) : courseStatus === "InProgress" || courseStatus === "Finished" ? (
          courseContent
        ) : null}
      </section>
    </section>
  );
}
