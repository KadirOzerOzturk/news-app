import React, { useEffect, useState } from 'react';
import notFound from "../images.png"
import moment from 'moment/moment';
function NewsCard(props) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Check if props.news and props.news.articles are defined before setting the state
        if (props.news && props.news.articles) {
            setNews(props.news.articles);
        }
    }, [props.news]); // Run this effect only when props.news changes

    return (
        <div className='mt-4 border-t-2 flex justify-center pt-4 items-center'>
            <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {news.map((article, index) => (
                        
                        
                            <div key={index} className="rounded overflow-hidden shadow-lg flex flex-col">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    <div className="relative">
                                    {article.urlToImage ? <img className="w-full" src={article.urlToImage } alt={article.title} />: null}
                                        
                                        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                                    </div>
                                </a>
                                <div className="px-6 py-4 mb-auto">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{article.title}</a>
                                    <p className="text-gray-500 text-sm">{article.description}</p>
                                </div>
                                <div className="text-xs  px-4 py-2  flex justify-end    transition duration-500 ease-in-out">
                                    Source : {article.source.name}
                                </div>
                                <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                        <span className="ml-1">{moment(article.publishedAt).format("DD-MM-YYYY ")}</span>
                                    </span>
                                    {article.hasSubnews && (
                                        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                            <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                            </svg>
                                            <span className="ml-1">Has Subnews</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                    
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
