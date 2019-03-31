import {fireEvent} from "react-testing-library";

export const fireEnter = (input) => {
    fireEvent.keyDown(input,
        {
            key: "Enter",
            code: 13,
            charKey: 13,
            keyCode: 13,
            charCode: 13,
            which: 13,
        },
    );
    fireEvent.keyUp(input,
        {
            key: "Enter",
            code: 13,
            charKey: 13,
            keyCode: 13,
            charCode: 13,
            which: 13,
        },
    );
};
