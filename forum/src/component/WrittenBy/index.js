import React, {useEffect, useState} from "react";
import { db } from "../../firebase";

function WrittenBy(props) {

    const id = props.userid
    console.log(id)
    let [userName, SetUserName] = useState("None")
    
    useEffect(() => {
        // trocar params por props
        db.collection("usuarios")
            .doc(id).get().then(data => {
                let usuario = data.data();
                if (usuario) SetUserName(usuario.displayName)
            });
    }, []);

    return (
        <address>
            Escrito por <b><a className="text-info">{userName}</a></b>
        </address>
    )
}

export default WrittenBy;