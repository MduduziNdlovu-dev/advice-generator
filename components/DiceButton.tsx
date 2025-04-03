"use client";
import { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@mui/material";

interface DiceButtonProps {
  onClick: () => void;
}

const DiceButton: React.FC<DiceButtonProps> = ({ onClick }) => {
  const diceRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    gsap.to(diceRef.current, { rotation: "+=360", duration: 0.5, ease: "power2.out" });
    onClick(); // Fetch new advice
  };

  return (
    <Button
      ref={diceRef}
      sx={{
        backgroundColor: "#53ffaa",
        borderRadius: "50%",
        width: { xs: "3rem", sm: "3.5rem", md: "4rem" }, // Responsive width
        height: { xs: "3rem", sm: "3.5rem", md: "4rem" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        top: { xs: 40, sm: 50, md: 65 }, // Adjust button position for smaller screens
        "&:hover": { backgroundColor: "#42e698" },
      }}
      onClick={handleClick}
    >
      <Image src="/images/icon-dice.svg" alt="dice-icon" height={24} width={24} />
    </Button>
  );
};

export default DiceButton;
