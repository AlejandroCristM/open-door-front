import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import CourseCard from '../components/atoms/CourseCard'
import ButtonAndIcon from '../components/atoms/ButtonAndIcon';
import { MdAddCircleOutline } from "react-icons/md";
import {Dialog, DialogTitle, TextField, Button} from '@mui/material';
import { nanoid } from 'nanoid';

export default function CourseList() {

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

  const [newTitleCourse, setNewTitleCourse] = useState('')
  const [newDescriptionCourse, setNewDescriptionCourse] = useState('')

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDataCourses = async () => {
      setIsLoading(true);
      const result = await axios.get('https://back-integrador.vercel.app/courses?offset=0&limit=10');
      setCourses(result.data.courses);
      setIsLoading(false);
    }
    fetchDataCourses();
  }, []);

  const courseItems = courses.map((course)=>{
    return(
      <CourseCard
        key={nanoid()} 
        id={course.id} 
        title={course.title} 
        description={course.description}
      />
    )
  })

  const handleCreateCourseClick = async () => {
    setIsCreateCourseOpen(false);
    // const response = await axios.post('https://back-integrador.vercel.app/courses/create', {
    //   courseTitle: newTitleCourse,
    //   description: newDescriptionCourse
    // })
    // console.log(response)
    setNewDescriptionCourse('')
    setNewTitleCourse('')
    navigate(0)
    //to-do show confirmation message and reload the page

  }

  return (
    <section className='flex flex-wrap w-full justify-center items-center mt-2 p-4 '>
      <div className='w-full px-5 py-2 flex flex-row justify-between md:px-20 md:py-5'>
       <h2 className='mb-2 text-xl font-semibold'>Courses</h2>
       <ButtonAndIcon 
        icon={<MdAddCircleOutline className='h-5 w-5 text-white'/>}
        text='Añadir Curso'
        otherStyles='bg-orange-lt text-white' 
        responsive={true}
        onClick={()=>setIsCreateCourseOpen(true)}
        />
      </div>
      <section className='flex flex-wrap w-full justify-center mt-4 gap-4 md:gap-8 lg:gap-12'>
        {isLoading ? <div className='mt-5 text-lg'>Loading...</div> : courseItems}
      </section>
      <Dialog 
        open={isCreateCourseOpen} 
        onClose={()=>setIsCreateCourseOpen(false)}
        PaperProps={{ sx: { width: "80%", height: "100%" } }}
      >
        <DialogTitle>Añadir Curso</DialogTitle>

        <form className='flex flex-col justify-center items-center'>
          <TextField
            style={{ width: 'auto', margin: "20px" }}
            type="text"
            label="Nombre del Curso"
            variant="outlined"
            required
            inputProps={{ maxLength: 30 }}
            onChange={(e)=>setNewTitleCourse(e.target.value)}
          />
          <TextField
            style={{ width: 'auto', margin: "20px" }}
            type="text"
            label="Descripción del Curso"
            variant="outlined"
            inputProps={{ maxLength: 150 }}
            multiline
            required
            rows={5}
            onChange={(e)=>{setNewDescriptionCourse(e.target.value)}}
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
  )
}
