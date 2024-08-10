import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import InputField from "components/fields/InputField";
import Notify from "simple-notify";
import { updateStudent } from "services/studentsApis";

const EditModal = (props) => {
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    if (props.selectedProfession) {
      setSelectedStudent(props.selectedProfession);
    }
  }, [props.selectedProfession]);

  const handleStudentUpdateChange = (value) => {
    setSelectedStudent(value);
  };

  const handleUpdateStudent = async (id) => {
    const data = {
      id: id,
      name: selectedStudent,
    };
    try {
      props.setIsloading(true);
      const updated = await updateStudent(data);
      if (updated?.data?.ok == 1) {
        new Notify({
          status: "success",
          title: "Success",
          text: updated?.message,
          effect: "fade",
          speed: 300,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: "right bottom",
        });
        props.setIsloading(false);
        setSelectedStudent("");
        props.fetchStudents();
      }
    } catch (error) {
      console.log(error);
      new Notify({
        status: "error",
        title: "Error",
        text: "Something went wrong, Please try again!",
        effect: "fade",
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right bottom",
      });
      props.setIsloading(false);
    }
  };
  return (
    <>
      <div className="grid min-h-full grid-cols-1 items-start gap-5">
        <div className="rounded-[20px] bg-white px-5 py-3">
          <InputField
            variant="auth"
            extra="mb-3"
            label={props.tableFor}
            placeholder="Example: Surgeon, Cardiologist etc"
            id="profession"
            type="text"
            value={selectedStudent}
            onChange={(e) => handleStudentUpdateChange(e.target?.value)}
          />
        </div>
      </div>
      {props.modalData?.type === "Edit" ? (
        <div>
          <Button
            onClick={() => {
              handleUpdateStudent(props.selected);
            }}
          >
            {`${props.isLoading ? "loading..." : "Update"}`}
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default EditModal;
