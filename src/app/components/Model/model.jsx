import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


// this is model
const CustomModal = ({ open, setOpen, children, title }) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        maxWidth: "800px", // Limits the modal width to 500px
        minWidth: "auto", // Allows the width to shrink to fit content if necessary
        width: "100%",    // Ensures it is responsive to the viewport
    };

    return (
        <Modal open={open} onClose={() => {
            setOpen(false)
        }} aria-labelledby="modal-title">
            <Box sx={style}>
                {title && (
                    <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                        {title}
                    </Typography>
                )}
                {children}
                <Box mt={2} textAlign="right">
                    <Button variant="contained" onClose={() => {
                        setOpen(false)
                    }}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CustomModal;
