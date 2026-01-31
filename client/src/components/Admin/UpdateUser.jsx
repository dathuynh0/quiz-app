import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../../stores/useUserStore";

const UpdateUser = ({ isOpen, isClose, data }) => {
  const { updateUserForAdmin } = useUserStore();
  const [dataUser, setDataUser] = useState(data);
  console.log(dataUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          />

          {/* main */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{
              position: "fixed",
              top: "30%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              zIndex: 1001,
              width: "450px",
            }}
          >
            Họ và tên
            <Input
              value={dataUser.displayName}
              onChange={handleChange}
              name="displayName"
            />
            Tên tài khoản
            <Input
              value={dataUser.username}
              onChange={handleChange}
              name="username"
            />
            Quyền
            <select
              className="block border p-2 rounded-md cursor-pointer"
              value={dataUser.position}
              name="position"
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
            <div className="mt- 4 flex justify-end">
              <Button
                variant="blue"
                onClick={async () => {
                  await updateUserForAdmin(
                    dataUser._id,
                    dataUser.displayName,
                    dataUser.username,
                    dataUser.position,
                  );
                  isClose();
                }}
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
