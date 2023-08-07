import localStorage from "local-storage";

const Logout = () => {
  localStorage.clear();
  window.location.replace("/");
};
export default Logout;
