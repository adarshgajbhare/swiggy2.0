
import React, { useContext } from "react";
import UserName from "./UserName";
function Offers() {
  const { loggedUser, setName } = useContext(UserName);
  return (
    <div>
      <label >Username</label>{" "}
      <input
      onChange={(e) =>
            setName (e.target.value)
      }
      value={loggedUser}
        type="text"
        name="search"
        id="ag"
        className="border-black border-2"
      />
      <h1 className="text-black p-5"> {loggedUser}</h1>
    </div>
  )
}

export default Offers
