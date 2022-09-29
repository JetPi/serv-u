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
            <div className="row">
                <div className="col-12 fs-1 d-flex justify-content-center">{theme.toUpperCase()}</div>
                {/* Generate service cards */}
                <div className="col-9 row ">
                    {store.services.map((element, index) => {
                        return (
                            <div key={index} className="col-4 my-2">
                                <ServiceCard name={element.name} description={element.description} service_id={index} />
                            </div>)
                        // if (theme == "general") {
                        //     return (
                        //         <div key={index} className="col-4 my-2">
                        //             <ServiceCard name={element.name} description={element.description} service_id={index} />
                        //         </div>
                        //     )
                        // } else {
                        //     if (element.type == theme) {
                        //         return (
                        //             <div key={index} className="col-4 my-2">
                        //                 <ServiceCard name={element.name} description={element.description} service_id={index} />
                        //             </div>
                        //         )
                        //     }
                        // }
                    })}
                </div>
                {/* List of buttons */}
                <div className="col-3 column selection-box">
                    <div className="col-12 text-center fs-4" style={{ "borderBottom": "1px solid black" }}>
                        Secciones
                    </div>
                    <div className="col-12 my-2">
                        {possibleThemes.map((element, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => changeTheme(element)}
                                    className="btn special my-1 mx-1">
                                    {element.charAt(0).toUpperCase() + element.slice(1)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div >
    )
}
