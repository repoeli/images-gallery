import React from 'react';

/**
 * ImageGallery component displays a grid of images with pagination.
 * It takes in images, page, setPage, and totalPages as props.
 *  
 * @param {images,page,setPage,totalPages} params 
 * @returns 
 */
const ImageGallery = ({ images, page, setPage, totalPages }) => {

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

    // If there are no images, return an empty array
    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    if (range[0] > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    range.forEach(i => rangeWithDots.push(i));

    if (range[range.length - 1] < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (range[range.length - 1] < totalPages) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="h-full">
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img
                  src={image.urls.regular}
                  alt={image.alt_description}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{image.user.name}</h3>
                <p className="text-gray-600 flex-grow">
                  {image.description || image.alt_description || 'No description available'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Likes: {image.likes} | Downloads: {image.downloads}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            {getVisiblePages().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => typeof pageNum === 'number' && setPage(pageNum)}
                className={`px-3 py-2 rounded-md ${
                  pageNum === page
                    ? 'bg-blue-500 text-white'
                    : pageNum === '...'
                    ? 'text-gray-500 cursor-default'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } ${typeof pageNum !== 'number' ? 'cursor-default' : ''}`}
                disabled={typeof pageNum !== 'number'}
              >
                {pageNum}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;