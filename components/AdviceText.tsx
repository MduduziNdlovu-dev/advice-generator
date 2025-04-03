"use client";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

interface AdviceTextProps {
  advice: string;
}

const AdviceText: React.FC<AdviceTextProps> = ({ advice }) => {
  return (
    <motion.div
      key={advice}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Typography
        sx={{
          color: "#CEE3E9",
          fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" }, // Adjust font sizes
          fontWeight: 700,
          textAlign: "center",
          padding: { xs: "0.5rem", sm: "1rem" },
        }}
      >
        {advice}
      </Typography>
    </motion.div>
  );
};

export default AdviceText;
