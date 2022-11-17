import React from 'react'

export default function RelevantText({text, maxLegth}) {

    // if the text is longer than the maxLength, then cut it and add ...
    // if the text is shorter than the maxLength, then return the text as is

  return (
    <div className='w-full flex justify-center'>
        <p className='w-fit p-2 text-center bg-orange-lt text-black font-semibold rounded'>
            {text.length > maxLegth ? text.substring(0, maxLegth) + '...' : text}
        </p>
    </div>
    )
}
