import React, { useState } from 'react';
import Avatar from 'avataaars';
import { useAuthContext } from '../../context/AuthContext';

const AvatarGenerator = ({ onSave }) => {
    const { setAuth } = useAuthContext();

    const [avatarOptions, setAvatarOptions] = useState({
        topType: "ShortHairShortFlat",
        accessoriesType: "Blank",
        hairColor: "Brown",
        facialHairType: "Blank",
        facialHairColor: "Brown",
        clotheType: "BlazerShirt",
        eyeType: "Default",
        eyebrowType: "Default",
        mouthType: "Smile",
        skinColor: "Light",
    });

    const handleOptionChange = (option, value) => {
        setAvatarOptions((prevOptions) => ({
            ...prevOptions,
            [option]: value,
        }));
    };

    const generateAvatarURL = (options) => {
        return `https://avataaars.io/?${Object.entries(options)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;
    };

    const handleSave = () => {
        const avatarURL = generateAvatarURL(avatarOptions);
        console.log("Avatar guardado:", avatarURL);
        setAuth(prevAuth => ({
            ...prevAuth,
            photo: avatarURL
        }));
        onSave(avatarURL); // Llama a la función callback con la URL generada
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Edita tu Avatar</h2>
            <img
                src={generateAvatarURL(avatarOptions)}
                alt="Preview Avatar"
                style={{ width: '200px', height: '200px' }}
            />

            <div style={{ marginTop: '20px', display: 'grid', gap: '10px' }}>
                {/* Selección de Tipo de Cabello */}
                <label>
                    <strong>Tipo de Cabello:</strong>
                    <select value={avatarOptions.topType} onChange={(e) => handleOptionChange("topType", e.target.value)}>
                        <option value="ShortHairShortFlat">Corto</option>
                        <option value="LongHairStraight">Largo y Recto</option>
                        <option value="LongHairCurly">Largo y Rizado</option>
                        <option value="Hat">Sombrero</option>
                        <option value="Hijab">Hijab</option>
                        <option value="Turban">Turbante</option>
                    </select>
                </label>

                {/* Selección de Accesorios */}
                <label>
                    <strong>Accesorios:</strong>
                    <select value={avatarOptions.accessoriesType} onChange={(e) => handleOptionChange("accessoriesType", e.target.value)}>
                        <option value="Blank">Sin accesorios</option>
                        <option value="PrescriptionGlasses">Gafas</option>
                        <option value="Kurt">Aro de nariz</option>
                        <option value="Wayfarers">Gafas de sol</option>
                    </select>
                </label>

                {/* Selección de Color de Cabello */}
                <label>
                    <strong>Color de Cabello:</strong>
                    <select value={avatarOptions.hairColor} onChange={(e) => handleOptionChange("hairColor", e.target.value)}>
                        <option value="Brown">Marrón</option>
                        <option value="Black">Negro</option>
                        <option value="Blonde">Rubio</option>
                        <option value="Red">Rojo</option>
                        <option value="SilverGray">Gris</option>
                    </select>
                </label>

                {/* Selección de Vello Facial */}
                <label>
                    <strong>Vello Facial:</strong>
                    <select value={avatarOptions.facialHairType} onChange={(e) => handleOptionChange("facialHairType", e.target.value)}>
                        <option value="Blank">Sin Vello Facial</option>
                        <option value="BeardMedium">Barba Mediana</option>
                        <option value="MoustacheFancy">Bigote Elegante</option>
                        <option value="BeardLight">Barba Ligera</option>
                    </select>
                </label>

                {/* Selección de Color del Vello Facial */}
                <label>
                    <strong>Color del Vello Facial:</strong>
                    <select value={avatarOptions.facialHairColor} onChange={(e) => handleOptionChange("facialHairColor", e.target.value)}>
                        <option value="Brown">Marrón</option>
                        <option value="Black">Negro</option>
                        <option value="Blonde">Rubio</option>
                        <option value="Red">Rojo</option>
                        <option value="SilverGray">Gris</option>
                    </select>
                </label>

                {/* Selección de Ropa */}
                <label>
                    <strong>Ropa:</strong>
                    <select value={avatarOptions.clotheType} onChange={(e) => handleOptionChange("clotheType", e.target.value)}>
                        <option value="BlazerShirt">Blazer y Camisa</option>
                        <option value="BlazerSweater">Blazer y Suéter</option>
                        <option value="ShirtCrewNeck">Camiseta de Cuello Redondo</option>
                        <option value="ShirtVNeck">Camiseta de Cuello en V</option>
                        <option value="Hoodie">Hoodie</option>
                        <option value="Overall">Overol</option>
                    </select>
                </label>

                {/* Selección de Ojos */}
                <label>
                    <strong>Ojos:</strong>
                    <select value={avatarOptions.eyeType} onChange={(e) => handleOptionChange("eyeType", e.target.value)}>
                        <option value="Default">Normal</option>
                        <option value="Happy">Feliz</option>
                        <option value="Squint">Entrecerrados</option>
                        <option value="Wink">Guiño</option>
                        <option value="Cry">Llorando</option>
                    </select>
                </label>

                {/* Selección de Cejas */}
                <label>
                    <strong>Cejas:</strong>
                    <select value={avatarOptions.eyebrowType} onChange={(e) => handleOptionChange("eyebrowType", e.target.value)}>
                        <option value="Default">Normal</option>
                        <option value="Angry">Enojado</option>
                        <option value="SadConcerned">Preocupado</option>
                        <option value="RaisedExcited">Emocionado</option>
                    </select>
                </label>

                {/* Selección de Boca */}
                <label>
                    <strong>Boca:</strong>
                    <select value={avatarOptions.mouthType} onChange={(e) => handleOptionChange("mouthType", e.target.value)}>
                        <option value="Smile">Sonrisa</option>
                        <option value="Default">Normal</option>
                        <option value="Sad">Triste</option>
                        <option value="ScreamOpen">Gritando</option>
                        <option value="Serious">Serio</option>
                    </select>
                </label>

                {/* Selección de Color de Piel */}
                <label>
                    <strong>Color de Piel:</strong>
                    <select value={avatarOptions.skinColor} onChange={(e) => handleOptionChange("skinColor", e.target.value)}>
                        <option value="Light">Claro</option>
                        <option value="Tanned">Bronceado</option>
                        <option value="DarkBrown">Oscuro</option>
                        <option value="Black">Negro</option>
                        <option value="Pale">Pálido</option>
                    </select>
                </label>

                <button onClick={handleSave}>Guardar Avatar</button>
            </div>
        </div>
    );
};

export default AvatarGenerator;
