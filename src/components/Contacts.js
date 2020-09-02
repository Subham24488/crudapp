import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";
import Search from "./Search";

const Contacts = () => {
  const [contact, setContact] = useState([]);

  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setContact({ ...snapshot.val() });
      } else {
        setContact({});
      }
    });
  }, []);

  //coverting the values of an object to array
  const contactList = Object.values(contact);

  console.log(contact);

  //add or edit

  const addOrEdit = (obj) => {
    if (currentId === "") {
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    } else {
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  //delete

  const onDelete = (key) => {
    if (window.confirm("are you sure you want to delete?")) {
      firebaseDb.child(`contacts/${key}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  //filtercontacts
  const filterContacts = [];

  const handleFilterContacts = (name) => {
    console.log(name);
    Object.keys(contact).map((id) => {
      if (contact[id].fullName.toLowerCase().replace(/\s/g, "") === name) {
        filterContacts.push(contact[id]);
        console.log(filterContacts);
      }
    });
    if (filterContacts.length === 0) {
      console.log("not found");
    }
  };
  console.log(filterContacts.length);

  return (
    <>
      <Search handleFilterContacts={handleFilterContacts} />
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-center">Contact Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ContactForm {...{ addOrEdit, currentId, contact }} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table ">
              <thead className="thead-light">
                <tr>
                  <th>Full Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterContacts.length === 0
                  ? Object.keys(contact).map((id) => {
                      return (
                        <tr key={id}>
                          <td>{contact[id].fullName}</td>
                          <td>{contact[id].mobile}</td>
                          <td>{contact[id].email}</td>
                          <td>{contact[id].address}</td>

                          <td>
                            <a className="btn text-primary">
                              <i
                                className="fas fa-pencil-alt"
                                onClick={() => setCurrentId(id)}
                              >
                                edit
                              </i>
                            </a>
                            <a className="btn text-primary">
                              <i
                                className="fas fa-trash-alt"
                                onClick={() => onDelete(id)}
                              >
                                delete
                              </i>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  : filterContacts.map((item, id) => {
                      return (
                        <tr key={id}>
                          <td>{contact[id].fullName}</td>
                          <td>{contact[id].mobile}</td>
                          <td>{contact[id].email}</td>
                          <td>{contact[id].address}</td>

                          <td>
                            <a className="btn text-primary">
                              <i
                                className="fas fa-pencil-alt"
                                onClick={() => setCurrentId(id)}
                              >
                                edit
                              </i>
                            </a>
                            <a className="btn text-primary">
                              <i
                                className="fas fa-trash-alt"
                                onClick={() => onDelete(id)}
                              >
                                delete
                              </i>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
