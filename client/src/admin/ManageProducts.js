import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

const ManageProducts = () => {
  return (
    <Layout
      title="Manage Products Page"
      description="MERN E-Commerce Bookstore Manage Products Page"
      className="container-fluid"
    >
      <div className="row">
        <div>...</div>
      </div>
    </Layout>
  );
};

export default ManageProducts;