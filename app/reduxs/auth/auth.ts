import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginPayload, User } from "./type";

// Login thunk
export const login = createAsyncThunk<User, LoginPayload>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}auth/login`,
        {
          email,
          password,
        }
      );

      // Save token to localStorage
      localStorage.setItem("userToken", response.data.token);
      console.log(response.data);
      return response.data; // Return data to save in Redux store
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Signup thunk
export const register = createAsyncThunk<User, User>(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.43.233:5000/api/auth/register",
        signupData
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching the current user
export const currentUser = createAsyncThunk<User>(
  "auth/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken"); // Use localStorage
      const response = await axios.get(
        "http://192.168.43.233:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch current user");
    }
  }
);

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk<User, Partial<User>>(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        "http://192.168.43.233:5000/api/auth/update",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );
      return response.data; // Adjust to match your API response structure
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for logging out
export const logout = createAsyncThunk<void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Optionally, you can make a logout API call
      // await axios.post("http://192.168.43.233:5000/api/auth/logout");
      localStorage.removeItem("userToken"); // Clear the token from localStorage
      // Optionally, return a value or perform additional logic after logout
    } catch (error) {
      console.error("Logout failed:", error);
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);
