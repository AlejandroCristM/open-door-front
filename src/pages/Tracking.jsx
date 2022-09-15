import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import Loading from '../components/atoms/Loading';
import { nanoid } from "nanoid";
import CourseCard from '../components/molecules/CourseCard';

export default function Tracking() {

    const { user } = useAuth0();
    const [userId, setUserId] = useState('')
    const [courses, setCourses] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUserId = async () => {
            setIsLoading(true)
            const res = await axios.get('https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/getRole', {
                headers: { email: user.email }
            });
            switch (res.data.rol) {
                case 'admin':
                    setUserId(res.data.admin.id)
                    break;

                case 'user':
                    setUserId(res.data.user.id)
                    break;

                default:
                    break;
            }
        }
        fetchUserId()
        setIsLoading(false)
    }, [user]);

    useEffect(() => {
        const fetchUserDataCourses = async () => {
            setIsLoading(true)
            if (userId) {
                const res = await axios.get('https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/courses/' + userId, {
                    headers: { email: user.email }
                });
                setCourses(res.data.userCourses)
                console.log(res.data.userCourses)
            }
        }
        fetchUserDataCourses()
        setIsLoading(false)
    }, [userId]);

    if (isLoading || !courses) {
        return <Loading />
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
    )
}
