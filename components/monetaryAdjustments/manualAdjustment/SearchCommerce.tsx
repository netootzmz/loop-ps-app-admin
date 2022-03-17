import React, { FC, KeyboardEvent } from 'react'
import Input from '../../forms/Input';

export const SearchCommerce: FC<{
        nameCommerce: string, 
        idCommerce: string, 
        searchData: Function,
        handleInputChange: Function,
        titles: Partial<any & {}>
    }> = ({
        nameCommerce,
        idCommerce,
        searchData,
        handleInputChange,
        titles
    }) => {
    
    const onlyLetters = (event: KeyboardEvent<HTMLInputElement>) =>{
        const pressedKey = event.keyCode || event.which || event.charCode;
        if ((pressedKey <= 36 || pressedKey >= 40) && !/^[a-zA-Z \b]+$/.test(event.key) && pressedKey !== 8) event.preventDefault();
    }

    return (
        <div>
            <div className="card card--full searchCommerce">
                <h4 className="h4"><b>{titles.adjustment.parameters.commerceName}</b></h4>
                <Input
                    full
                    maxLength={30}
                    name="nameCommerce"
                    onChange={handleInputChange()}
                    onKeyDown={onlyLetters}
                    placeholder={titles.adjustment.parameters.commerceName}
                    type="text"
                    value={nameCommerce}
                />
                <h4 className="h4"><b>{titles.adjustment.parameters.idCommerce}</b></h4>
                <Input
                    full
                    maxLength={30}
                    name="idCommerce"
                    onChange={handleInputChange()}
                    placeholder={titles.adjustment.parameters.idCommerce}
                    type="text"
                    value={idCommerce}
                />
            </div>
            <div className="searchCommerce__search">
                <button
                    type="button"
                    className="btn btn--mailServer"
                    onClick={()=>searchData()}
                >
                    {titles.adjustment.parameters.search}
                </button>
            </div>
        </div>
    )
}
