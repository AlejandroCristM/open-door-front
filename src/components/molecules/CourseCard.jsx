import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import ButtonAndIcon from "../atoms/ButtonAndIcon";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../hooks/useUserState";
import axios from "axios";

export default function CourseCard({ id, title, description, status }) {
  const navigate = useNavigate();
  const { userRole, userId } = useUserState();
  const urlFriendly = title.replaceAll(" ", "-").toLowerCase();

  const handleCourseClick = () => {
    navigate(`/course/${id}-${urlFriendly}`);
  };

  const handleCancelCourse = () => {
    const options = {
      method: 'DELETE',
      url: `https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/course/detail/${id}/remove`,
      headers: {userId: userId}
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  };

  let styles = "";

  if (status) {
    styles += " w-3/4";
  } else {
    styles += " w-32";
  }

  return (
    <section
      className={
        "flex flex-col h-auto bg-blue-lt p-2 text-white text-center rounded-lg divide-y md:w-72 " +
        styles
      }
    >
      <div className="flex h-16 items-center">
        <h3 className="w-full text-center text-base pb-2">{title}</h3>
      </div>
      <div className="flex flex-col">
        {description ? (
          <div className="hidden px-5 w-full h-32 md:flex md:items-center">
            {description}
          </div>
        ) : (
          <div className="px-5 w-full h-10 flex items-center">{status}</div>
        )}
        <div className="flex flex-row justify-center items-center space-x-2 p-2 md:px-5">
          <ButtonAndIcon
            text="ver más"
            icon={<AiOutlineEye className="h-5 w-5 text-white" />}
            otherStyles="bg-orange-lt"
            responsive={true}
            onClick={handleCourseClick}
          />
          {userRole === "admin" ? null : window.location.pathname ===
            "/courses" ? null : (
            <ButtonAndIcon
              text="Cancelar"
              icon={<MdClose className="h-5 w-5 text-white" />}
              otherStyles="bg-orange-lt"
              responsive={true}
              onClick={handleCancelCourse}
            />  
          )}
        </div>
      </div>
    </section>
  );
}
