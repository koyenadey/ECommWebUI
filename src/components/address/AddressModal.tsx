import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { setOrderAddresId } from "../../redux/slices/orderSlice";

// [
//   {
//     id: 1,
//     name: "harry",
//     email: "harry@testmail.com",
//     addressLine: "41 C Pori, 4th Main, Espoo",
//     country: "Finland",
//     postalCode: "02650",
//     landmark: "K-Market",
//     phoneNumber: "465833667834",
//   },
//   // You can add more addresses here
// ];

interface AddressModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddressModal = ({ open, handleClose }: AddressModalProps) => {
  const dispatch = useAppDispatch();
  const addresses = useSelector(
    (state: AppState) => state.userReducer.addresses
  );

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress(event.target.value);
  };

  const handleOk = () => {
    if (selectedAddress) {
      dispatch(setOrderAddresId(selectedAddress));
      handleClose();
    } else {
      // Optional: handle the case when no address is selected
      alert("Please select an address.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="address-modal-title"
      aria-describedby="address-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="address-modal-title" variant="h6" component="h2">
            Your Addresses
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="addresses"
            name="addresses"
            value={selectedAddress}
            onChange={handleSelect}
          >
            {addresses.map((address) => (
              <FormControlLabel
                key={address.id}
                value={address.id.toString()}
                control={<Radio />}
                label={
                  <Box>
                    <Typography>{address.user.userName}</Typography>
                    <Typography>{address.user.email}</Typography>
                    <Typography>{address.addressLine}</Typography>
                    <Typography>{address.country}</Typography>
                    <Typography>{address.postcode}</Typography>
                    <Typography>{address.landmark}</Typography>
                    <Typography>{address.phoneNumber}</Typography>
                    <Divider />
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={handleOk} variant="contained" sx={{ mr: 2 }}>
            OK
          </Button>
          {/* <Button onClick={handleClose} variant="outlined">
            Close
          </Button> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddressModal;
