import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/atoms/CourseCard";
import ButtonAndIcon from "../components/atoms/ButtonAndIcon";
import { MdAddCircleOutline } from "react-icons/md";
import { Dialog, DialogTitle, TextField, Button } from "@mui/material";
import { nanoid } from "nanoid";
import Loading from "../components/atoms/Loading";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

  const [newTitleCourse, setNewTitleCourse] = useState("");
  const [newDescriptionCourse, setNewDescriptionCourse] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataCourses = async () => {
      setIsLoading(true);
      const options = {
        method: "GET",
        url: "https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/courses",
        params: { offset: "0", limit: "10" },
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then(function (response) {
          setCourses(response.data.courses);
        })
        .catch(function (error) {
          console.error(error);
        });  
      setIsLoading(false);
    };
    fetchDataCourses();
  }, []);

  const courseItems = courses.map((course) => {
    return (
      <CourseCard
        key={nanoid()}
        title={course.title}
        description={course.description}
      />
    );
  });

  const handleCreateCourseClick = () => {
    const createCourse=async()=>{
      const options = {
        method: "POST",
        url: "https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/course/create",
        headers: { "Content-Type": "application/json" },
        data: { title: newTitleCourse, description: newDescriptionCourse },
      };

      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    createCourse();
    setIsCreateCourseOpen(false);
    setNewDescriptionCourse("");
    setNewTitleCourse("");
    navigate(0);
    //to-do show confirmation message and reload the page
  };

  return (
    <section className="flex flex-wrap w-full justify-center items-center mt-2 p-4 ">
      <div className="w-full px-5 py-2 flex flex-row justify-between md:px-20 md:py-5">
        <h2 className="mb-2 text-xl font-semibold">Cursos</h2>
        <ButtonAndIcon
          icon={<MdAddCircleOutline className="h-5 w-5 text-white" />}
          text="Añadir Curso"
          otherStyles="bg-orange-lt text-white"
          responsive={true}
          onClick={() => setIsCreateCourseOpen(true)}
        />
      </div>
      <section className="flex flex-wrap w-full justify-center mt-4 gap-4 md:gap-8 lg:gap-12">
        {isLoading ? <Loading /> : courseItems}
      </section>
      <Dialog
        open={isCreateCourseOpen}
        onClose={() => setIsCreateCourseOpen(false)}
        PaperProps={{ sx: { width: "80%", height: "auto" }}}
      >
        <DialogTitle>Añadir Curso</DialogTitle>

        <form className="w-full flex flex-col justify-center items-center">
          <TextField
            style={{ width: "80%", margin: "20px" }}
            type="text"
            label="Nombre del Curso"
            variant="outlined"
            required
            inputProps={{ maxLength: 30 }}
            onChange={(e) => setNewTitleCourse(e.target.value)}
          />
          <TextField
            style={{ width: "80%", margin: "20px" }}
            type="text"
            label="Descripción del Curso"
            variant="outlined"
            inputProps={{ maxLength: 150 }}
            multiline
            required
            rows={4}
            onChange={(e) => {
              setNewDescriptionCourse(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "200px", margin: "20px" }}
            onClick={handleCreateCourseClick}
          >
            Guardar
          </Button>
        </form>
      </Dialog>
    </section>
  );
}
