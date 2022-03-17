import React, { MouseEvent, useEffect, useMemo } from "react";
import Input from "../../../forms/Input";
import Select from "../../../forms/Select";
import Toogle from "../../../forms/Toogle";
import useForm from "../../../../hooks/useForm";
import { ComponentWithStore } from "../../../../@types/store/index";
import { wrappedOnStore } from "../../../../store";
import { useRouter } from "next/router";
import { iCustomResponse } from "../../../../@types/api/res";
import manageErrorsMessages from "../../../../helpers/manageErrorsMessages";
import Swal from "sweetalert2";
import { startGettingUsersFilters } from "../../../../store/actions/preferencesActions";
import { iUserSaveUpdateReq } from "../../../../@types/api/req";
import customFetch from "../../../../helpers/customFetch";
import moment from "moment";

const UsersForm: ComponentWithStore = ({
  dispatch,
  preferences: { users },
  ui: { lang },
  auth: { groupId, clientId },
}) => {
  const router = useRouter();

  const filters = useMemo(() => users?.filters, [users?.filters]);

  const activeUser = JSON.stringify(users?.active);

  const { values, handleInputChange, reset, handleSubmit, errors } = useForm<{
    clientId: string;
    date_admission: string;
    date_change: string;
    groupId: string;
    language_id: number;
    last_name1: string;
    last_name2: string;
    mail: string;
    name: string;
    phone: string;
    roleId: string;
    second_name: string;
    status_id: number;
    password: string;
    user_name: string;
  }>({
    initialValues: {
      name: "",
      second_name: "",
      last_name1: "",
      last_name2: "",
      mail: "",
      phone: "",
      roleId: "",
      status_id: 1,
    },
    validations: {
      name: {
        required: {
          value: true,
          message: "Este campo es requerido",
        },
      },
      last_name1: {
        required: {
          value: true,
          message: "Este campo es requerido",
        },
      },
      mail: {
        required: {
          value: true,
          message: "Este campo es requerido",
        },
      },
      roleId: {
        required: {
          value: true,
          message: "Este campo es requerido",
        },
      },
    },
    onSubmit: async () => {
      try {
        Swal.fire({
          title: lang === "es" ? "Cargando..." : "Loading...",
          backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    `,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await customFetch<iUserSaveUpdateReq, iCustomResponse<null>>(
          `profile/preferences/users/user`,
          true,
          activeUser ? "PUT" : "POST",
          {
            ...values,
            clientId: clientId!,
            groupId: groupId || "",
            extension: 0,
            second_name: values.second_name || "",
            last_name1: values.last_name1 || "",
            last_name2: values.last_name2 || "",
            mail: values.mail || "",
            name: values.name || "",
            phone: values.phone || "",
            roleId: values.roleId || "",
            status_id: values.status_id || 0,
            date_admission: moment().toISOString(),
            date_change: moment().toISOString(),
            language_id: values.language_id || 1,
            password: values.password || "",
            user_name: values.user_name || "",
          }
        );

        await customFetch("profile/preferences/users/recover", false, "POST", {
          email: values.mail,
        });

        const res = await Swal.fire({
          title: "¡Éxito!",
          text: `Se ${activeUser ? "editó" : "creó"} el usuario con éxito`,
          icon: "success",
          confirmButtonText: `Entendido`,
          confirmButtonColor: "#f2711c",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        if (res.isConfirmed) {
          router.push("/profile/preferences/users");
        }
      } catch (err) {
        console.log("Login error: ", err);
        const msg = await manageErrorsMessages(
          (err as iCustomResponse).codeStatus || "1000",
          lang
        );
        Swal.fire("Error", msg, "error");
      }
    },
  });

  const handleCancel = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await Swal.fire({
      title: "¿Seguro que quieres cancelar?",
      text: "No se guardaran los cambios",
      showDenyButton: true,
      confirmButtonText: `Si, Cancelar`,
      denyButtonText: `No, Continuar`,
      denyButtonColor: "#f2711c",
      confirmButtonColor: "#cb1414",
      icon: "warning",
    });
    if (res.isConfirmed) router.replace("/profile/preferences/users");
  };

  const handleDeleteUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await Swal.fire({
        title: "¿Seguro que quieres eliminar este usuario?",
        showDenyButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `No eliminar`,
        denyButtonColor: "#f2711c",
        confirmButtonColor: "#cb1414",
        icon: "warning",
      });

      if (res.isConfirmed) {
        await customFetch<undefined, null>(
          `profile/preferences/users/${users?.active?.user_id}`,
          true,
          "DELETE"
        );
        reset({ ...values, status_id: 4 });
        const res = await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Se elimino con éxito el usuario",
          confirmButtonText: `Entendido`,
          confirmButtonColor: "#f2711c",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        if (res.isConfirmed) router.replace("/profile/preferences/users");
      }
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
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
          `profile/preferences/users/${users?.active?.user_id}`,
          true,
          "PUT"
        );
        reset({ ...values, status_id: 3 });
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Se bloqueó con éxito el usuario",
          confirmButtonText: `Entendido`,
          confirmButtonColor: "#f2711c",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        if (res.isConfirmed) router.replace("/profile/preferences/users");
      }
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
  };
  const handleUnblockUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await Swal.fire({
        title: "¿Seguro que quieres desbloquear este usuario?",
        showDenyButton: true,
        confirmButtonText: `Desbloquear`,
        denyButtonText: `No desbloquear`,
        denyButtonColor: "#f2711c",
        confirmButtonColor: "#cb1414",
        icon: "warning",
      });

      if (res.isConfirmed) {
        await customFetch<undefined, null>(
          `profile/preferences/users/unblock/${users?.active?.user_id}`,
          true,
          "PUT"
        );
        reset({ ...values, status_id: 3 });
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Se desbloqueó con éxito el usuario",
          confirmButtonText: `Entendido`,
          confirmButtonColor: "#f2711c",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        if (res.isConfirmed) router.replace("/profile/preferences/users");
      }
    } catch (err) {
      console.log("Login error: ", err);
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
  };

  const handlePasswordReset = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: lang === "es" ? "Cargando..." : "Loading...",
        backdrop: `
    rgba(0,0,123,0.4)
    left top
    no-repeat
  `,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await customFetch("profile/preferences/users/recover", false, "POST", {
        email: values.mail,
      });

      Swal.fire({
        timer: 2000,
        text: "Se envio correo de recuperación!",
        toast: true,
        icon: "success",
        width: "15rem",
        position: "top-right",
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (err) {
      const msg = await manageErrorsMessages(
        (err as iCustomResponse).codeStatus || "1000",
        lang
      );
      Swal.fire("Error", msg, "error");
    }
  };

  useEffect(() => {
    if (activeUser) {
      const data = JSON.parse(activeUser);
      reset(data);
    }

    if (!filters) {
      dispatch(startGettingUsersFilters(lang));
    }
  }, [activeUser, reset, dispatch, lang, filters]);

  return (
    <form className="user-page" onSubmit={handleSubmit}>
      <section className="card card--full card--inner-padding">
        <div className="form">
          <h3 className="form__title form__title--full">Estatus</h3>
          <div className="user-page__toogle">
            <Toogle
              uncheckLabel="Inactivo"
              checkLabel="Activo"
              name="status"
              onChange={() =>
                reset({ ...values, status_id: values.status_id === 1 ? 2 : 1 })
              }
              checked={values.status_id === 1}
              disabled={
                !!users?.active?.status_id && users?.active?.status_id > 2
              }
            />
            {activeUser && (
              <div className="user-page__btns--active">
                {users?.active?.status_id! < 3 || values.status_id! < 3 ? (
                  <button
                    className={`btn btn--${
                      users?.active?.status_id === 3 || values.status_id === 3
                        ? "disabled"
                        : "primary"
                    }`}
                    type="button"
                    onClick={handleBlockUser}
                  >
                    Bloquear usuario
                  </button>
                ) : (
                  <></>
                )}
                {users?.active?.status_id! === 3 || values.status_id === 3 ? (
                  <button
                    className={`btn btn--${
                      users?.active?.status_id !== 3 || values.status_id !== 3
                        ? "disabled"
                        : "primary"
                    }`}
                    type="button"
                    onClick={handleUnblockUser}
                  >
                    Desbloquear usuario
                  </button>
                ) : (
                  <></>
                )}
                {users?.active?.status_id !== 4 || values.status_id !== 4 ? (
                  <button
                    className={`btn btn--${
                      users?.active?.status_id === 4 || values.status_id === 4
                        ? "disabled"
                        : "error"
                    }`}
                    type="button"
                    onClick={handleDeleteUser}
                  >
                    Eliminar usuario
                  </button>
                ) : (
                  <></>
                )}
                {users?.active?.status_id === 1 || values.status_id === 1 ? (
                  <button
                    className={`btn btn--${
                      values.status_id !== 1 ? "disabled" : "secondary"
                    }`}
                    type="button"
                    onClick={handlePasswordReset}
                  >
                    Restablecer contraseña
                  </button>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <h3 className="form__title form__title--full">
            {activeUser ? users?.active?.name : "Nuevo usuario"}
          </h3>
          <div className="form__inline form__inline--full">
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              inline
              full
              onChange={handleInputChange()}
              value={values.name || ""}
              disabled={values.status_id !== 1}
              error={errors.name}
              maxLength={16}
            />
            <Input
              type="text"
              name="second_name"
              placeholder="Segundo nombre"
              inline
              full
              onChange={handleInputChange()}
              value={values.second_name || ""}
              disabled={values.status_id !== 1}
              maxLength={16}
            />
          </div>
          <div className="form__inline form__inline--full">
            <Input
              type="text"
              name="last_name1"
              placeholder="Apellido Paterno"
              inline
              full
              onChange={handleInputChange()}
              value={values.last_name1 || ""}
              disabled={values.status_id !== 1}
              error={errors.last_name1}
              maxLength={16}
            />
            <Input
              type="text"
              name="last_name2"
              placeholder="Apellido Materno"
              inline
              full
              onChange={handleInputChange()}
              value={values.last_name2 || ""}
              disabled={values.status_id !== 1}
              maxLength={16}
            />
          </div>
          <h3 className="form__title form__title--full">Contacto</h3>
          <div className="form__inline form__inline--full">
            <Input
              type="email"
              name="mail"
              placeholder="Correo electrónico"
              inline
              full
              onChange={handleInputChange()}
              value={values.mail || ""}
              disabled={values.status_id !== 1}
              error={errors.mail}
              maxLength={255}
            />
            <Input
              type="text"
              pattern="[0-9]+"
              name="phone"
              placeholder="Teléfono"
              inline
              full
              onChange={handleInputChange((val) => {
                console.log();
                if (isNaN(parseInt(val[val.length - 1])))
                  return val.slice(0, -1);
                return val;
              })}
              value={values.phone || ""}
              disabled={values.status_id !== 1}
              maxLength={10}
            />
          </div>
          {/*<h3 className="form__title form__title--full">Jerarquía</h3>*/}
          {/*<div className="form__inline form__inline--full">*/}
          {/*  <div className="form__inline form__inline--sbs">*/}
          {/*    <Select*/}
          {/*      options={[{ value: "", text: "Grupo" }]}*/}
          {/*      label="Grupo"*/}
          {/*      inline*/}
          {/*      disabled*/}
          {/*    />*/}
          {/*    <Select*/}
          {/*      options={[{ value: "", text: "Agrupador" }]}*/}
          {/*      label="Agrupador"*/}
          {/*      inline*/}
          {/*      disabled*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div className="form__inline form__inline--sbs">*/}
          {/*    <Select*/}
          {/*      options={[{ value: "", text: "Razón social" }]}*/}
          {/*      label="Razón social"*/}
          {/*      inline*/}
          {/*      disabled*/}
          {/*    />*/}
          {/*    <Select*/}
          {/*      options={[{ value: "", text: "Sucursal" }]}*/}
          {/*      label="Sucursal"*/}
          {/*      inline*/}
          {/*      disabled*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <h3 className="form__title form__title--full">Perfil de usuario</h3>
          <div className="form__inline form__inline--full">
            {/* <Select
              options={[{ value: "", text: "Grupo de perfil" }]}
              label="Grupo de perfil"
              inline
              disabled
            /> */}
            <Select
              name="roleId"
              options={[
                { value: 0, text: "" },
                ...(filters?.profile?.map((el) => ({
                  text: el.optionDescription,
                  value: el.optionId,
                })) || []),
              ]}
              label="Perfil"
              inline
              onChange={handleInputChange((val) => parseInt(val))}
              value={values.roleId || ""}
              disabled={values.status_id !== 1}
              error={errors.status_id}
            />
          </div>
        </div>
      </section>
      <div className="user-page__btns">
        <button
          className="btn btn--default"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        {users?.active?.status_id! < 3 || values.status_id! < 3 ? (
          <button className="btn btn--secondary" type="submit">
            {activeUser ? "Guardar cambios" : "Dar de alta usuario"}
          </button>
        ) : (
          <></>
        )}
      </div>
      <div>&nbsp;</div>
    </form>
  );
};

export default wrappedOnStore(UsersForm);
