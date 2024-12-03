import { toast } from "react-toastify";

const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};
const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};

export { handleError, handleSuccess };
export const APIUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
