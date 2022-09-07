import { nanoid } from 'nanoid';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import ButtonAndIcon from '../components/atoms/ButtonAndIcon';
import RelevantText from '../components/atoms/RelevantText';
import YouTubeVideo from '../components/atoms/YouTubeVideo';
import { AiOutlineDownload } from "react-icons/ai";
import '../styles/course.css';

  //contract for the api call - the api will return the course with the id
// const courseFromApi = {
//   id: nanoid(),
//   title: 'React Native: A Complete Guide',
//   description: 'React Native is a framework for building native apps using React. Native apps are apps that run on a device, rather than on a web browser.',
//   status: 'AbleToStart', //AbleToStart, InProgress, Finished
//   courseContent: [
//     {
//       id: 1,
//       name: 'Introduction to React Native',
//       description: 'This is the introduction video for React Native course, mainly about the framework itself and a quick overview of the components that are available.',
//       contentType: 'video',
//       url: 'https://www.youtube.com/watch?v=ovqPwKnwqhM&t' //embed url, admin should be able to add the video url, but embed url is not required
//     },{
//       id:2,
//       name: 'Environment Setup configuration file',
//       description: 'This is the configuration file for the React Native environment. It will show you how to configure the environment for the course. This is the second step to start building a React Native app.',
//       contentType: 'resource',
//       url: 'https://drive.google.com/uc?id=1K-xVrXnuQAbdELzzq1c7Y_PKECnImm5a&export=download'
//     }
//   ]
// }

export default function Course() {
  
  const { courseId } = useParams();
  const courseIdParsed = courseId.substring(0,25);
  //Just get the id - URL friendly, 25 beacuse from backend the id is 25 chars long

  const [course, setCourse] = useState([]);
  const [courseStatus, setCourseStatus] = useState('');

  useEffect(() => {
    fetch(`https://back-open-door-2z6de84uw-cristiancastano852.vercel.app//course/${courseIdParsed}`)
    .then(response => response.json())
    .then(data => {
      setCourse(data);
      setCourseStatus(data.status);
    })
    .catch(error => console.log(error));
  }, [courseIdParsed]);

  const courseContent = course?.courseContent.map((content)=>{
    switch(content.contentType){
      
      case 'video':
        return(
          <div className='container-content' key={nanoid()}>
            <h3 className='subtitle-content'>{content.name}</h3>
            <div className='w-full flex flex-col justify-center items-center'>
              <p className='description-content'>{content.description}</p>
            </div>
            <YouTubeVideo url={content.url}/>
          </div>
        );

      case 'resource':
        return(
          <div className='container-content' key={nanoid()}>
            <h3 className='subtitle-content'>{content.name}</h3>
            <p className='description-content'>{content.description}</p>
            <div className='w-full flex justify-center'>
              <ButtonAndIcon 
                icon={<AiOutlineDownload className='h-5 w-5'/>} 
                text='Download' 
                otherStyles='bg-orange-lt text-white' 
                responsive={true}
                urlDocument={content.url}
              />
            </div>
          </div>
        );

      default: return null;
    }
  });

  return (
    <section className='w-full flex flex-col justify-center items-center p-5'>
      <div className='w-full md:w-4/5'>
        <h1 className='pb-5 text-center text-xl text-blue-lt font-bold'>{course.title}</h1>
        <RelevantText text={course.status} maxLegth={13} />
        <div className='w-full flex flex-col justify-center items-center'>
          <p className='mt-5 mb-2 text-center md:mt-10 md:w-2/3'>{course.description}</p>
        </div>
      </div>
      <section className='w-full flex flex-col justify-center items-center mt-5 space-y-10 md:mt-10'>
        {courseStatus==='AbleToStart'? 
          <ButtonAndIcon
            text={'Start Course'}
            otherStyles='bg-orange-lt text-white' 
            responsive={false}
            onClick={()=>{
              setCourseStatus('InProgress');
              // to-do send put request to backend to update the status of the course
            }}
          />  
         :
          null
        }
        {courseStatus==='InProgress' ? courseContent : null}
      </section>
    </section>
  )
}
