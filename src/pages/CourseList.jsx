import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CourseCard from '../components/atoms/CourseCard'

export default function CourseList() {

  //*To-Do The next object will emulate the API's ops, instead of this will be the api conection
  // title => max 30 chars
  // description => max 150 chars just for item card

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
    console.log('course: '+course)
    return(
      <CourseCard id={course.id} title={course.title} description={course.description}/>
    )
  })

  return (
    <section className='flex flex-wrap w-full justify-center items-center mt-2 p-4 '>
      <h2 className='mb-2 text-xl font-semibold'>Courses</h2>
      <section className='flex flex-wrap w-full justify-center mt-4 gap-4 md:gap-8 lg:gap-12'>
        {isLoading ? <div className='mt-5 text-lg'>Loading...</div> : courseItems}
      </section>
    </section>
  )
}
