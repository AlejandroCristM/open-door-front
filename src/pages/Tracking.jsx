import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/atoms/Loading";
import { nanoid } from "nanoid";
import CourseCard from "../components/molecules/CourseCard";
import { useUserState } from "../hooks/useUserState";
import ButtonAndIcon from "../components/atoms/ButtonAndIcon";
import { ImBooks } from "react-icons/im";


export default function Tracking() {
  const { user, userId } = useUserState();

  const [courses, setCourses] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDataCourses = async () => {
      setIsLoading(true);
      if (userId) {
        const res = await axios.get(
          "https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/courses/" +
            userId,
          {
            headers: { email: user.email },
          }
        );
        setCourses(res.data.userCourses);
      }
    };
    fetchUserDataCourses();
    setIsLoading(false);
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!courses) {
    return (
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-blue-lt">
              <span className="sr-only">
                Tus Cursos son <strong>0</strong>
              </span>
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Actualmente no tienes progreso en ningún curso.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              Te invitamos a iniciar tu aprendizaje de la mano de OpenDoor.
            </p>

            <a
              className="flex w-full justify-center"
              rel="noopener noreferrer"
              href="/courses"
            >
              <ButtonAndIcon
                text="Ir a cursos"
                icon={<ImBooks className="h-5 w-5" />}
                otherStyles="bg-orange-lt text-white"
              />
            </a>
          </div>
        </div>
      </section>
    );
  }

  const courseList = courses.map((course) => {
    return (
      <CourseCard
        key={nanoid()}
        id={course.Course.id}
        title={course.Course.title}
        status={course.status}
      />
    );
  });

  return (
    <section className="flex flex-wrap w-full justify-center mt-4 gap-4 md:gap-8 lg:gap-12">
      {courseList}
    </section>
  );
}
