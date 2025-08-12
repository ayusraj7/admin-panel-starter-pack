import React from 'react'
import { useTheme } from '@mui/material/styles';
import { customHeadingPropsTypes } from '../types/propTypes'
import { useTheme as useCustomTheme } from '../theme/ThemeProvider'
import { Typography } from '@mui/material';

const CustomHeading = (props:customHeadingPropsTypes) => {
  const theme = useTheme();
  const { mode } = useCustomTheme();
  const {
    text,
    textColor,
    bgColor,
    marginTop = "0px",
    padding = "0px",
    fontStyle = "font-bold",
    textSize = "24px",
    lineHeight = "36px",
    textAlign = "left",
    width= "100%",
    variant
  } = props;

  // Use theme-based colors if no custom colors are provided
  const finalTextColor = textColor ? textColor : theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.text.primary;
  const finalBgColor = bgColor ?  bgColor :  theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.paper;

  return (
    <Typography
      sx={{
        color: finalTextColor,
        backgroundColor: finalBgColor,
        marginTop: marginTop,
        padding:padding,
        lineHeight: lineHeight,
        textAlign: textAlign as React.CSSProperties["textAlign"],
        fontSize: textSize,
        width:width
      }}
      className={`font-Playfair ${fontStyle}`}
      variant= {variant && variant}
    >
      {text}
    </Typography>
  )
}

export default CustomHeading