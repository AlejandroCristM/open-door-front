import { useReducer, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function useUserState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = useAuth0();

  const { creatingUser, userCreated, userRole, userId } = state;

  useEffect(() => {
    const fetchUserId = async () => {
      const res = await axios.get(
        "https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/getRole",
        {
          headers: { email: user.email },
        }
      );
      switch (res.data.rol) {
        case "admin":
          setUserIdAndRole({role:"admin", id:res.data.admin.id});
          break;

        case "user":
          setUserIdAndRole({role:"user", id:res.data.user.id});
          break;

        default:
          handleCreatingUser();
          break;
      }
    };
    if (isAuthenticated) {
      fetchUserId();
    }
  }, [isAuthenticated]);

  function handleCreatingUser() {
        dispatch({ type: "creatingUser" });
    }

  const handleUserCreated = ({ userCreatedId }) => {
    console.log(userCreatedId);
    dispatch({ type: "userCreated", payload: userCreatedId });
  };

  const setUserIdAndRole = ({ role, id }) => {
    dispatch({ type: "setUserRole", payload: role });
    dispatch({ type: "userCreated", payload: id });
  };

  return {
    user,
    isAuthenticated,
    userRole,
    userId,
    creatingUser,
    userCreated,
    handleCreatingUser,
    handleUserCreated,
  };
}

const reducer = (state, action) => {
  switch (action.type) {
    case "creatingUser":
      return { ...state, creatingUser: true };

    case "userCreated":
      return { ...state, creatingUser: false, userCreated: true,  userId: action.payload};

    case "setUserRole":
      return { ...state, userRole: action.payload };

    default:
      return state;
  }
};

const initialState = {
  creatingUser: false,
  userCreated: false,
  userRole: "",
  userId: "",
};

export { useUserState };
