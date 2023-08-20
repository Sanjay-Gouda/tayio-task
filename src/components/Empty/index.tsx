import React from "react";
import Empty from "../../assets/images/empty.png";

const EmptyState = () => {
  return (
    <>
      <div className="w-full flex justify-center h-[80vh] items-center flex-col">
        <div className="w-[500px] h-[373px]">
          <img
            className="w-full h-full object-contain"
            src={Empty}
            alt="Empty"
          />
        </div>
        <h3 className="text-xl bold">No Contacts found ,Please add Contacts</h3>
      </div>
    </>
  );
};

export default EmptyState;
