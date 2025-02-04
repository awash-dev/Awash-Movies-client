import { Link } from 'react-router-dom';
import { useState } from 'react';

const MovieCard = ({ id, title, imageUrl, videoUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/movies/${id}`} className="block">
      <div
        className="bg-gray-600 text-white rounded-lg shadow-lg overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Video Background on Hover */}
        <div className={`absolute inset-0 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Image Background */}
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-38 object-cover transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />

        <div className="p-4 relative z-10">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

const MovieGrid = () => {
  const movies = [
    {
      id: 1,
      title: "Movie 1",
      imageUrl: "https://via.placeholder.com/400x250",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "A brief description of Movie 1."
    },
    {
      id: 2,
      title: "Movie 2",
      imageUrl: "https://via.placeholder.com/400x250",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "A brief description of Movie 2."
    },
    {
      id: 3,
      title: "Movie 3",
      imageUrl: "https://via.placeholder.com/400x250",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "A brief description of Movie 3."
    },
    {
      id: 4,
      title: "Movie 4",
      imageUrl: "https://via.placeholder.com/400x250",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "A brief description of Movie 4."
    },
    // Add more movies here
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-semibold text-white text-center mb-8">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} title={movie.title} imageUrl={movie.imageUrl} videoUrl={movie.videoUrl} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
