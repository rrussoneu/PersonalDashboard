import React from "react";
import ContactTable from "../components/contacts/ContactTable";
import '../pagescss/contacts.scss';

function Contacts() {
  return (
    <div className="contacts">
      <div className="contactsContainer">
        <ContactTable />
      </div>
    </div>
  );
}

export default Contacts;