import React from "react";
import Select from "react-select";
import { Label } from "flowbite-react";
import { colourStyles } from "../../../../views/admin/ColorStyles";

const EditModal = (props) => {
  return (
    <div className="grid h-96 min-h-full grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-2">
      <div className="rounded-[20px] bg-white px-5 py-3">
        <Label>Select {props.tableFor} or Speciality</Label>
        <Select
          isSearchable
          value={props.selectedProfession?.selectedOption}
          onChange={props.handleProfessionChange}
          options={props.professions}
          styles={colourStyles}
        />
      </div>
      <div className="rounded-[20px] bg-white px-5 py-3">
        <Label>Associates Links</Label>
        {props?.selectedAssociates?.selectedOption === undefined ? null : (
          <Select
            isMulti
            value={props?.selectedAssociates?.selectedOption}
            onChange={props.handleAssociatesChange}
            options={props.professionsLinks}
            closeMenuOnSelect={false}
            styles={colourStyles}
          />
        )}
      </div>
    </div>
  );
};

export default EditModal;
