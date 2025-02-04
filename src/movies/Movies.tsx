import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaArrowLeft } from 'react-icons/fa';  

const MovieDetailPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); // Use useNavigate for navigation

    const movies = [
        {
            id: 1,
            title: "Movie 1",
            imageUrl: "https://via.placeholder.com/600x400",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "This is a detailed description of Movie 1."
        },
        {
            id: 2,
            title: "Movie 2",
            imageUrl: "https://via.placeholder.com/600x400",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "This is a detailed description of Movie 2."
        },
        {
            id: 3,
            title: "Movie 3",
            imageUrl: "https://via.placeholder.com/600x400",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "This is a detailed description of Movie 3."
        },
        {
            id: 4,
            title: "Movie 4",
            imageUrl: "https://via.placeholder.com/600x400",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "This is a detailed description of Movie 4."
        },
    ];

    const movie = movies.find(movie => movie.id === parseInt(id));

    if (!movie) {
        return <div className="text-white text-center p-8">Movie not found!</div>;
    }

    return (
        <div className="bg-gray-900 text-white h-full w-full flex flex-col xl:flex-row">
            <div className="flex-grow p-8">
                <button 
                    onClick={() => navigate('/home')} // Use navigate for navigation
                    className="flex items-center mb-4 cursor-pointer text-blue-500 hover:underline"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>
                <h2 className="text-3xl font-semibold mb-4">{movie.title}</h2>
                <div className="relative mb-4">
                    <video className="h-auto max-h-[60vh] w-full rounded-lg shadow-lg" controls>
                        <source src={movie.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p className="text-lg mb-4">{movie.description}</p>
            </div>

            <div className="w-full xl:w-1/3 h-full p-4 overflow-y-auto mt-6 hide-scrollbar">
                <h3 className="text-xl font-semibold mb-4">Related Videos</h3>
                <div className="flex flex-wrap justify-start">
                    {movies.filter(m => m.id !== movie.id).map(relatedMovie => (
                        <div 
                            key={relatedMovie.id} 
                            className="mb-4 mr-4 relative group cursor-pointer transition-transform transform hover:scale-105" 
                            onClick={() => navigate(`/movies/${relatedMovie.id}`)} // Fixed navigation
                        >
                            <img 
                                src={relatedMovie.imageUrl} 
                                alt={relatedMovie.title} 
                                className="w-[300px] h-[150px] rounded-lg shadow-lg" // Fixed width and height
                            />
                            <h4 className="text-lg mt-2">{relatedMovie.title}</h4>
                            <video 
                                className="absolute top-0 left-0 w-full h-full rounded-lg object-cover hidden group-hover:block" 
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => e.currentTarget.pause()}
                                muted
                            >
                                <source src={relatedMovie.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
