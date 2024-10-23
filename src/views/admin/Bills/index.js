import CategoriesTable from "components/CategoriesTable";
import Widget from "components/widget/Widget";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDateRange } from "react-icons/md";
import { columnsDataComplex, VISIBLE_FIELDS } from "./variables/columnsData";
import Notify from "simple-notify";
import { FetchAllBills, DeleteBill, FetchBill } from "services/billsApis";
import {
  FaArrowLeft,
  FaBookOpen,
  FaMoneyBillAlt,
  FaUserTie,
} from "react-icons/fa";
import BillModal from "./components/BillModal";

const Bills = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Bills, setBills] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [freeBills, setFreeBills] = useState([]);
  const [BillsDetails, setBillsDetails] = useState({});

  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });

  const fetchBills = async () => {
    try {
      const allBills = await FetchAllBills();
      setBills(allBills.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  useEffect(() => {
    const filtermachines = Bills?.filter(
      (item) => item?.Bill_status === "Open"
    );
    setFreeBills(filtermachines);
  }, [Bills]);

  const handleMachineDelete = async (id) => {
    try {
      setIsloading(true);
      const deleted = await DeleteBill(id);
      if (deleted) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Bill deleted successfully!",
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
        fetchBills();
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

  const handleBillDetails = (data) => {
    FetchBillDetails(data);
  };

  const FetchBillDetails = async (id) => {
    try {
      const BillDetails = await FetchBill(id);
      setBillsDetails(BillDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {BillsDetails?._id ? (
        <div className="space-y-6">
          <Button
            className="flex items-center"
            onClick={() => setBillsDetails({})}
          >
            <FaArrowLeft />
            <p className="ml-2">Back</p>
          </Button>
          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            {BillsDetails.bill_name}
          </h2>
          <div className="rounded-lg bg-white p-4  shadow-md">
            <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-green-500" />
                <span>Bill Id: {BillsDetails.bill_id}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaUserTie className="text-purple-500" />
                <span>Bill Type: {BillsDetails.bill_type}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-green-500" />
                <span>Bill Amount: {BillsDetails.bill_amount}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-purple-500" />
                <span>
                  Bill Account: {BillsDetails.bill_account || "Not Mentioned"}
                </span>
              </p>
              <p className="flex items-center space-x-3">
                <MdDateRange className="text-yellow-500" />
                <span>
                  Bill Date:
                  {new Date(BillsDetails.bill_date).toLocaleDateString()}
                </span>
              </p>
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-purple-500" />
                <span>
                  Bill Status: {BillsDetails.bill_status || "Not Mentioned"}
                </span>
              </p>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Bill Project: {BillsDetails.bill_project}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total Bills"}
              subtitle={Bills?.length}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Total Bills"}
              subtitle={freeBills?.length}
            />
            <div className="rounded-[20px] bg-white px-3 py-2 dark:!bg-navy-700">
              <button
                onClick={() => setOpenModal(true)}
                className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Add Bills
              </button>
            </div>
          </div>
          <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
              <CategoriesTable
                tableData={Bills}
                tableHeader="Bills Table"
                tableFor="Bills"
                columnsData={columnsDataComplex}
                VISIBLE_FIELDS={VISIBLE_FIELDS}
                handleDelete={handleMachineDelete}
                isLoading={isLoading}
                setIsloading={setIsloading}
                selectedProfession={selectedItem}
                fetchBills={fetchBills}
                modalData={modalData}
                setModalData={setModalData}
                handleDetails={handleBillDetails}
                firstField="bill_name"
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
        <Modal.Header>Add New Bill</Modal.Header>
        <Modal.Body>
          <BillModal fetchBills={fetchBills} setOpenModal={setOpenModal} />
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={modalData?.type === "Edit" ? true : false}
        onClose={() => setModalData({ type: "", id: "" })}
        size={modalData?.type === "Edit" ? "4xl" : "xl"}
      >
        <Modal.Header>Edit Bills</Modal.Header>
        <Modal.Body>
          <BillModal
            setOpenModal={setOpenModal}
            fetchBills={fetchBills}
            data={Bills}
            selected={modalData?.id}
            setModalData={() => setModalData({ type: "", id: "" })}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Bills;
