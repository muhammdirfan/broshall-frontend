import CategoriesTable from "components/CategoriesTable";
import Widget from "components/widget/Widget";
import { Modal, Button, Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import AddEquipmentModal from "./components/AddEquipmentModal";
import { columnsDataComplex, VISIBLE_FIELDS } from "./variables/columnsData";
import EditModal from "./components/editModal";
import Notify from "simple-notify";
import { FetchAllEquipments } from "services/equipmentsApis";
import { DeleteEquipment } from "services/equipmentsApis";
import { FetchEquipment } from "services/equipmentsApis";
import { MdDateRange, MdFormatListNumbered } from "react-icons/md";
import { FaArrowLeft, FaUserTie } from "react-icons/fa";
import { GiMoneyStack, GiTyre } from "react-icons/gi";

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

  const handleEquipmentsDetails = (data) => {
    FetchEquipmentDetails(data);
  };

  const FetchEquipmentDetails = async (id) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const equipmentDetails = await FetchEquipment(id, accessToken);
      setEquipmentsDetails(equipmentDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const backendUrl = "http://localhost:5000"; // Adjust this to match your backend URL

  return (
    <>
      {EquipmentsDetails?._id ? (
        <div className="space-y-6">
          <Button
            className="flex items-center"
            onClick={() => setEquipmentsDetails({})}
          >
            <FaArrowLeft />
            <p className="ml-2">Back</p>
          </Button>
          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            {EquipmentsDetails.name}
          </h2>
          <div className="rounded-md border p-4 shadow-md">
            <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
              <p className="flex items-center space-x-3">
                <GiTyre className="text-purple-500" />
                <span>Equipment Type: {EquipmentsDetails.type}</span>
              </p>
              <p className="flex items-center space-x-3">
                <MdFormatListNumbered className="text-green-500" />
                <span>
                  Number of Equipment: {EquipmentsDetails.no_of_equipments}
                </span>
              </p>
              <p className="flex items-center space-x-3">
                <GiMoneyStack className="text-blue-500" />
                <span>
                  Equipment Value: {EquipmentsDetails.equipment_value}
                </span>
              </p>
              <p className="flex items-center space-x-3">
                <FaUserTie className="text-purple-500" />
                <span>Owner: {EquipmentsDetails.ownerShip}</span>
              </p>
              <p className="flex items-center space-x-3">
                <MdDateRange className="text-yellow-500" />
                <span>
                  Added Date:
                  {new Date(EquipmentsDetails.createdAt).toLocaleDateString()}
                </span>
              </p>
              {EquipmentsDetails.updatedAt && (
                <p className="flex items-center space-x-3">
                  <MdDateRange className="text-yellow-500" />
                  <span>
                    Updated Date:{" "}
                    {new Date(EquipmentsDetails.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Description: {EquipmentsDetails.descripton}
            </p>
          </div>
          <div className="flex justify-center">
            <Carousel
              className="rounded-0 my-0 mx-auto h-[35rem] w-[50rem]"
              style={{ borderRadius: "0px" }}
              slide={true}
            >
              {EquipmentsDetails.images?.map((image, index) => (
                <div className="rounded-0 relative h-full w-full">
                  <img
                    src={`${backendUrl}${image}`}
                    className="h-full w-full"
                    alt={`Project Image ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      ) : (
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
        </>
      )}
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
