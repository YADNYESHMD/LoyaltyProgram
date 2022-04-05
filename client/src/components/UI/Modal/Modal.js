import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormControlLabel, Checkbox } from "@mui/material";

import "./Modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
};

export default function BasicModal(props) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  let discount = props.rewards;
  if (!checked) {
    discount = 0;
  }

  const onClick = () => {
    setLoading(true);
    props.onClick(props.totalPrice, discount, checked);
  };

  const checkBoxDiscountHandler = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {props.type === "flight" ? "Total Fare" : "Total Price"}
                  </TableCell>
                  <TableCell>₹{props.totalPrice}</TableCell>
                </TableRow>
                {props.type === "hotel" && checked ? (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Rewards Used</TableCell>
                    <TableCell>{discount} tokens</TableCell>
                  </TableRow>
                ) : props.type === "flight" ? (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Rewards Earned</TableCell>
                    <TableCell>{discount} tokens</TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
                {props.type === "hotel" && checked ? (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Discounted Price</TableCell>
                    <TableCell>₹{props.discountedPrice}</TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
                {props.rewards_used > 0 ? (
                  <TableRow>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={checkBoxDiscountHandler}
                          />
                        }
                        label={"Avail ₹" + props.rewards_used + " discount"}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="button-row space-between">
            <Button
              onClick={props.handleClose}
              className="login-btn"
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={onClick}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              {props.type === "flight" ? "Book Flight" : "Book Room"}
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
