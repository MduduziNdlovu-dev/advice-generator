"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import DiceButton from "./DiceButton";
import AdviceText from "./AdviceText";

interface Advice {
  id: number;
  advice: string;
}

const AdviceComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [adviceData, setAdviceData] = useState<Advice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAdvice();

    // Apply GSAP neon glow effect
    gsap.to(boxRef.current, {
      boxShadow: "0px 0px 2rem hsl(150, 100%, 66%)",
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);

  async function fetchAdvice() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }

      const data: { slip: Advice } = await response.json();
      setAdviceData(data.slip);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      ref={boxRef}
      sx={{
        backgroundColor: "#1f2937",
        padding: { xs: "rem", sm: "1.5rem", md: "2rem" }, // Adjust padding for different screen sizes
        borderRadius: "10px",
        textAlign: "center",
        maxWidth: { xs: "80%", sm: "80%", md: "70%" }, // Adjust max width for different screen sizes
        width: "100%", // Ensure it scales with screen width
        margin: "auto",
        boxShadow: "0px 0px 15px hsl(150, 100%, 66%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          marginBottom: "1rem",
          color: "#53ffaa",
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" }, // Responsive font size for smaller screens
          fontWeight: 700,
        }}
      >
        ADVICE #{adviceData?.id}
      </Typography>

      <AdviceText advice={loading ? "Loading..." : error ? error : adviceData?.advice || "Click the dice for wisdom!"} />

      {/* Divider Image */}
      <Image
        src="/images/pattern-divider-desktop.svg"
        alt="divider"
        width={444}
        height={16}
        style={{
          width: "100%",
          maxWidth: "444px",
          height: "auto",
          marginTop: "1rem",
        }}
      />

      <DiceButton onClick={fetchAdvice} />
    </Box>
  );
};

export default AdviceComponent;
