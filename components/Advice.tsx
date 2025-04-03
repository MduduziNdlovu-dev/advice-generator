'use client'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Advice {
    id: number;
    advice: string;
}
const Advice = () => {



const [loading,setLoading] = useState<boolean>(false);
const [adviceData,setAdviceData] = useState<Advice | null>(null);
const [error,setError] = useState<string | null>(null);

useEffect(() => {
    fetchAdvice();
}, []);
async function fetchAdvice(){
    setLoading(true);
    setError(null);

    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        if(!response.ok) {
            throw new Error("Failed to fetch advice");
        }

        const data: { slip: Advice } = await response.json();
        setAdviceData(data.slip)
    } catch (error) {
        setError((error as Error).message);
    }finally {
        setLoading(false);
    }
    
}
  return (
    <Box className="container">
        <Typography className='heading' sx={{
            marginBottom:'1.5rem'
        }}>
            ADVICE #{adviceData?.id}
        </Typography>
        <Typography sx={{
            color:'#CEE3E9',
            fontSize:'2rem',
            fontWeight:700,
        }}>
            {loading ? "Loading..." : error ? error : adviceData?.advice}
        </Typography>
        
        <Image src="/images/pattern-divider-desktop.svg" alt="divider" width={444} height={16} />
       

        <Button className='button' sx={{
            backgroundColor: "#53ffaa",
            borderRadius: "50%",
            maxWidth:"4rem",
            maxHeight:"4rem",
            padding:" 1rem 0",
            position: 'relative',
            top:65
        }}
        onClick={fetchAdvice}
        >
            <Image src="/images/icon-dice.svg" alt='dice-icon' height={24} width={24} style={{
                margin:'2.5rem'
            }} />

        </Button>
    </Box>
  )
}

export default Advice