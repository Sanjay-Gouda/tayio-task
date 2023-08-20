import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate, useLocation, useParams } from "react-router";
import {
  getContactList,
  setContactList,
  updateContactList,
} from "../../utils/slices/contact-list";

type TFormfields = {
  id: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required "),
  lastName: Yup.string().required("Last Name is required "),
  //   status: Yup.string().required("Please select status "),
});

const initialValues: TFormfields = {
  id: "",
  firstName: "",
  lastName: "",
  status: "active",
};

type TEditForm = {
  editValues?: TFormfields;
  viewFormValue?: TFormfields;
};

const ContactForm = ({ editValues, viewFormValue }: TEditForm) => {
  const contactList = useSelector(getContactList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formValues = editValues
    ? editValues
    : viewFormValue
    ? viewFormValue
    : initialValues;

  const addContactData = (values: TFormfields) => {
    /* add values */
    const updatedValues = {
      ...values,
      id: uuidv4(),
    };
    dispatch(setContactList(updatedValues));
    navigate("/");
  };

  const updateContactData = (values: TFormfields) => {
    console.log("called");
    const updatedData = contactList?.map((list) => {
      if (list?.id === editValues?.id) {
        return {
          ...list,
          firstName: values?.firstName,
          lastName: values?.lastName,
          status: values?.status,
        };
      }

      return list;
    });

    dispatch(updateContactList(updatedData));
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: TFormfields) => {
      editValues
        ? updateContactData(values)
        : viewFormValue
        ? handleBack()
        : addContactData(values);
    },
  });

  return (
    <>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className=" flex flex-col gap-2 justify-center items-center w-full">
          <div className=" w-[60%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Firstname
            </label>
            <input
              name="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder="FirstName"
              disabled={viewFormValue ? true : false}
            />

            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-400">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="w-[60%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lastname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder="LastName"
              disabled={viewFormValue ? true : false}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-400">{formik.errors.lastName}</div>
            )}
          </div>

          <div className="w-[60%]">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center ">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                  value="active"
                  name="status"
                  disabled={viewFormValue ? true : false}
                  checked={formik.values.status === "active"}
                  onChange={formik.handleChange}
                />
                <label className="ml-2 text-sm font-medium text-gray-900 ">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value="inactive"
                  disabled={viewFormValue ? true : false}
                  onChange={formik.handleChange}
                  name="status"
                  checked={formik.values.status === "inactive"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                />
                <label className="ml-2 text-sm font-medium text-gray-900 ">
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-[60%]">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => formik.handleSubmit()}
              // disabled={viewFormValue ? true : false}
            >
              {/* {editValues ? "Update" : "Save"} */}

              {editValues ? "Update" : viewFormValue ? "Back to Home" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
