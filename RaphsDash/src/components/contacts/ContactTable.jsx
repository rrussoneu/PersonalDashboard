import React, { useEffect } from "react";
import "./contacttable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../api/axios";
import { useState } from "react";

const CONTACT_URL = "PersonalDashApp/contacts/";

function ContactTable() {
  const [contacts, setContacts] = useState([]); // state for contacts array
  const [isLoading, setIsLoading] = useState(false); // is loading for waiting for data
  const [rows, setRows] = useState([]); // rows for table - will init based on the data received
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const appendContacts = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
      // type: "number",
    },

    { field: "email", headerName: "Email", width: 130 },
  ];

  const handleContacts = async () => {
    try {
      const response = await axios({
        // put url and all that jazz in other file
        method: "get",
        url: `${CONTACT_URL}`,
        headers: {
          "Content-Type": "application/json",
          // switch back to auth.accessToken
          Authorization: `Token ${localStorage.getItem("accessToken")}`,
        },
        params: {
          owner: localStorage.getItem("userId"),
        },
      }).then((response) => {
        //console.log(response.data);
        setContacts(response.data);
        mapContactsToRow(response.data);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewContact = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        CONTACT_URL,
        // need to do email: user because the backend expects "email" in the json
        JSON.stringify({
          owner: localStorage.getItem("userId"),
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      //setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      const newContact = {
        phone: phone,
        email: email,
        first_name: firstName,
        last_name: lastName,
      };
      appendContacts(newContact);
      setPhone("");
      setEmail("");
      setFirstName("");
      setLastName("");

      //window.location.reload();
    } catch (err) {
      if (!err?.response) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  // map the contact objects to the rows array to display
  const mapContactsToRow = (contactObjs) => {
    let count = 0;
    const cRows = contactObjs.map((c) => ({
      id: count++,
      lastName: c.last_name,
      firstName: c.first_name,
      phone: c.phone,
      email: c.email,
    }));
    setRows(cRows);
  };

  useEffect(() => {
    setIsLoading(true);
    handleContacts();
  }, []);

  useEffect(() => {
    mapContactsToRow(contacts);
  }, [contacts]);

  return (
    <>
      <div className="contact-container">
        <div className="contact-new">
          <form className="contact-form" onSubmit={handleNewContact}>
            <h3 className="contact-new-header">Add Contact</h3>
            <div className="contact-fields">
              <div className="contact-new-field">
                <label className="contact-label">First Name:</label>
                <input
                  className="contact-input"
                  type="text"
                  id="firstName"
                  autoComplete="off"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                />
              </div>
              <div className="contact-new-field">
                <label className="contact-label">Last Name:</label>
                <input
                  className="contact-input"
                  type="text"
                  id="lastName"
                  autoComplete="off"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                />
              </div>
              <div className="contact-new-field">
                <label className="contact-label">Email:</label>
                <input
                  className="contact-input"
                  type="text"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="contact-new-field">
                <label className="contact-label">Phone Number:</label>
                <input
                  className="contact-input"
                  type="text"
                  id="phone"
                  autoComplete="off"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  required
                />
              </div>
            </div>

            <div className="contact-add">
              <button className="contact-add-button"> Add </button>
            </div>
          </form>
        </div>
        <div className="contact-table">
          <div style={{ height: 400, width: "100%" }}>
            {isLoading ? (
              <span>Loading Contacts</span>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection5
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactTable;
