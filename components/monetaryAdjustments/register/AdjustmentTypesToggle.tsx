import React, { FC, useEffect, useState } from 'react';
import Toogle from '../../forms/Toogle';
import {v4 as uuidv4} from "uuid";
import Swal from "sweetalert2";

export const AdjustmentTypesToggle: FC<{rowVal: any}> = ({rowVal}) => {
    const key = uuidv4();
    const [active, setActive] = useState(false);
    const changestatus = () => {
        const blockModal = Swal.mixin({
            customClass:{
                confirmButton: "btn--modalConfirm",
                cancelButton: "btn--modalCancel"
            },
            buttonsStyling: false
        })
        blockModal.fire({
            imageUrl: '/warning.png',
            imageWidth: 100,
            imageHeight: 100,
            text: `¿Estás seguro que desea bloquear/desbloquear el tipo de ajuste: ${rowVal.nameTypeAdjust}`,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Sí, autorizar",
            reverseButtons: true,
        }).then((response)=>{
            if(response.isConfirmed){
                setActive(!active);
                //En ambos casos deberá mandar la actualización correspondiente
                if(!active){
                    //Caso de cuando se activa
                    console.log(rowVal)
                }else{
                    //Caso cuando esta inactivo
                    console.log("valor")
                }
            }
        })
    }
    useEffect(()=>{
        setActive(rowVal.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Toogle
                checkLabel="Activo"
                uncheckLabel="Inactivo"
                name={key}
                onChange={()=>{
                    changestatus()
                }}
                checked={active}
                value={Boolean(!active).toString() || ""}
            />
        </div>
    )
}
