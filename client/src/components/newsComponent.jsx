import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=5c285394fa234a3da70a30eb778099e2'
        );

        // Assuming the response has a 'articles' property containing the news data
        setNews(response.data.articles);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependen
  return (
    <div>
      <h2>Latest News</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {news.map((article) => (
            <li key={article.title}>
              <h3>{article.title}</h3>
              <p>{article.author}</p>
              <p>{article.description}</p>
              <p>{article.source.name}</p>
              <img src={article.urlToImage} alt="" />
              {/* Add more details based on your data structure */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsComponent;
