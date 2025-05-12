import React from 'react';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';

const ImageGallery = ({ images, page, setPage, totalPages }) => {
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

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
    <Container className="mt-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {images.map((image) => (
          <Col key={image.id}>
            <Card className="h-100"> {/* Make all cards same height */}
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img
                  variant="top"
                  src={image.urls.regular}
                  alt={image.alt_description}
                  style={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{image.user.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {image.description || image.alt_description || 'No description available'}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Likes: {image.likes} | Downloads: {image.downloads}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {totalPages > 1 && (
        <Row className="justify-content-center mt-4">
          <Pagination>
            <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
            {getVisiblePages().map((pageNum, index) => (
              pageNum === '...' ? (
                <Pagination.Ellipsis key={`ellipsis-${index}`} />
              ) : (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === page}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              )
            ))}
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages} />
            <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
          </Pagination>
        </Row>
      )}
    </Container>
  );
};

export default ImageGallery;