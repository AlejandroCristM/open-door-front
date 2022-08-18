import { nanoid } from 'nanoid'
import React from 'react'
import CourseCard from '../components/atoms/CourseCard'

export default function CourseList() {

  //*To-Do The next object will emulate the API's ops, instead of this will be the api conection
  // title => max 30 chars
  // description => max 150 chars just for item card
  
  const courses=[
    {
      id: nanoid(),
      title: 'Lógica de programación',
      description: 'Conceptos básicos relacionados a la lógica de programación, variables, condicionales, iteraciones o ciclos, estructuras de datos y buenas prácticas',
      duration: '80h'
    },
    {
      id: nanoid(),
      title: 'Flujo de trabajo Lean Tech',
      description: 'Conceptos fundamentales acerca de la organización que todo empleado a de conocer sobre nuestra familia y cultura organizacional',
      duration: '20h'
    }
  ]

  const courseItems = courses.map((course)=>{
    console.log('course: '+course)
    return(
      <CourseCard title={course.title} description={course.description} duration={course.duration} />
    )
  })

  return (
    <section className='flex flex-wrap w-full justify-center items-center mt-2 p-4 '>
      <h2 className='mb-2 text-xl font-semibold'>Courses</h2>
      <section className='flex flex-wrap w-full justify-center mt-4 gap-4 md:gap-8 lg:gap-12'>
        {courseItems}
      </section>
    </section>
  )
}
