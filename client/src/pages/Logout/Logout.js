import localStorage from "local-storage";
const Logout = (props) => {
  localStorage.clear();
  window.location.replace("/");
};
export default Logout;
