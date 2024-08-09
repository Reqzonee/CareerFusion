import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await fetch(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    method: 'GET',
                    credentials: 'include', // This is equivalent to axios' withCredentials: true
                    headers: {
                      'Content-Type': 'application/json',
                      // Add any other headers here that you might need
                    },
                  });
                  const data = await res.json();
                if(data.success){
                    dispatch(setAllJobs(data.jobs));
                }
                else {
                    console.log("API call was not successful", data.message);
                }

            } catch (error) {
                console.error("Error fetching jobs: ", error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs