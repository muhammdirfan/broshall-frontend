import Widget from "components/widget/Widget";
import React from "react";
import { MdBarChart } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import CategoriesTable from "./components/CategoriesTable";
import { Button, Modal } from "flowbite-react";
import CategoriesModal from "./components/CategoriesModal";
import { VISIBLE_FIELDS, columnsDataComplex } from "./variables/columnsData";
import { fetchStudentsCategory } from "services/studentsApis";
import { deleteStudent } from "services/studentsApis";
import Notify from "simple-notify";

const ProfileOverview = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [Students, setStudents] = React.useState();
  const [modalData, setModalData] = React.useState({
    type: "",
    id: "",
  });
  const [isLoading, setIsloading] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState();

  const fetchStudents = async () => {
    try {
      const Category = await fetchStudentsCategory();
      setStudents(Category.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  React.useEffect(() => {
    const slectedData = Students?.filter((item) => item?.id == modalData?.id);
    if (slectedData?.length) {
      setSelectedStudent(slectedData[0]?.name);
    }
  }, [Students, modalData?.id]);

  const handleStudentDelete = async (id) => {
    const data = {
      id: id,
    };
    try {
      setIsloading(true);
      const deleted = await deleteStudent(data);
      if (deleted?.data?.ok == 1) {
        new Notify({
          status: "success",
          title: "Success",
          text: deleted?.message,
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
        setIsloading(false);
        setSelectedStudent({ selectedOption: null });
        fetchStudents();
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
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total HCS"}
          subtitle={Students?.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"HCS Area"}
          subtitle={"0"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"HCS Countries"}
          subtitle={"0"}
        />
        <div className="rounded-[20px] bg-white px-3 py-2">
          <button
            onClick={() => setOpenModal(true)}
            className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Add Student
          </button>
        </div>
      </div>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
          <CategoriesTable
            tableData={Students}
            tableHeader="Students Table"
            tableFor="Student"
            columnsData={columnsDataComplex}
            VISIBLE_FIELDS={VISIBLE_FIELDS}
            modalData={modalData}
            setModalData={setModalData}
            handleDelete={handleStudentDelete}
            isLoading={isLoading}
            setIsloading={setIsloading}
            selectedProfession={selectedStudent}
            fetchStudents={fetchStudents}
          />
        </div>
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"3xl"}
        className="w-10/12 md:w-full"
      >
        <Modal.Header>Add New Student</Modal.Header>
        <Modal.Body>
          <CategoriesModal
            fetchStudents={fetchStudents}
            openModal={openModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
              fetchStudents();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileOverview;
