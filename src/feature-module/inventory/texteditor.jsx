import React from 'react';
import PropTypes from 'prop-types';
import DefaultEditor from "react-simple-wysiwyg";

const TextEditor = ({ value, onChange, name }) => {
  const handleChange = (e) => {
    const text = e.target.value;
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    
    if (wordCount <= 60) {
      onChange({
        target: {
          name,
          value: text
        }
      });
    }
  };

  return (
    <div>
      <DefaultEditor value={value} onChange={handleChange} />
      <p className="fs-14 mt-1">
        Word count: {value?.split(/\s+/).filter(Boolean).length || 0}/60
      </p>
    </div>
  );
};

TextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default React.memo(TextEditor);