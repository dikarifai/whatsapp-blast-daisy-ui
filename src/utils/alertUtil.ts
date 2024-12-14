import Swal from "sweetalert2";

export const successAlert = (title: string) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: title || "Success",
    showConfirmButton: false,
    timer: 2000,
  });
};
export const errorAlert = (title: string) => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: title || "Failed",
    showConfirmButton: false,
    timer: 2000,
  });
};
