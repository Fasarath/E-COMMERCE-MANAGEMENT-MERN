import { useDispatch } from "react-redux";
import { setDressList } from "../slices/dressSlice";

const useDressActions = () => {
  const dispatch = useDispatch();

  const setDressListAction = (dressList) => {
    dispatch(setDressList(dressList));
  };

  return {
    setDressListAction,
  };
};

export default useDressActions;
