import React, { FC } from 'react'

export const DownloadLayout: FC<{
    downloadLayout: Function
    titles: Partial<any & {}>
}> = ({
    downloadLayout,
    titles
}) => {
    return (
        <div className="card card--tiny massiveAdjust__selecFile">
            <h4 className="h4"><b>`${titles.adjustment.parameters.downloadLayout}`</b></h4>
            <button
                className="btn btn--primary massiveAdjust__download"
                onClick={()=>{downloadLayout()}}
                type="button"
            >
                {titles.adjustment.parameters.download}
            </button>
        </div>
    )
}
