import axios from 'axios';
import { create } from 'lodash';
import { AUTH } from './auth';

const ENDPOINTS = {
  getAllProducts: `${process.env.REACT_APP_BASE_URL}/api/products`,
  getAllCategories: `${process.env.REACT_APP_BASE_URL}/api/categories`,
  getAllUsers: `${process.env.REACT_APP_BASE_URL}/api/users`,
  allBrands: `${process.env.REACT_APP_BASE_URL}/api/brands`,
  allProductsfForBrand: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/brands/${id}/products`,
  getSingleProduct: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/products/${id}`,
  login: `${process.env.REACT_APP_BASE_URL}/api/login`,
  register: `${process.env.REACT_APP_BASE_URL}/api/register`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
  singleUser: (userId) =>
    `${process.env.REACT_APP_BASE_URL}/api/profile/${userId}`,
  createReview: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/products/${id}/reviews`,
  singleReview: (productId, reviewId) =>
    `${process.env.REACT_APP_BASE_URL}/api/products/${productId}/reviews/${reviewId}`,
  deleteBrand: (id) => `${process.env.REACT_APP_BASE_URL}/api/brands/${id}`,
  search: (query) =>
    `${process.env.REACT_APP_BASE_URL}/api/products/search?search=${query}`,
  deleteCategory: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/categories/${id}`,
  getFilteredProducts: (categories, brands) =>
    `${process.env.REACT_APP_BASE_URL}/api/products/filter?categories=${categories}&brands=${brands}`,
  createBrand: '/api/brands'
};

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${AUTH.getToken()}` }
});

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
