import React, { FC, KeyboardEvent } from 'react';
import Input from '../../forms/Input'
import Select from '../../forms/Select';
import Swal from "sweetalert2";


export const AdjustmentType: FC<{
        adjustType: string, 
        category: string, 
        status: string, 
        nameAdjustType: string, 
        nature: string, 
        errors: any, 
        reset: Function, 
        handleInputChange: Function, 
        handleSubmit: any,
        searchData: Function,
        newAdjustType: boolean,
        setNewAdjustType: Function,
        categoryData: Array<any>,
        natureData: Array<any>,
        setIsUpdate: Function,
        titles: Partial<any & {}>
    }> = ({
        adjustType,
        category,
        status,
        nameAdjustType,
        nature,
        errors,
        reset,
        handleInputChange,
        handleSubmit,
        searchData,
        newAdjustType,
        setNewAdjustType,
        categoryData,
        natureData,
        setIsUpdate,
        titles
    }) => {
        
    const addNewCategory = true;

    let categoryOptions=[
        {value: "0", text: `${titles.adjustment.parameters.category}`},
    ];
    if(categoryData.length > 0){
        categoryData.forEach((data)=>{
            categoryOptions.push({
                value: data.category_type_id,
                text: data.name
            });
        });
    }

    let statusOptions=[
        {value: "0", text: `${titles.adjustment.parameters.status}`},
        {value: "1", text: "Activo"},
        {value: "2", text: "Inactivo"}
    ];

    let natureOptions=[
        {value: "0", text: `${titles.adjustment.parameters.nature}`},
    ];
    if(natureData.length > 0){
        natureData.forEach((data)=>{
            natureOptions.push({
                value: data.category_type_id,
                text: data.name
            })
        })
    }

    const onlyNumbers = (e: KeyboardEvent<HTMLDivElement>) => {
        const pressedKey = e.keyCode || e.which || e.charCode;
        if ((pressedKey <= 36 || pressedKey >= 40) && !/^[0-9\b]+$/.test(e.key) && pressedKey !== 8) e.preventDefault();
    };
    const onlyLetters = (event: KeyboardEvent<HTMLInputElement>) =>{
        const pressedKey = event.keyCode || event.which || event.charCode;
        if ((pressedKey <= 36 || pressedKey >= 40) && !/^[a-zA-Z \b]+$/.test(event.key) && pressedKey !== 8) event.preventDefault();
    }

    const registCategory = async() => {
        const registerModal = Swal.mixin({
            customClass:{
                confirmButton: "btn--modalConfirm",
                cancelButton: "btn--modalCancel",  
                input: "registerAdjust__nameCategory",   
            },
            buttonsStyling: false,
        })
        await registerModal.fire({
            html: 
            "<div style=' display: flex; align-items: center;'>"+
                "<div style=' background-color:#354a5e; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;'>" +
                    "<h2 style='color: white; font-size: 18px; font-weight: 200;'>&#10010;</h2>"+
                "</div>"+
                `<h2 style=' color: #354a5e; margin-left: 15px; '>${titles.adjustment.parameters.categoryRegist}</h2>`+
            "</div>"  ,
            input: 'text',
            inputPlaceholder: `${titles.adjustment.parameters.categoryName}`,
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: `${titles.adjustment.parameters.cancel}`,
            confirmButtonText: `${titles.adjustment.parameters.save}`,
            inputValidator: (value) => {
                return new Promise(async(resolve)=>{
                    if(value){
                        //Realizar la peticion al ms de inserción                       
                        if(addNewCategory){//Si el servicio responde, mostará esto
                            resolve("")
                        }else{//Si el servicio manda error hacer esto
                            resolve(`${titles.adjustment.parameters.processWrong}`);
                        }
                    }
                    else{
                        if(addNewCategory){
                            resolve(`${titles.adjustment.parameters.nameRequired}`);
                        }
                    }
                })
            },
        }).then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    icon: "success",
                    title: `${titles.adjustment.parameters.success}`,
                    text: `${titles.adjustment.parameters.categorySave}`
                });
            }else if(result.dismiss === Swal.DismissReason.cancel){
                registerModal.fire({
                    icon: "question",
                    title: `${titles.adjustment.parameters.actionQuestion}`,
                    showCancelButton: true,
                    reverseButtons: true,
                    cancelButtonText: `${titles.adjustment.parameters.cancel}`,
                    confirmButtonText: `${titles.adjustment.parameters.continue}`,
                }).then((response)=>{
                    if(response.dismiss === Swal.DismissReason.cancel){
                        Swal.close();
                        registCategory()
                    }
                })
            }
        });
    }

    const deleteCategory = async() => {
        const deleteModal = Swal.mixin({
            customClass:{
                confirmButton: "btn--modalDelete",
                cancelButton: "btn--modalCancel",  
                input: "registerAdjust__nameCategory",   
            },
            buttonsStyling: false,
        });
        await deleteModal.fire({
            imageUrl: '/borrar.png',
            imageWidth: 150,
            imageHeight: 40,
            input: 'select',
            inputOptions:{
                'alfa': "1",
                'beta': "2"
            },
            inputPlaceholder: `${titles.adjustment.parameters.categoryName}`,
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: `${titles.adjustment.parameters.cancel}`,
            confirmButtonText: `${titles.adjustment.parameters.delete}`,
            inputValidator: (value)=>{
                return new Promise((resolve)=>{
                    if(value){
                        //Validar si se selecciono informacion
                        // tambien sería posible meter la validacion de "La categoría tiene ajustes asignados, favor de validar" del ms
                        resolve("")
                    }else{
                        resolve(`${titles.adjustment.parameters.mustSelect}`)
                    }
                })
            }
        }).then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    imageUrl: '/warning.png',
                    imageWidth: 100,
                    imageHeight: 100,
                    title: `${titles.adjustment.parameters.deleteQuestion} ${result.value}?`,
                    showCancelButton: true,
                    showConfirmButton: true,
                    cancelButtonText: `${titles.adjustment.parameters.noCancel}`,
                    cancelButtonColor: "#ababab",
                    confirmButtonColor: "#f2711c",
                    confirmButtonText: `${titles.adjustment.parameters.yesCancel}`,
                    reverseButtons: true,
                }).then((response)=>{
                    if(response.isConfirmed){
                        //Aquí iría el ms de borrado
                        //Si la respuesta el correcta muestra este modal
                        Swal.fire({
                            icon: "success",
                            title: `${titles.adjustment.parameters.deleteSuccessfully}`,
                            timer: 5000
                        });
                        //En caso de error
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: ""
                        })
                    }
                })
            }else if(result.dismiss === Swal.DismissReason.cancel){
                Swal.fire({
                    icon: "question",
                    title: `${titles.adjustment.parameters.actionQuestion}`,
                    showCancelButton: true,
                    reverseButtons: true,
                    cancelButtonText: `${titles.adjustment.parameters.cancel}`,
                    cancelButtonColor: "#ababab",
                    confirmButtonText: `${titles.adjustment.parameters.continue}`,
                    confirmButtonColor: "#f2711c"
                }).then((recive)=>{
                    if(recive.dismiss === Swal.DismissReason.cancel){
                        Swal.close();
                        deleteCategory();
                    }
                })
            }
        })
    }

    return (
        <>
            <h2 className="h2 payments__title">{titles.adjustment.parameters.registAdjust}</h2>
            <form className="card card--full registerAdjust" onSubmit={handleSubmit}>
                <div className="registerAdjust__row registerAdjust__type">
                    <h4 className="h4"><b>{titles.adjustment.parameters.adjustType}</b></h4>
                    <div className="registerAdjust__input">
                        <Input
                            disabled={newAdjustType}
                            full
                            maxLength={6}
                            name="adjustType"
                            onChange={handleInputChange()}
                            onKeyDown={onlyNumbers}
                            placeholder={titles.adjustment.parameters.adjustType}
                            type="text"
                            value={adjustType}
                        />
                    </div>
                </div>
                <div className="registerAdjust__actions registerAdjust__actionType">
                    <button
                        type="button"
                        className="btn btn--adjustmentPrimary"
                        onClick={()=>{
                            setNewAdjustType(true)
                        }}
                    >
                        {titles.adjustment.parameters.newAdjustType}
                    </button>
                </div>
                <div className="registerAdjust__row registerAdjust__category">
                    <h4 className="h4"><b>{titles.adjustment.parameters.category}</b></h4>
                    <div className="registerAdjust__selector">
                        <Select
                            error={errors.category}
                            name="category"
                            placeholder={titles.adjustment.parameters.category}
                            options={categoryOptions}
                            label={titles.adjustment.parameters.category}
                            onChange={handleInputChange()}
                            value={category || ""}
                        />

                    </div>
                </div>
                <div className="registerAdjust__actions registerAdjust__actionCategory">
                    <button
                        disabled={!newAdjustType}
                        className="btn btn--adjustmentPrimary"  
                        onClick={registCategory}                      
                        type="button"
                    >
                        {titles.adjustment.parameters.newCategory}
                    </button>
                </div>
                <div className="registerAdjust__actions registerAdjust__actionDelete">
                    <button
                        disabled={!newAdjustType}
                        className="btn btn--adjustmentSecondary"
                        onClick={deleteCategory}
                        type="button"
                    >
                        {titles.adjustment.parameters.deleteCategory}
                    </button>
                </div>
                <div className="registerAdjust__row registerAdjust__status">
                    <h4 className="h4"><b>{titles.adjustment.parameters.status}</b></h4>
                    <div className="registerAdjust__selector">
                        <Select
                            name="status"
                            placeholder={titles.adjustment.parameters.status}
                            options={statusOptions}
                            label={titles.adjustment.parameters.status}
                            onChange={handleInputChange()}
                            value={status || ""}
                        />

                    </div>
                </div>
                <div className="registerAdjust__row registerAdjust__name">
                    <h4 className="h4"><b>{titles.adjustment.parameters.nameAdjustType}</b></h4>
                    <div className="registerAdjust__input">
                        <Input
                            disabled={!newAdjustType}
                            error={errors.nameAdjustType}
                            full
                            type="text"
                            maxLength={30}
                            name="nameAdjustType"
                            onChange={handleInputChange()}
                            onKeyDown={onlyLetters}
                            placeholder={titles.adjustment.parameters.nameAdjustType}
                            value={nameAdjustType}
                        />
                    </div>
                </div>
                <div className="registerAdjust__row registerAdjust__nature">
                    <h4 className="h4"><b>{titles.adjustment.parameters.nature}</b></h4>
                    <div className="registerAdjust__selector">
                        <Select
                            disabled={!newAdjustType}
                            error={errors.nature}
                            label={titles.adjustment.parameters.nature}
                            name="nature"
                            onChange={handleInputChange()}
                            options={natureOptions}
                            placeholder={titles.adjustment.parameters.nature}
                            value={nature}
                        />
                    </div>
                </div>
                <div className="registerAdjust__buttons">
                    <button
                        type="button"
                        className="btn btn--primary"
                        onClick={()=>{searchData(); setIsUpdate(false)}}
                    >
                        {titles.adjustment.parameters.search}
                    </button>
                    <button
                        type="button"
                        className="btn btn--cancel"
                        onClick={()=>{
                            reset();
                            setNewAdjustType(false);
                            setIsUpdate(false);
                        }}
                    >
                        {titles.adjustment.parameters.clean}
                    </button>
                    <button
                        disabled={!newAdjustType}
                        type="submit"    
                        className="btn btn--mailServer"                       
                    >
                        {titles.adjustment.parameters.save}
                    </button>
                </div>
            </form>
        </>
    )
}
