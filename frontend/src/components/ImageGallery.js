import React, { useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container py-4">
      <div className="row g-4">
        {images.map((image) => (
          <div key={image.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              <img 
                src={image.urls.small} 
                className="card-img-top" 
                alt={image.alt_description} 
              />
              <div className="card-body">
                <h5 className="card-title">{image.description || 'Untitled'}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedImage(image)}
                    data-bs-toggle="modal" 
                    data-bs-target="#qrModal"
                  >
                    Share via QR
                  </button>
                  <a 
                    href={image.links.html} 
                    className="btn btn-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View on Unsplash
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      <div className="modal fade" id="qrModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Share Image via QR Code</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center">
              {selectedImage && (
                <QRCodeGenerator url={selectedImage.links.html} size={256} />
              )}
              <p className="mt-3">Scan this QR code to view the image</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;