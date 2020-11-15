import React, { useEffect, useCallback } from "react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <DatePicker />
    </div>
  );
}

export default Header;
