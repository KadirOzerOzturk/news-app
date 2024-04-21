import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

function Home() {
    const [news, setNews] = useState([]);
    const [pendingApiCall, setPendingApiCall] = useState(true);
    const [subject, setSubject] = useState("tr");
    const [language, setLanguage] = useState("tr");
    const date = new Date();
    date.setDate(date.getDate() - 1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=b35395bced044420924bf3b283fcf780`);
                setPendingApiCall(false);
                setNews(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
                // Handle error state or display error message to the user
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataBySubject = async () => {
            try {
                let apiUrl = '';
                if (subject === 'world') {
                    apiUrl = `https://newsapi.org/v2/top-headlines?country=us&from=${date}&sortBy=publishedAt&apiKey=b35395bced044420924bf3b283fcf780`;
                } else if (subject === 'technology' || subject === 'business') {
                    apiUrl = `https://newsapi.org/v2/everything?source&q=${subject}&language=${language}&from=${date}&sortBy=publishedAt&apiKey=b35395bced044420924bf3b283fcf780`;
                } else if (subject === 'sports' || subject === 'science') {
                    apiUrl = `https://newsapi.org/v2/top-headlines?sources&category=${subject}&language=${language}&from=${date}&sortBy=publishedAt&apiKey=b35395bced044420924bf3b283fcf780`;
                } else {
                    apiUrl = `https://newsapi.org/v2/top-headlines?country=tr&from=${date}&sortBy=publishedAt&apiKey=b35395bced044420924bf3b283fcf780`;
                }

                const response = await axios.get(apiUrl);
                setPendingApiCall(false);
                setNews(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching news by subject:', error);
                // Handle error state or display error message to the user
            }
        };

        fetchDataBySubject();
    }, [subject, language, date]);

    return (
        <>
            
            <div className='flex justify-center items-center'>
                <ul className='flex gap-8'>
                    <li onClick={() => setSubject("turkey")} className='text-2xl hover:border-b-4 border-dark-red px-4 py-2 rounded-sm cursor-pointer'>
                        Türkiye
                    </li>
                    <li onClick={() => setSubject("world")} className='text-2xl hover:border-b-4 border-dark-red px-4 py-2 rounded-sm cursor-pointer'>
                        Dünya
                    </li>
                    <li onClick={() => setSubject("sports")} className='text-2xl hover:border-b-4 border-dark-red px-4 py-2 rounded-sm cursor-pointer'>
                        Spor
                    </li>
                    <li onClick={() => setSubject("technology")} className='text-2xl hover:border-b-4 border-dark-red px-4 py-2 rounded-sm cursor-pointer'>
                        Teknoloji
                    </li>
                    <li onClick={() => setSubject("science")} className='text-2xl hover:border-b-4 border-dark-red px-4 py-2 rounded-sm cursor-pointer'>
                        Bilim
                    </li>
                    <li onClick={() => setSubject("business")} className='text-2xl hover:border-b-4 border-dark-red px-4 py-2 rounded-sm cursor-pointer'>
                        Ekonomi
                    </li>
                </ul>
            </div>

            {pendingApiCall ? (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
                        <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                            <path clipRule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fillRule='evenodd' />
                        </svg>
                        <div>Loading ...</div>
                    </div>
                </div>
            ) : <NewsCard news={news} pendingApiCall={pendingApiCall} />}
            
        </>
    );
}

export default Home;
