import React from 'react';
import PropTypes from 'prop-types';

const ImageWithBasePath = ({
  src,
  alt,
  className,
  fullSrc,
  height,
  altText,
  width,
  id,
  style,
  ...props
}) => {
  const imageSrc = fullSrc || `${process.env.PUBLIC_URL}/${src}`;
  return (
    <img
      src={imageSrc}
      alt={alt || altText}
      className={className}
      height={height}
      width={width}
      id={id}
      style={style}
      {...props}
    />
  );
};

ImageWithBasePath.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fullSrc: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  altText: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  style: PropTypes.object,
};

ImageWithBasePath.defaultProps = {
  src: '',
  alt: '',
  className: '',
  fullSrc: '',
  height: undefined,
  altText: '',
  width: undefined,
  id: '',
  style: {},
};

export default ImageWithBasePath;