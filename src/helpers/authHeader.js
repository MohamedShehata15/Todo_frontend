const authHeader = () => {
   let user = JSON.parse(localStorage.getItem("userData"));

   if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
   } else {
      return {};
   }
};

export default authHeader;
