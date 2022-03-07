import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    categories: [],
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const {
    name,
    description,
    price,
    category,
    categories,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>

      <div className="form-group">
        <label className="btn btn-outline-secondary">
          <input
            onChange={handleChange('photo')}
            className="btn btn-secondary"
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange('name')}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange('name')} className="form-control">
          <option>Please Select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange('shipping')} className="form-control">
          <option>Please Select</option>

          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createProduct ? '' : 'none' }}
    >
      <h2>{`${createProduct}`} has been successfully created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading.....</h2>
      </div>
    );

  return (
    <Layout
      title="Add a New Product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
