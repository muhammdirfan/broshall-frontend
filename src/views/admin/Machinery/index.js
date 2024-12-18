import CategoriesTable from "components/CategoriesTable";
import Widget from "components/widget/Widget";
import { Button, Carousel, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoDocuments } from "react-icons/io5";
import {
  MdBarChart,
  MdDateRange,
  MdFormatListNumbered,
  MdModelTraining,
} from "react-icons/md";
import { FetchAllMachines } from "services/machinesApi";
import AddMachineModal from "./components/AddMachineModal";
import { columnsDataComplex, VISIBLE_FIELDS } from "./variables/columnsData";
import EditModal from "./components/editModal";
import { DeleteMachine } from "services/machinesApi";
import Notify from "simple-notify";
import { FaArrowLeft, FaUserTie } from "react-icons/fa";
import { GiMoneyStack, GiTyre } from "react-icons/gi";
import { FetchMachine } from "services/machinesApi";

const Machinery = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Machinery, setMachinery] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [freeMachinery, setFreeMachinery] = useState([]);
  const [machineryDetails, setMachineryDetails] = useState({});

  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });

  const fetchMachinery = async () => {
    try {
      const allMachinery = await FetchAllMachines();
      setMachinery(allMachinery.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMachinery();
  }, []);

  useEffect(() => {
    const filtermachines = Machinery?.filter((item) => !item?.projects?.length);
    setFreeMachinery(filtermachines);
  }, [Machinery]);

  const handleMachineDelete = async (id) => {
    try {
      setIsloading(true);
      const deleted = await DeleteMachine(id);
      if (deleted) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Machine deleted successfully!",
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
        fetchMachinery();
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

  const handleMachineDetails = (data) => {
    FetchMachineDetails(data);
  };

  const FetchMachineDetails = async (id) => {
    try {
      const machineDetails = await FetchMachine(id);
      setMachineryDetails(machineDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const backendUrl = "http://localhost:5000"; // Adjust this to match your backend URL

  return (
    <>
      {machineryDetails?._id ? (
        <div className="space-y-6">
          <Button
            className="flex items-center"
            onClick={() => setMachineryDetails({})}
          >
            <FaArrowLeft />
            <p className="ml-2">Back</p>
          </Button>
          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            {machineryDetails.name}
          </h2>
          <div className="rounded-md border p-4 shadow-md">
            <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
              <p className="flex items-center space-x-3">
                <GiTyre className="text-purple-500" />
                <span>Machine Type: {machineryDetails.type}</span>
              </p>
              <p className="flex items-center space-x-3">
                <MdFormatListNumbered className="text-green-500" />
                <span>Machine Number: {machineryDetails.machine_no}</span>
              </p>
              <p className="flex items-center space-x-3">
                <GiMoneyStack className="text-blue-500" />
                <span>Machine Value: {machineryDetails.machine_value}</span>
              </p>
              <p className="flex items-center space-x-3">
                <MdModelTraining className="text-red-500" />
                <span>Model: {machineryDetails.model}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaUserTie className="text-purple-500" />
                <span>Owner: {machineryDetails.owner}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaUserTie className="text-purple-500" />
                <span>Partner: {machineryDetails.partner || "None"}</span>
              </p>
              <p className="flex items-center space-x-3">
                <MdDateRange className="text-yellow-500" />
                <span>
                  Added Date:
                  {new Date(machineryDetails.createdAt).toLocaleDateString()}
                </span>
              </p>
              {machineryDetails.updatedAt && (
                <p className="flex items-center space-x-3">
                  <MdDateRange className="text-yellow-500" />
                  <span>
                    Updated Date:{" "}
                    {new Date(machineryDetails.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Description: {machineryDetails.descripton}
            </p>
          </div>
          <div className="flex justify-center">
            <Carousel
              className="rounded-0 my-0 mx-auto h-[35rem] w-[50rem]"
              style={{ borderRadius: "0px" }}
              slide={true}
            >
              {machineryDetails.images?.map((image, index) => (
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
              title={"Total Machinery"}
              subtitle={Machinery?.length}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Available Machinery"}
              subtitle={freeMachinery?.length}
            />
            <div className="rounded-[20px] bg-white px-3 py-2 dark:!bg-navy-700">
              <button
                onClick={() => setOpenModal(true)}
                className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Add Machinery
              </button>
            </div>
          </div>
          <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
              <CategoriesTable
                tableData={Machinery}
                tableHeader="Machinery Table"
                tableFor="Machinery"
                columnsData={columnsDataComplex}
                VISIBLE_FIELDS={VISIBLE_FIELDS}
                handleDelete={handleMachineDelete}
                isLoading={isLoading}
                setIsloading={setIsloading}
                selectedProfession={selectedItem}
                fetchMachinery={fetchMachinery}
                modalData={modalData}
                setModalData={setModalData}
                handleDetails={handleMachineDetails}
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
        <Modal.Header>{"Add New Machine"}</Modal.Header>
        <Modal.Body>
          <AddMachineModal
            fetchMachinery={fetchMachinery}
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
        <Modal.Header>Edit Machinery</Modal.Header>
        <Modal.Body>
          <EditModal
            setOpenModal={setOpenModal}
            fetchMachinery={fetchMachinery}
            data={Machinery}
            selected={modalData?.id}
            setModalData={() => setModalData({ type: "", id: "" })}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Machinery;
