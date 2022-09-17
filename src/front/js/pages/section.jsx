import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { ServiceCard } from "../component/serviceCard.jsx"
import "../../styles/section.css";

export const Section = () => {
    const { store, actions } = useContext(Context);

    let initialState = "general"
    let possibleThemes = [
        "general",
        "electrónica",
        "hogar",
        "plomería",
    ]

    useEffect(() => { { actions.getServices() } }, [])

    //Enter section, default to popular, change useState to whatever section, traffic light style
    let [theme, setTheme] = useState(initialState)

    const changeTheme = (new_theme) => {
        if (possibleThemes.includes(new_theme)) {
            setTheme(new_theme)
        }
    }

    return (
        <div className="container-fluid">
            <div className="col-12 fs-1 d-flex justify-content-center">{theme}</div>
            <div className="col-12 fs-1 d-flex justify-content-center">
                <button type="button" onClick={() => changeTheme("hogar")} className="btn background">Cambio</button>
            </div>
            <div className="col-12 row">
                {store.services.map((element, index) => {
                    return (
                        <div key={index} className="col-4 my-2">
                            <ServiceCard name={element.name} description={element.description} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
