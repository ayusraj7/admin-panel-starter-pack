import React from 'react'
import { customParagraphPropsTypes } from '../types/propTypes'


const CustomParagraph = (props: customParagraphPropsTypes) => {
    const {
        text,
        textColor = "#4B5563",
        marginTop = "0px",
        padding = "p-0",
        fontStyle = "font-Inter font-normal",
        textSize = "14px",
        lineHeight = "20px",
        textAlign = "left",
    } = props;

    return (
        <p
            style={{
                color: textColor,
                textAlign: (textAlign) as React.CSSProperties["textAlign"],
                marginTop: marginTop,
                fontSize: textSize,
                lineHeight: lineHeight
            }}
            className={`font-Rubik ${padding} ${fontStyle} `}
            dangerouslySetInnerHTML={{ __html: text }}
        >
        </p>
    )
}

export default CustomParagraph