import { useState, useEffect } from "react";
import "./dashcontacts.scss";
import axios from "../../api/axios";

const CONTACT_URL = "PersonalDashApp/contacts/";

const DashContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        setContacts(response.data);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleContacts();
  }, []);

  return (
    <div className="dash-contacts">
      <div className="dc-header">
        <h1 className="dc-title">Contacts</h1>
      </div>
      <div className="dc-main">
        <div className="dc-cols">
          <div className="dc-col-item">
            <p className="dc-col-item-text">First Name</p>
          </div>
          <div className="dc-col-item">
            <p className="dc-col-item-text">Last Name</p>
          </div>
          <div className="dc-col-item">
            <p className="dc-col-item-text">Phone</p>
          </div>
        </div>
        <div className="dc-rows">
          {isLoading ? (
            <span>Loading Conacts</span>
          ) : (
            contacts.map((c, idx) => (
              <div className="dc-row-container" key={idx}>
                <div className="dc-row-item">
                  <p className="dc-row-item-text">{c.first_name}</p>
                </div>
                <div className="dc-row-item">
                  <p className="dc-row-item-text">{c.last_name}</p>
                </div>
                <div className="dc-row-item">
                  <p className="dc-row-item-text">{c.phone}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashContacts;
