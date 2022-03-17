import React, { FC, useState } from 'react'
import svgs from '../../../helpers/svgs';
import SvgWrapper from '../../SvgWrapper';
import { AdjustmentTypesTableLogs } from './AdjustmentTypesTableLogs';

export const AdjustmentTypesLogs: FC<{rowVal: any}> = ({rowVal}) => {    

    const [ showModal, setShowModal ] = useState(false);

    const information: Array<any> = [
        {
            activity: "Descripción de la actividad realizada",
            user: "Nombre Apellido P",
            date: "dd/mm/aaaa hh:mm:ss"
        },
        {
            activity: "Descripción de la actividad realizada",
            user: "Nombre Apellido P",
            date: "dd/mm/aaaa hh:mm:ss"
        },
        {
            activity: "Descripción de la actividad realizada",
            user: "Nombre Apellido P",
            date: "dd/mm/aaaa hh:mm:ss"
        },
        {
            activity: "Descripción de la actividad realizada",
            user: "Nombre Apellido P",
            date: "dd/mm/aaaa hh:mm:ss"
        },
        {
            activity: "Descripción de la actividad realizada",
            user: "Nombre Apellido P",
            date: "dd/mm/aaaa hh:mm:ss"
        },
    ]
    
    const handleLog = () => {
        // console.log("hola");
        console.log(rowVal);
        setShowModal(!showModal);
    }
    return (
        <>
        <div className="table__actions">
            <button
                type="button"
                className="btn btn--icon"
                onClick={handleLog}
            >
                <SvgWrapper id={svgs.clock} className="svg svg--x-small svg--table" />
            </button>
        </div>
        {
            showModal 
            &&
                <AdjustmentTypesTableLogs
                    setShowModal={setShowModal}
                    information={information}
                />
        }
        </>
    )
}
