import React, {CSSProperties, FC, useEffect, useState} from "react";
interface Param {
    id: number;
    name: string;
    type: string;
}
interface ParamValue {
    paramId: number;
    value: string;
}
interface Color {
    id: number;
    name: string;
}
interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}
interface Props {
    params: Param[];
    model: Model;
}
const Editor: FC<Props> = ({params, model}) => {
    const main: CSSProperties  = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    const mainContainer: CSSProperties = {
        display: 'flex',
        width: 300,
        justifyContent: 'space-between',
        marginTop: 25
    }
    const paragraph: CSSProperties = {
        margin: 0,
        fontSize: 18,
        fontWeight: 600,
        marginLeft: 16
    }
    const buttonsContainer: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 25
    }
    const paragraphInfo: CSSProperties = {
        margin: 0,
        fontSize: 18,
        fontWeight: 400,
        marginLeft: 16
    }
    const button: CSSProperties = {
        marginTop: 25,
        marginBottom: 25
    }
    const showBlock: CSSProperties ={
        display: 'flex'
    }
    const [changedValue, setChangedValue] = useState (model.paramValues);
    const [allModels, setAllModels] = useState({...model, changedValue });
    const [changeColor, setChangeColor] = useState('');
    const [showAllModels, setShowAllModels] = useState(false);
    const onChangeInput = (value: string, paramId: number) => {
        const updatedParam = changedValue.map((item) =>
            item.paramId === paramId ? { ...item, value } : item
        );
        setChangedValue(updatedParam);
        setShowAllModels(false)
    }
    const onColorClick = (name: string) => {
        setChangeColor(name)
    }
    useEffect(() => {
        setAllModels({ ...model, changedValue });
    }, [changedValue]);
    const getModel = () => {
        setShowAllModels(true)
        console.log(allModels)
    };
    return (
        <main style={main}>
            {params && params.map((item) => (
                    <div style={mainContainer}>
                        <p style={paragraph}>{item.name}</p>
                        <input
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeInput(event.target.value, item.id)}
                            type='text'
                            value={changedValue.find(i => i.paramId === item.id)?.value}/>
                    </div>
            ))}
            {changeColor && <p style={paragraph}>Вы выбрали цвет:{changeColor}</p>}
            <div style={buttonsContainer}>
            {model && model.colors.map((item) => (
                <button
                    onClick={()=> onColorClick(model.colors[item.id - 1].name)}
                    style={{background: model.colors.find(i => i.id === item.id)?.name,
                        marginRight: 25,
                        width: 64,
                        height:32
                    }}>
                    {model.colors[item.id - 1].name}
                </button>
            ))}
            </div>
            <button
                style={button}
                onClick={() => getModel()}>
                Получить модель
            </button>
            {showAllModels && params.map((item) => (
                <div style={showBlock}>
                    <p style={paragraph}>{item.name}:</p>
                    <p style={paragraphInfo}>{allModels.changedValue.find(i => i.paramId === item.id)?.value}</p>
                    <p style={paragraph}>цвет:</p>
                    <p style={paragraphInfo}>{allModels.colors.find(i => i.id === item.id)?.name}</p>
                </div>

            ))}
        </main>
    )
}
export default Editor;