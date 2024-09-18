import CategoriesTable from "./components/CategoriesTable";
import { VISIBLE_FIELDS, columnsDataComplex } from "./variables/columnsData";
import Widget from "components/widget/Widget";
import { MdBarChart } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { Modal } from "flowbite-react";
import React, { useState, useEffect } from "react";
import CategoriesModal from "./components/CategoriesModal";
import Notify from "simple-notify";
import { FetchAllEmployees, DeleteEmployee } from "services/employeesApis";

const Employees = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Employees, setEmployees] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [AvailableEmployees, setAvailableEmployees] = useState([]);

  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });
  const [selectedProfession, setSelectedProfession] = useState("");

  const fetchEmployees = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const allEmployees = await FetchAllEmployees(accessToken);
      setEmployees(allEmployees.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filterEquipments = Employees?.filter(
      (item) => !item?.projects?.length
    );
    setAvailableEmployees(filterEquipments);
  }, [Employees]);

  const handleEmployeeDelete = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      setIsloading(true);
      const deleted = await DeleteEmployee(accessToken, id);
      if (deleted) {
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
        setSelectedProfession({ selectedOption: null });
        fetchEmployees();
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
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Employees"}
          subtitle={Employees?.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Available Employees"}
          subtitle={AvailableEmployees?.length}
        />
        <div className="rounded-[20px] bg-white px-3 py-2">
          <button
            onClick={() => setOpenModal(true)}
            className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Add Employee
          </button>
        </div>
      </div>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
          <CategoriesTable
            tableData={Employees}
            tableHeader="Employees Table"
            tableFor="Professional"
            columnsData={columnsDataComplex}
            VISIBLE_FIELDS={VISIBLE_FIELDS}
            handleDelete={handleEmployeeDelete}
            isLoading={isLoading}
            setIsloading={setIsloading}
            selectedProfession={selectedProfession}
            fetchEmployees={fetchEmployees}
            modalData={modalData}
            setModalData={setModalData}
          />
        </div>
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"4xl"}
        className="w-10/12 md:w-full"
      >
        <Modal.Header>Add New Employee</Modal.Header>
        <Modal.Body>
          <CategoriesModal
            fetchEmployees={fetchEmployees}
            setOpenModal={setOpenModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Employees;
