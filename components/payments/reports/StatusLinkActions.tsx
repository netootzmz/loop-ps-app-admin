import React, {FC} from "react";
import {useDispatch} from "react-redux";
import svgs from "../../../helpers/svgs";
import SvgWrapper from "../../SvgWrapper";
import {cancelStatusLink, gettingStatusLinkTableDetail, replayStatusLink} from "../../../store/actions/paymentAction";
import Swal from "sweetalert2";

const StatusLinkActions: FC<{ action: { folioTx: string, status: string } }> = ({action: {folioTx, status}}) => {
    const dispatch = useDispatch();

    console.log(status);

    const handleDetail = async () => {
        dispatch(gettingStatusLinkTableDetail({folioTx}));
    };

    const handleCancel = async () => {
        const cad = await Swal.fire({
            title: "Atención",
            text: "¿Deseas cancelar esta liga de pago?",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: "#f2711c",
            confirmButtonText: "Continuar",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: "#8f8f8f",
        });
        if (cad.isConfirmed) {
            dispatch(cancelStatusLink({folio: folioTx, description: "Cancelada por usuario", reasonCancelId: 1}));
        }
    };

    const handleReplay = async () => {
        const {value: email} = await Swal.fire({
            title: 'Reenviar enlace de pago a distancia',
            input: 'email',
            inputLabel: 'Correo electrónico',
            inputPlaceholder: 'usuario@dominio.com',
            showConfirmButton: true,
            confirmButtonColor: "#f2711c",
            confirmButtonText: "Continuar",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: "#8f8f8f",
        })

        if (email) {
            Swal.fire(`Entered email: ${email}`)
            dispatch(replayStatusLink({folioTxn: folioTx, addressee: email, typeTemplate: 1}));
        }
    };

    return (
        <div className="table__actions">
            <button
                type="button"
                className="btn btn--icon btn--action"
                onClick={handleCancel}
                disabled={status === 'INACTIVA' || status === 'PAGADO' || status === 'NO PAGADO'}
            >
                <SvgWrapper id={svgs.cancel} className="svg svg--x-small"/>
            </button>
            <button
                type="button"
                className="btn btn--icon btn--action"
                onClick={handleDetail}
            >
                <SvgWrapper id={svgs.view} className="svg svg--x-small"/>
            </button>
            <button
                type="button"
                className="btn btn--icon btn--action"
                onClick={handleReplay}
                disabled={status === 'INACTIVA' || status === 'PAGADO' || status === 'NO PAGADO'}
            >
                <SvgWrapper id={svgs.reply} className="svg svg--x-small"/>
            </button>
            {/*<button type="button" className="btn btn--icon btn--action">*/}
            {/*    <SvgWrapper id={svgs.clock} className="svg svg--x-small"/>*/}
            {/*</button>*/}
        </div>
    );
};

export default StatusLinkActions;
