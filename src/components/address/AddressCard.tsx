import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AddressType } from "../../misc/type";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import RemovalModal from "./RemovalModal";
import deleteUserAddress from "../../redux/thunks/deleteUserAddress";
import { USER_ADDRESSURL } from "../../constants";
import setDefaultAddress from "../../redux/thunks/setDefaultAddress";
import { ToastContainer, toast } from "react-toastify";
import { CustomToastContainer } from "../../styles/styles";

interface AddressCardProps {
  address: AddressType;
  isChecked: boolean;
  handleRadioChange: (id: string) => void;
}

const AddressCard = (props: AddressCardProps) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { address, isChecked, handleRadioChange } = props;

  const userDefAddrId: string | undefined = useSelector(
    (state: AppState) => state.userReducer.defaultAddId
  );

  const token = localStorage.getItem("refresh-token") ?? "";

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = async (action: string, id: string) => {
    if (action === "No") setOpen(false);
    else {
      try {
        var result = await dispatch(
          deleteUserAddress({ baseUrl: `${USER_ADDRESSURL}/${id}`, token })
        );
        setOpen(false);
        if (result) {
          navigate("/profile");
        }
      } catch (err) {}
    }
  };
  const editAddressHandler = (selectedAddress: string) => {
    handleRadioChange(selectedAddress);
    navigate(`/address/edit/${address.id}`);
  };

  const defaultAddressHandler = async (selectedAddress: string) => {
    handleRadioChange(selectedAddress);

    const baseUrl = `${USER_ADDRESSURL}/${selectedAddress}/setdefault`;
    const result = await dispatch(setDefaultAddress({ baseUrl, token }));
  };

  return (
    <>
      <Card
        variant="outlined"
        aria-label={`Address card for ${address.user.userName}`}
        sx={{
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
          <FormControlLabel
            control={
              <Radio
                checked={isChecked}
                onChange={() => handleRadioChange(address.id)}
                value={address.id}
              />
            }
            label=""
          />
          {userDefAddrId && address.id === userDefAddrId && (
            <Typography
              variant="overline"
              component="div"
              aria-label="default address"
            >
              Default:
            </Typography>
          )}
          <Typography variant="body1" component="div">
            {address.user.userName}
          </Typography>
          <Typography variant="body2" component="div">
            {address.user.email}
          </Typography>
          <Typography variant="body2" component="div">
            {address.addressLine}, {address.street}, {address.city}
          </Typography>
          <Typography variant="body2" component="div">
            {address.country}
          </Typography>
          <Typography variant="body2" component="div">
            {address.postcode}
          </Typography>
          <Typography variant="body2" component="div">
            {address.landmark}
          </Typography>
          <Typography variant="body2" component="div">
            Phone number: {address.phoneNumber}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            size="small"
            aria-label={`edit address for ${address.user.userName}`}
            onClick={() => editAddressHandler(address.id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            aria-label={`remove address for ${address.user.userName}`}
            onClick={handleOpen}
          >
            Remove
          </Button>
          {userDefAddrId !== address.id && (
            <Button
              size="small"
              aria-label={`set ${address.user.userName}'s address as default`}
              onClick={() => defaultAddressHandler(address.id)}
            >
              Set as Default
            </Button>
          )}
        </CardActions>
      </Card>
      <RemovalModal open={open} handleClose={handleClose} address={address} />
    </>
  );
};

export default AddressCard;
