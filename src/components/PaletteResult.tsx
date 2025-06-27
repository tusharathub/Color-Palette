"use client"

import ColorBox from "./ColorBox";

export default function PaletteResult({ data} : {data : string}) {
    let parsedData; 

    try{
        parsedData = JSON.parse(data);
    }catch(e) {
        console.error(e);
        return <h2>Could not parse AI response</h2>
    }

    return(
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6">
            {parsedData.colors.map((hex: string, idx: number) => (
                <ColorBox key={idx} color={hex} />
            ))}
            <p className="col-span-full text-sm text-gray-700"> {parsedData.suggestion} </p>
        </div>
    )
    
}