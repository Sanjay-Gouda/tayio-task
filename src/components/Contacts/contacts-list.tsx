import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getContactList,
  removeContactList,
} from "../../utils/slices/contact-list";
import EmptyState from "../Empty";

// import { ReactComponent as Empty } from "../../assets/images/empty-state.svg";
type TFormfields = {
  id: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
};

const ContactList = () => {
  const list = useSelector(getContactList);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/contact-form/${id}`);
  };
  const handleView = (id: string) => {
    navigate(`/contact-view-form/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(removeContactList(id));
  };
  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full flex justify-end">
          <button
            onClick={() => navigate("/contact-form")}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Add Contacts
          </button>
        </div>

        {list?.length === 0 ? (
          <>
            <EmptyState />
          </>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Person's Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list?.map((list: any) => {
                  const name = list?.firstName + " " + list?.lastName;
                  return (
                    <>
                      <tr className="bg-white border-b " key={list?.id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {name}
                        </th>

                        <td className="px-6 py-4 text-gray-600">
                          {list?.status}
                        </td>
                        <td className="px-6 py-4 flex gap-4">
                          <p
                            onClick={() => handleView(list?.id)}
                            className="font-medium text-blue-600  hover:underline cursor-pointer"
                          >
                            View
                          </p>
                          <p
                            // href="#"
                            className="font-medium text-blue-600  hover:underline cursor-pointer"
                            onClick={() => handleEdit(list?.id)}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() => handleDelete(list?.id)}
                            className="font-medium text-red-600  hover:underline cursor-pointer"
                          >
                            Delete
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactList;
