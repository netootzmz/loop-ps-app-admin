import { useRouter } from "next/router";
import React, { FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { iCustomResponse } from "../../../../@types/api/res";
import customFetch from "../../../../helpers/customFetch";
import manageErrorsMessages from "../../../../helpers/manageErrorsMessages";
import svgs from "../../../../helpers/svgs";
import SvgWrapper from "../../../SvgWrapper";
import { unsetUsersTable } from "../../../../store/actions/preferencesActions";

const UsersActions: FC<{ id: number; status: number }> = ({ id, status }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEdit = () => {
    router.push(`/profile/preferences/users/user/${id}`);
  };

  const handleBlockUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await Swal.fire({
        title: "¿Seguro que quieres bloquear este usuario?",
        showDenyButton: true,
        confirmButtonText: `Bloquear`,
        denyButtonText: `No bloquear`,
        denyButtonColor: "#f2711c",
        confirmButtonColor: "#cb1414",
        icon: "warning",
      });

      if (res.isConfirmed) {
        await customFetch<undefined, null>(
          `profile/preferences/users/${id}`,
          true,
          "PUT"
        );

        dispatch(unsetUsersTable());

        Swal.fire({
          icon: "success",

          title: "¡Éxito!",
          text: "Se bloqueó con éxito el usuario",
        });
        return;
      }
      Swal.close();
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        "es"
      );
      Swal.fire("Error", msg, "error");
    }
  };

  return (
    <div className="table__actions">
      {status < 3 ? (
        <button className="btn btn--icon btn--action" onClick={handleBlockUser}>
          <SvgWrapper className="svg svg--x-small" id={svgs.blocked} />
        </button>
      ) : (
        <></>
      )}
      <button className="btn btn--icon btn--action" onClick={handleEdit}>
        <SvgWrapper className="svg svg--x-small" id={svgs.pencil} />
      </button>
      {/*se comentan por falta de funcionalidad*/}
      {/*<button className="btn btn--icon btn--action">*/}
      {/*  <SvgWrapper className="svg svg--x-small" id={svgs.spinner} />*/}
      {/*</button>*/}
      {/*<button className="btn btn--icon btn--action">*/}
      {/*  <SvgWrapper className="svg svg--x-small" id={svgs.clock} />*/}
      {/*</button>*/}
    </div>
  );
};

export default UsersActions;
