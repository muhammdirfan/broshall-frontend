import { VISIBLE_FIELDS, columnsDataComplex } from "./variables/columnsData";
import React, { useState } from "react";
import Widget from "components/widget/Widget";
import { MdBarChart } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { Button, Modal } from "flowbite-react";
import CategoriesTable from "./components/CategoriesTable";
import CategoriesModal from "./components/CategoriesModal";
import { fetchEstablishment } from "services/establishmentApis";
import Notify from "simple-notify";
import {
  deleteEstablishment,
} from "services/establishmentApis";

const Tables = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [Establishments, setEstablishments] = React.useState();
  const [inputFields, setInputFields] = useState([
    {
      adminId: "",
      category: "",
    },
  ]);
  const [modalData, setModalData] = useState({
    type: "",
    id: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState("");
  const [establishmentsFormated, setEstablishmentsFormated] = React.useState(
    []
  );

  const fetchEstablishments = async () => {
    try {
      const Establishments = await fetchEstablishment();
      setEstablishments(Establishments.reverse());
      const formatedEstablishments = Establishments?.map((item) => ({
        value: item?.name,
        label: item?.name,
      }));
      setEstablishmentsFormated(formatedEstablishments);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchEstablishments();
  }, []);

  React.useEffect(() => {
    const slectedData = Establishments?.filter(
      (item) => item?.id == modalData?.id
    );
    if (slectedData?.length) {
      setSelectedEstablishment(slectedData[0]?.name);
    }
  }, [Establishments, modalData?.id]);

  const handleEstablishmentDelete = async (id) => {
    const data = {
      id: id,
    };
    try {
      setIsloading(true);
      const deleted = await deleteEstablishment(data);
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
        fetchEstablishments();
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
          title={"Total HCE"}
          subtitle={Establishments?.length}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"HCE Area"}
          subtitle={"0"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"HCE Countries"}
          subtitle={"0"}
        />
        <div className="rounded-[20px] bg-white px-3 py-2">
          <button
            onClick={() => setOpenModal(true)}
            className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Add Establishments Type
          </button>
        </div>
      </div>
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-12 h-fit w-full xl:col-span-12 2xl:col-span-12">
          <CategoriesTable
            tableData={Establishments}
            tableHeader="Establistments Table"
            tableFor="Establistment"
            columnsData={columnsDataComplex}
            VISIBLE_FIELDS={VISIBLE_FIELDS}
            modalData={modalData}
            setModalData={setModalData}
            handleDelete={handleEstablishmentDelete}
            professions={establishmentsFormated}
            isLoading={isLoading}
            setIsloading={setIsloading}
            selectedProfession={selectedEstablishment}
            fetchEstablishments={fetchEstablishments}
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
        <Modal.Header>Add New Establishments</Modal.Header>
        <Modal.Body>
          <CategoriesModal
            fetchEstablishments={fetchEstablishments}
            inputFields={inputFields}
            setInputFields={setInputFields}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenModal(false);
              fetchEstablishments();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Tables;
