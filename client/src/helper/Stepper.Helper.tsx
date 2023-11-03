/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { ApplicantModelProps } from "../interface/ApplicantMode.Type";
import useLocalStorage from "../hooks/useLocalStorage";
import { useFormikContext } from "formik";
import { useEffect } from "react";

// Functions

export const FetchLocalStorageFormData = (name: string) => {
  const { getItem, setItems } = useLocalStorage(name);
  const { values, setValues } = useFormikContext<ApplicantModelProps>();

  useEffect(() => {
    // if there is no instance then create one
    if (!getItem()) {
      setItems(values || []);
    }

    // there is instance store it
    setValues(getItem() || values);

    return () => {
      setValues(values);
    };
  }, []);
};
