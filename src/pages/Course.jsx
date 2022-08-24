import React from 'react'
import { useParams } from 'react-router-dom';

export default function Course() {
  const { courseId } = useParams();
  const courseIdParsed = courseId.substring(0,25);
  //corta solo el id

  return (
    <div>{'curso: '+courseIdParsed}</div>
  )
}
