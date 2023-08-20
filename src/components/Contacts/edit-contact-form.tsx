import React, { useEffect, useState } from "react";
import ContactForm from "./contact-form";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { useParams } from "react-router";
import { getContactList } from "../../utils/slices/contact-list";
import { TFormfields } from "../../utils/slices/types/type";

const EdiContactForm = () => {
  const params = useParams();

  const editId = params.id;

  const [editValues, setEditValues] = useState<TFormfields>({
    id: "",
    firstName: "",
    lastName: "",
    status: "active",
  });

  const [editable, setEditable] = useState(false);

  const list = useSelector(getContactList);

  const getEditData = () => {
    const editInitialvalues = list?.filter((list) => {
      return list?.id === params.id;
    });

    if (editInitialvalues) {
      setEditable(true);
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
  }, [editId]);

  return (
    <>{editable ? <ContactForm editValues={editValues} /> : <h1>Loading</h1>}</>
  );
};

export default EdiContactForm;
