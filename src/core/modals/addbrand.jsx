import React, { useState } from "react";
import { useCreateBrandMutation } from "../redux/api/productApi";

const AddBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [createBrand] = useCreateBrandMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!brandName.trim()) {
        alert("Please enter a brand name");
        return;
      }
      
      await createBrand({ brandName }).unwrap();
      
      // Close modal and reset
      setBrandName("");
      const modal = document.getElementById('add-units-brand');
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
      const backdrops = document.getElementsByClassName('modal-backdrop');
      for (let backdrop of backdrops) {
        backdrop.remove();
      }
      
      alert("Brand added successfully!");
    } catch (error) {
      console.error('API Error:', error);
      alert(error.data?.message || 'Failed to add brand');
    }
  };

  return (
    <div className="modal fade" id="add-units-brand">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <form className="content" onSubmit={handleSubmit}>
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add New Brand</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body custom-modal-body">
                <div className="mb-3">
                  <label className="form-label">Brand Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-cancel me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-submit"
                  disabled={!brandName.trim()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;