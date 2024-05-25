import { useState } from "react";

const UserCard = () => {
   const [count] = useState(0);
   const [count2] = useState(0);
  return (
    <div className="userCard">
      <p>Function</p>
      <h1>count: {count}</h1>
      <h1>count2: {count2}</h1>
      <h1>Name : Adarsh</h1>
      <h3>location : Nanded</h3>
      <h3>userName : adarshgajbhare</h3>
    </div>
  );
};
export default UserCard;
