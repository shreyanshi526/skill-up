import React, { FC } from 'react';
import {Modal} from "@mui/material";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    component:any;
    setRoute?:(route:string) => void;
}

const customModal: FC<Props> = ({open,setOpen,setRoute,component:Component}) => {
    return (
        <Modal
         open={open}
         onClose={() => setOpen(false)}
        >
            {Component && <Component setRoute={setRoute} />}
        </Modal>
    )
}

export default customModal;