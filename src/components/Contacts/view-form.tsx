import React, { useEffect, useState } from "react";
import EmptyState from "../Empty";
import ContactForm from "./contact-form";
import { TFormfields } from "../../utils/slices/types/type";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getContactList } from "../../utils/slices/contact-list";

const ViewForm = () => {
  const params = useParams();

  const viewId = params.id;

  const [editValues, setEditValues] = useState<TFormfields>({
    id: "",
    firstName: "",
    lastName: "",
    status: "active",
  });

  const [view, setView] = useState(false);

  const list = useSelector(getContactList);

  const getEditData = () => {
    const editInitialvalues = list?.filter((list) => {
      return list?.id === params.id;
    });

    if (editInitialvalues) {
      setView(true);
    }

    const { firstName, lastName, id, status } = editInitialvalues[0];

    setEditValues({
      firstName: firstName,
      lastName: lastName,
      id: id,
      status: status,
    });

    console.log(editInitialvalues, "values");
  };
  useEffect(() => {
    getEditData();
  }, [viewId]);

  return (
    <>{view ? <ContactForm viewFormValue={editValues} /> : <h1>loading</h1>}</>
  );
};

export default ViewForm;
