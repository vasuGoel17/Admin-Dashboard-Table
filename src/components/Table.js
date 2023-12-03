import React, { useState, useEffect, useContext } from "react";
import { GoTrash } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import Count from "../context/count";
import Footer from "./Footer";
import { MdUpdate } from "react-icons/md";
function Table() {
  const [details, setDetails] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [name, setname] = useState("");
  const [search, setsearch] = useState("");

  const [currentPage, setCurrentPage] = useContext(Count);
  const recordsPerPage = 10;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = details.slice(firstIndex, lastIndex);
  const npage = Math.ceil(details.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  let API =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const fetchUsers = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log("data: ", data);

      if (data.length > 0) {
        setDetails(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setDetails((prevDetails) => prevDetails.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    console.log("rrrreesult: ", details[id - 1]);
    setname(details[id - 1].name);
    setemail(details[id - 1].email);
    setrole(details[id - 1].role);
    setEditId(id);
  };

  const handleUpdate = () => {
    console.log("role: ", role, " email: ", email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let bool = emailRegex.test(email);

    if (role !== "admin" && role !== "member") {
      alert("role must be either admin or member");
    } else if (bool === false) {
      alert("Email is not valid");
    } else {
      setDetails((prevDetails) =>
        prevDetails.map((item) =>
          item.id === editId
            ? {
                ...item,
                name: name,
                email: email,
                role: role,
              }
            : item
        )
      );
      setEditId(-1);
    }
  };

  const handlecheckchange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const checkedvalue = records.map((user) => {
        return { ...user, isChecked: checked };
      });

      //   console.log(checkedvalue);
      setDetails(
        details.map((originalItem) => {
          const matchingNewItem = checkedvalue.find(
            (newItem) => newItem.id === originalItem.id
          );

          return matchingNewItem
            ? { ...originalItem, ...matchingNewItem }
            : originalItem;
        })
      );
      //   console.log("det: ", details);
    } else {
      const checkedvalue = records.map((user) =>
        user.id === name ? { ...user, isChecked: checked } : user
      );

      //   console.log(checkedvalue);
      setDetails(
        details.map((originalItem) => {
          const matchingNewItem = checkedvalue.find(
            (newItem) => newItem.id === originalItem.id
          );
          return matchingNewItem
            ? { ...originalItem, ...matchingNewItem }
            : originalItem;
        })
      );

      //   console.log("d: ", details);
    }
  };

  const handleDeleteMany = () => {
    console.log("details now: ", details);
    const filteredArray = details.filter((obj) => obj.isChecked !== true);
    setDetails(filteredArray);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("key: ", e.key, " ", search);
      const filteredData = details.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
      setDetails(filteredData);
    }
  };

  return (
    <div>
      <div className="header">
        <form>
          <input
            type="text"
            placeholder="Search and Filter the Tables..."
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            name=""
            id="inputSearch"
          />
        </form>
        <button className="btnDelete" id="btnHeader">
          <GoTrash className="trash1" onClick={handleDeleteMany} />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="forcheck">
              <input
                type="checkbox"
                checked={!records.some((user) => user?.isChecked !== true)}
                name="allselect"
                className="inputcheck"
                onChange={handlecheckchange}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((detail, index) =>
            detail.id === editId ? (
              <tr>
                <td className="forcheck">
                  <input type="checkbox" name="check" className="inputcheck" />
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    defaultValue=""
                    onChange={(e) => setname(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    defaultValue=""
                    onChange={(e) => setemail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="role"
                    defaultValue=""
                    onChange={(e) => setrole(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btnEdit icons"
                    onClick={handleUpdate}
                  >
                    <MdUpdate />
                  </button>
                </td>
              </tr>
            ) : (
              <tr
                key={index}
                className={detail.isChecked !== true ? "white" : "grey"}
              >
                <td className="forcheck">
                  <input
                    type="checkbox"
                    name={detail.id}
                    checked={detail?.isChecked || false}
                    onChange={handlecheckchange}
                    className="inputcheck"
                  />
                </td>
                <td>{detail.name}</td>
                <td>{detail.email}</td>
                <td>{detail.role}</td>
                <td>
                  <button
                    type="button"
                    className="btnEdit icons"
                    onClick={() => handleEdit(detail.id)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    className="btnDelete icons"
                    onClick={() => handleDelete(detail.id)}
                  >
                    <GoTrash className="trash" />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <Footer
        details={details}
        numbers={numbers}
        currentPage={currentPage}
        firstIndex={firstIndex}
        lastIndex={lastIndex}
        npage={npage}
      />
    </div>
  );
}

export default Table;
