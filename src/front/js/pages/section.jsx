import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { ServiceCard } from "../component/serviceCard.jsx"
import "../../styles/section.css";

export const Section = () => {
    const { store, actions } = useContext(Context);

    //Reference
    let initialState = "general"
    let possibleThemes = [
        "general",
        "electricidad",
        "hogar",
        "plomeria",
    ]

    //Enter section, default to general, change useState to whatever section, traffic light style
    let [theme, setTheme] = useState(initialState)

    const changeTheme = (new_theme) => {
        if (possibleThemes.includes(new_theme)) {
            setTheme(new_theme)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row my-5">
                {/* Generate service cards */}
                <div className="col-9 row ">
                    {store.services.map((element, index) => {
                        if (theme == "general") {
                            return (
                                <div key={index} className="col-4 my-2">
                                    <ServiceCard name={element.name} description={element.description} service_id={index} card_photo={element.service_photo_url} />
                                </div>
                            )
                        } else {
                            if (element.type_service == theme) {
                                return (
                                    <div key={index} className="col-4 my-2">
                                        <ServiceCard name={element.name} description={element.description} service_id={index} card_photo={element.service_photo_url} />
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
                {/* List of buttons */}
                <div className="col-3 column selection-box">
                    <div className="col-12 text-center fs-4" style={{ "borderBottom": "1px solid black", "color":"navy" }}>
                        Secciones
                    </div>
                    <div className="col-12 my-2 row justify-content-center">
                        {possibleThemes.map((element, index) => {
                            return (
                                // <div className="row my-5 justify-content-center" key={index}>
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => changeTheme(element)}
                                    className="btn specials my-1 mx-1">
                                    {element.charAt(0).toUpperCase() + element.slice(1)}
                                </button>
                                // </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div >
    )
}
