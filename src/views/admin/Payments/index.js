import CategoriesTable from "components/CategoriesTable";
import Widget from "components/widget/Widget";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDateRange } from "react-icons/md";
import { columnsDataComplex, VISIBLE_FIELDS } from "./variables/columnsData";
import Notify from "simple-notify";
import {
  FetchAllPayments,
  DeletePayment,
  FetchPayment,
} from "services/paymentsApis";
import {
  FaArrowLeft,
  FaBookOpen,
  FaMoneyBillAlt,
  FaUserTie,
} from "react-icons/fa";
import PaymentModal from "./components/PaymentModal";

const Payments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [Payments, setPayments] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [freePayments, setFreePayments] = useState([]);
  const [PaymentsDetails, setPaymentsDetails] = useState({});

  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });

  const fetchPayments = async () => {
    try {
      const allPayments = await FetchAllPayments();
      setPayments(allPayments.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    const filtermachines = Payments?.filter(
      (item) => item?.payment_status === "Open"
    );
    setFreePayments(filtermachines);
  }, [Payments]);

  const handleMachineDelete = async (id) => {
    try {
      setIsloading(true);
      const deleted = await DeletePayment(id);
      if (deleted) {
        new Notify({
          status: "success",
          title: "Success",
          text: "Payment deleted successfully!",
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
        fetchPayments();
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

  const handlePaymentDetails = (data) => {
    FetchPaymentDetails(data);
  };

  const FetchPaymentDetails = async (id) => {
    try {
      const PaymentDetails = await FetchPayment(id);
      setPaymentsDetails(PaymentDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {console.log("PaymentsDetails", PaymentsDetails)}
      {PaymentsDetails?._id ? (
        <div className="space-y-6">
          <Button
            className="flex items-center"
            onClick={() => setPaymentsDetails({})}
          >
            <FaArrowLeft />
            <p className="ml-2">Back</p>
          </Button>
          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            {PaymentsDetails.payment_name}
          </h2>
          <div className="rounded-lg bg-white p-4  shadow-md">
            <div className="grid grid-cols-1 gap-6 text-gray-700 md:grid-cols-2">
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-green-500" />
                <span>Payment Id: {PaymentsDetails.payment_id}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaUserTie className="text-purple-500" />
                <span>Payment Type: {PaymentsDetails.payment_type}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-green-500" />
                <span>Payment Amount: {PaymentsDetails.payment_amount}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-purple-500" />
                <span>
                  Payment Account:{" "}
                  {PaymentsDetails.payment_account || "Not Mentioned"}
                </span>
              </p>
              <p className="flex items-center space-x-3">
                <MdDateRange className="text-yellow-500" />
                <span>
                  Payment Date:
                  {new Date(PaymentsDetails.payment_date).toLocaleDateString()}
                </span>
              </p>
              <p className="flex items-center space-x-3">
                <FaMoneyBillAlt className="text-purple-500" />
                <span>
                  Payment Status:{" "}
                  {PaymentsDetails.payment_status || "Not Mentioned"}
                </span>
              </p>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Payment Project: {PaymentsDetails.payment_project}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total Payments"}
              subtitle={Payments?.length}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Total Payments"}
              subtitle={freePayments?.length}
            />
            <div className="rounded-[20px] bg-white px-3 py-2">
              <button
                onClick={() => setOpenModal(true)}
                className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Add Payments
              </button>
            </div>
          </div>
          <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
              <CategoriesTable
                tableData={Payments}
                tableHeader="Payments Table"
                tableFor="Payments"
                columnsData={columnsDataComplex}
                VISIBLE_FIELDS={VISIBLE_FIELDS}
                handleDelete={handleMachineDelete}
                isLoading={isLoading}
                setIsloading={setIsloading}
                selectedProfession={selectedItem}
                fetchPayments={fetchPayments}
                modalData={modalData}
                setModalData={setModalData}
                handleDetails={handlePaymentDetails}
                firstField="payment_name"
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
        <Modal.Header>Add New Payment</Modal.Header>
        <Modal.Body>
          <PaymentModal
            fetchPayments={fetchPayments}
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
        <Modal.Header>Edit Payments</Modal.Header>
        <Modal.Body>
          <PaymentModal
            setOpenModal={setOpenModal}
            fetchPayments={fetchPayments}
            data={Payments}
            selected={modalData?.id}
            setModalData={() => setModalData({ type: "", id: "" })}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Payments;
