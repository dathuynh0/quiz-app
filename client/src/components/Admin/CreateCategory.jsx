import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateCategory = ({ isOpen, isClose, data, func }) => {
  const [category, setCategory] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
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
              minWidth: "450px",
            }}
          >
            <p>Tên danh mục</p>
            <Input
              type="text"
              value={category.name}
              onChange={handleChange}
              name="name"
              placeholder="Nhập vào tên danh mục"
            />
            <p>Đường dẫn icon</p>
            <Input
              type="text"
              value={category.iconUrl}
              onChange={handleChange}
              name="iconUrl"
              placeholder="Đường dẫn icon"
            />
            <div className="mt-4 text-end">
              <Button
                variant="blue"
                onClick={() => {
                  func(category.name, category.iconUrl);
                  isClose();
                }}
                className="cursor-pointer"
              >
                Thêm
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateCategory;
