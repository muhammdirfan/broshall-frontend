import { Button } from "flowbite-react";
import React from "react";

const DeleteModel = ({ id, onCancel = () => {}, handleDelete = () => {} }) => {
  return (
    <div>
      <p className="pb-3 text-gray-700 dark:text-white">
        Are you sure, you want to delete this contact?
      </p>
      <div className="flex items-center justify-end">
        <Button
          color="light"
          pill
          className="px-5"
          onClick={() => onCancel({ open: false, type: "", id: null })}
        >
          Cancel
        </Button>
        <Button
          color="failure"
          pill
          className="ml-10 px-5"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteModel;
