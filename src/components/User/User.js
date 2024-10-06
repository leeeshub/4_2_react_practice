import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import "./User.css";
const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getUserApi = "http://localhost:3001/user";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      {/* 이 화면에서도 사용자를 edit 할 수 있도록 함. */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>User Info</h4>
        <Link to={`/edit-user/${id}`}>
          <button className="btn btn-primary w-100">Edit</button>
        </Link>
      </div>

      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>Hometown</td>
            <td>{user.hometown}</td>
          </tr>
        </tbody>
  </table>
    </div>
  );
};
export default EditUser;
