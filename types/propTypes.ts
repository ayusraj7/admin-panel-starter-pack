import { TypographyProps } from "@mui/material";

export type customButtonPropsTypes = {
    text:string;
    textColor?:string;
    bgColor?:string;
    width?:string;
    padding?:string;
    fontStyle?:string; //given as tailwind class
    textSize?:string;
    borderRadius?:string;
    onClick:React.MouseEventHandler<HTMLButtonElement>;
    height?:string;
    lineHeight?:string;
    border?:string; // given as tailwind class 
    borderColor?:string;
    boxShadow?:string;
    marginTop?:string;
}

export type customHeadingPropsTypes = {
    text:string | undefined;
    textColor?:string;
    bgColor?:string;
    padding?:string;
    fontStyle?:string; //given as tailwind class
    textSize?:string;
    textAlign?:string;
    marginTop?:string;
    mobileTextSize?:string;
    lineHeight?:string;
    variant?: TypographyProps["variant"];
    width ?:string;
}

export type customParagraphPropsTypes = {
    text:string;
    textColor?:string;
    bgColor?:string;
    padding?:string | unknown; // given as tailwind class 
    fontStyle?:string; //given as tailwind class
    mobileTextSize?:string;
    textAlign?:string;
    textSize?:string;
    mobileTextAlign?:string;
    marginTop?:string;
    smallTextSize?:string;
    lineHeight?:string;
    mobileLineHeight?:string;
}

export type customChipTypes = {
    text:string;
    textColor?:string;
    bgColor?:string;
    border?:string; // here you will give tailwind class 
    borderRadius?:string;
    lineHeight?:string;
    textSize?:string;
    textAlignment?: "left" | "right" | "center" | "justify" | "start" | "end";
    padding?:string; // here we will give tailwind class 
    fontStyle?: string; // here you will give tailwind class 
    onClick?:React.MouseEventHandler<HTMLButtonElement>;

}
