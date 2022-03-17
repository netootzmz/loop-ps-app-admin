import React, { FC } from 'react'
import { Column } from 'react-table';
import svgs from '../../../helpers/svgs';
import SvgWrapper from '../../SvgWrapper';
import Table from '../../tables/Table';

export const AdjustmentTypesTableLogs: FC<{setShowModal: Function, information: Array<any>}> = ({setShowModal, information}) => {

    const cols: Array<Column> = [
        {
            Header: "Actividad",
            accessor: "activity"
        },
        {
            Header: "Usuario",
            accessor: "user",
        },
        {
            Header: "Fecha y hora",
            accessor: "date"
        }
    ];
    return (
        <div className="registerAdjust__modal">
            <div className="card card--total">
                <div className="registerAdjust__modal__header">
                    <div className="registerAdjust__modal__header_left">
                        <SvgWrapper id={svgs.clock} className="svg svg--x-small svg--table" />
                        <div className="registerAdjust__modal__header_left_text">
                            <h2>
                                Nombre / identificador del registro
                            </h2>
                            <h2>
                                Bitácora
                            </h2>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn--close"
                            onClick={()=>{setShowModal(false)}}
                        >
                            &#10006;
                        </button>
                    </div>
                </div>
                <Table
                    information={information}
                    cols={cols}
                />
            </div>
        </div>
    )
}
