import React from "react";

export default function Logout() {
  return (
    <div>
      <h1>Are you sure you want to log out</h1>
      <form action="http://localhost:3000/logout" method="POST">
        <button value="submit">Yes, I am</button>
      </form>
    </div>
  );
}
