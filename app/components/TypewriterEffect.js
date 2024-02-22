'use client'
import React, { useState, useEffect, Fragment } from 'react'
import { Box } from '@chakra-ui/react'
export default function TypewriterEffect({text, delay}) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);
    return <Fragment>{currentText}</Fragment>
}
