import React, { useContext } from "react";
import UserName from "./UserName";
function Offers() {
  const { loggedUser, setName } = useContext(UserName);
  return (
    <div>
      <label>Username</label>{" "}
      <input
        onChange={(e) => setName(e.target.value)}
        value={loggedUser}
        type="text"
        name="search"
        id="ag"
        className="border-2 border-black"
      />
      <h1 className="p-5 text-black"> {loggedUser}</h1>
    </div>
  );
}

export default Offers;
