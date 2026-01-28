import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../../stores/useUserStore";

const UpdateUser = ({ isOpen, isClose, user }) => {
  const { updateUser } = useUserStore();
  const [dataUpdate, setDataUpdate] = useState({
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { displayName, avatarUrl } = dataUpdate;
    await updateUser(user._id, displayName, avatarUrl);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{
              position: "fixed",
              top: "40%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              zIndex: 1001,
              minWidth: "450px",
            }}
          >
            <p>Họ và tên</p>
            <Input
              type="text"
              name="displayName"
              value={dataUpdate.displayName}
              onChange={handleChange}
            />
            <p>Link ảnh đại diện</p>
            <Input
              type="text"
              name="avatarUrl"
              value={dataUpdate.avatarUrl}
              onChange={handleChange}
            />
            <div className="mt-4 flex justify-end items-center gap-2">
              <Button
                variant="ghost"
                onClick={isClose}
                className="cursor-pointer"
              >
                Thoát
              </Button>
              <Button
                onClick={() => {
                  (handleSubmit(), isClose());
                }}
                variant="blue"
                className="cursor-pointer"
              >
                Xác nhận
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UpdateUser;
