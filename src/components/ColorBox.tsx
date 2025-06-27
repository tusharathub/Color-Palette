import { useState } from "react";


export default function ColorBox({color} : {color: string}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="relative rounded shadow cursor-pointer"
        onClick={handleCopy}
        style={{backgroundColor: color, height: "100px"}}>
            <span className="absolute bottom-1 left-1 text-white text-xs bg-black/50 px-1 rounded">
                {color}
            </span>
            <span className="absolute top-1 right-1 text-white text-xs bg-green-500 px-1 rounded">
                Copied!
            </span>
        </div>
    )
}