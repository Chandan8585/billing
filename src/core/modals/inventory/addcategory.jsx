import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../Router/all_routes";
import {useCreateCategoryMutation } from "../../redux/api/productApi";

const AddCategory = ({onSubmit}) => {
 const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 const [createCategory] = useCreateCategoryMutation();
  const handleSubmit = async (e) => { 
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await createCategory({
        name: categoryName,
  
      });
      
      onSubmit(response.data); // Pass created category back to parent
      // Close modal
      document.getElementById('add-units-category').click();
      const modal = bootstrap.Modal.getInstance(document.getElementById('add-units-category'));
      modal.hide();
      alert("Category added successfully")
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="add-units-category">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Category</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
         
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;