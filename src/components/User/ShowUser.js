import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUser = () => {
  const showUserApi = "http://localhost:3001/user";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);

    // 사용자를 취소 하고자 할 때 confirm 하는 창을 띄워서 정말 취소할 것인지 확인하는 작업 추가.
    const confirmAlert = window.confirm("Do you want to delete this user?");

    if(confirmAlert) {
      setIsLoading(true);
      try {
        const response = await fetch(showUserApi.concat("/") + id, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete item: ${response.status} ${response.statusText}. ${errorText}`);
        }
        const result = await response.json();
        console.log("Delete result:", result);
        setUser(user.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }   
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(showUserApi)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hometown</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.hometown}</td>
                  <td>
                    {/* 직관적인 show 버튼으로 사용자 정보를 확인할 수 있도록 한다. */}
                    <Link to={`/user/${item.id}`}>
                      <button className="btn btn-info btn-sm me-2">Show</button>
                    </Link>
                    <Link to={`/edit-user/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowUser;
