import CategoriesTable from "components/CategoriesTable";
import Widget from "components/widget/Widget";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import AddEquipmentModal from "./components/AddEquipmentModal";
import { columnsDataComplex, VISIBLE_FIELDS } from "./variables/columnsData";
import EditModal from "./components/editModal";
import Notify from "simple-notify";
import { FetchAllEquipments } from "services/equipmentsApis";
import { DeleteEquipment } from "services/equipmentsApis";

const Equipments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Equipments, setEquipments] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [freeEquipments, setFreeEquipments] = useState([]);
  const [EquipmentsDetails, setEquipmentsDetails] = useState({});

  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });

  const fetchEquipments = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const allEquipments = await FetchAllEquipments(accessToken);
      setEquipments(allEquipments.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  useEffect(() => {
    const filterEquipments = Equipments?.filter(
      (item) => !item?.projects?.length
    );
    setFreeEquipments(filterEquipments);
  }, [Equipments]);

  const handleEquipmentDelete = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      setIsloading(true);
      const deleted = await DeleteEquipment(accessToken, id);
      if (deleted) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Equipments deleted successfully!",
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
        setSelectedItem({ selectedOption: null });
        fetchEquipments();
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

  const handleEquipmentsDetails = () => {
    // alert("test");
  };

  const backendUrl = "http://localhost:5000"; // Adjust this to match your backend URL

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Equipments"}
          subtitle={Equipments?.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Total Equipments"}
          subtitle={freeEquipments?.length}
        />
        <div className="rounded-[20px] bg-white px-3 py-2">
          <button
            onClick={() => setOpenModal(true)}
            className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Add Equipments
          </button>
        </div>
      </div>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
          <CategoriesTable
            tableData={Equipments}
            tableHeader="Equipments Table"
            tableFor="Equipments"
            columnsData={columnsDataComplex}
            VISIBLE_FIELDS={VISIBLE_FIELDS}
            handleDelete={handleEquipmentDelete}
            isLoading={isLoading}
            setIsloading={setIsloading}
            selectedProfession={selectedItem}
            fetchEquipments={fetchEquipments}
            modalData={modalData}
            setModalData={setModalData}
            handleDetails={handleEquipmentsDetails}
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
        <Modal.Header>Add New Equipment</Modal.Header>
        <Modal.Body>
          <AddEquipmentModal
            fetchEquipements={fetchEquipments}
            setOpenModal={setOpenModal}
          />
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={modalData?.type === "Edit" ? true : false}
        onClose={() => setModalData({ type: "", id: "" })}
        size={modalData?.type === "Edit" ? "4xl" : "xl"}
      >
        <Modal.Header>{`Edit Equipments`}</Modal.Header>
        <Modal.Body>
          <EditModal
            setOpenModal={setOpenModal}
            fetchEquipements={fetchEquipments}
            data={Equipments}
            selected={modalData?.id}
            setModalData={() => setModalData({ type: "", id: "" })}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Equipments;
