import React, { useState, useEffect } from "react";

const ContactForm = ({ addOrEdit, currentId, contact }) => {
  const [userData, setUserData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  });

  const { fullName, mobile, email, address } = userData;

  useEffect(() => {
    if (currentId === "") {
      setUserData({
        fullName: "",
        mobile: "",
        email: "",
        address: "",
      });
    } else
      setUserData({
        ...contact[currentId],
      });
  }, [currentId, contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return alert("Please enter a valid email");
    }

    if (!email || !fullName || !mobile || !address) {
      return alert("please enter all the fields");
    } else {
      addOrEdit(userData);
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group input-group ">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user" />
          </div>
        </div>
        <input
          className="form-control"
          placeholder="full name"
          name="fullName"
          value={fullName}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt" />
            </div>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="mobile"
            name="mobile"
            value={mobile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope" />
            </div>
          </div>
          <input
            className="form-control"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Address"
          name="address"
          value={address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value={currentId === "" ? "Save" : "Update"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
