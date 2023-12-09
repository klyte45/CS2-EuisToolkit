import { ReactElement } from "react";
import ReactDOM from "react-dom";

export const renderToString = async function (element: ReactElement) {
    return await new Promise<string>((res) => {
        let myDiv = document.createElement('div');
        ReactDOM.render(element, myDiv, () => {
            const result = myDiv.innerHTML;
            myDiv = null;
            res(result);
        });
    })

}

